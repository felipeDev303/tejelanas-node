const API_BASE_URL = import.meta.env.EXTERNAL_API_URL_BASE; // <--- sin PUBLIC_
const API_TOKEN = import.meta.env.EXTERNAL_API_TOKEN; // <--- sin PUBLIC_
const DEFAULT_TIMEOUT_MS = 10000; // 10 segundos

/**
 * Realiza un fetch autenticado a la API externa de Tejelanas Vivi.
 * @param {string} endpoint - El endpoint específico de la API (ej. '/about-us/').
 * @param {RequestInit & { timeout?: number }} options - Opciones adicionales para fetch (method, body, timeout, etc.).
 * @returns {Promise<any>} - La respuesta JSON parseada.
 * @throws {Error} - Si la llamada a la API falla o el token no está configurado.
 */
export async function fetchFromExternalApi(endpoint, options = {}) {
  // Log de depuración para variables de entorno
  if (import.meta.env.DEV) {
    console.log("[apiClient] EXTERNAL_API_URL_BASE:", API_BASE_URL);
    console.log("[apiClient] PUBLIC_EXTERNAL_API_TOKEN presente:", !!API_TOKEN);
    console.log("[apiClient] endpoint recibido:", endpoint);
  }

  if (!API_BASE_URL || !API_TOKEN) {
    const errorMessage =
      "Error de configuración: EXTERNAL_API_URL_BASE o EXTERNAL_API_TOKEN no están definidos en las variables de entorno del servidor.";
    console.error(`[apiClient] ${errorMessage}`);
    throw new Error(
      "Error de configuración del servidor al contactar la API externa."
    );
  }

  // Validar que el endpoint comience con "/"
  if (typeof endpoint !== "string" || !endpoint.startsWith("/")) {
    const errorMessage = `El endpoint debe comenzar con "/". Recibido: "${endpoint}"`;
    console.error(`[apiClient] ${errorMessage}`);
    throw new Error("Error interno de servidor al contactar la API externa.");
  }

  const defaultHeaders = {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: "application/json",
  };

  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData)
  ) {
    defaultHeaders["Content-Type"] = "application/json";
    if (typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }
  }

  // Asegura que no haya doble slash en la URL final
  const url =
    API_BASE_URL.endsWith("/") && endpoint.startsWith("/")
      ? API_BASE_URL.slice(0, -1) + endpoint
      : API_BASE_URL + endpoint;

  if (import.meta.env.DEV) {
    console.log(`[apiClient] Fetching: ${options.method || "GET"} ${url}`);
  }

  // Timeout con AbortController
  const timeoutMs = options.timeout || DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorStatus = response.status;
      const errorText = await response.text();
      let errorDetail = ""; // No exponer detalles internos
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail =
          errorJson.msg || errorJson.message || errorJson.detail || "";
      } catch (e) {}
      const errorMessage = `Error ${errorStatus} desde API externa al llamar a ${endpoint}`;
      // Log interno con detalles, pero no exponer al frontend
      console.error(`[apiClient] ${errorMessage}: ${errorDetail}`);
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      console.warn(
        `[apiClient] Respuesta de ${endpoint} no es JSON (Content-Type: ${contentType}). Devolviendo como texto.`
      );
      return { data: text };
    }
  } catch (networkError) {
    clearTimeout(timeoutId);
    let errorMessage;
    if (networkError.name === "AbortError") {
      errorMessage = `Timeout de ${timeoutMs / 1000}s al llamar a ${endpoint}`;
    } else {
      errorMessage = `Error de red o conexión al llamar a ${endpoint}`;
    }
    // Log interno con detalles
    console.error(`[apiClient] ${errorMessage}`, networkError);
    throw new Error(errorMessage);
  }
}
