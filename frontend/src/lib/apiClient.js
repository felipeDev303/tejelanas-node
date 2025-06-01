const API_BASE_URL = import.meta.env.VITE_EXTERNAL_API_URL_BASE;
const API_TOKEN = import.meta.env.VITE_EXTERNAL_API_TOKEN;

/**
 * Realiza un fetch autenticado a la API externa de Tejelanas Vivi.
 * @param {string} endpoint - El endpoint específico de la API (ej. '/about-us/').
 * @param {RequestInit} options - Opciones adicionales para fetch (method, body, etc.).
 * @returns {Promise<any>} - La respuesta JSON parseada.
 * @throws {Error} - Si la llamada a la API falla o el token no está configurado.
 */
export async function fetchFromExternalApi(endpoint, options = {}) {
  if (!API_BASE_URL || !API_TOKEN) {
    const errorMessage =
      "Error de configuración: EXTERNAL_API_URL_BASE o EXTERNAL_API_TOKEN no están definidos en las variables de entorno del servidor.";
    console.error(`[apiClient] ${errorMessage}`);
    throw new Error(
      "Error de configuración del servidor al contactar la API externa."
    );
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

  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[apiClient] Fetching: ${options.method || "GET"} ${url}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorStatus = response.status;
      const errorText = await response.text();
      let errorDetail = errorText.substring(0, 200);
      try {
        const errorJson = JSON.parse(errorText);
        errorDetail =
          errorJson.msg || errorJson.message || errorJson.detail || errorDetail;
      } catch (e) {}
      const errorMessage = `Error ${errorStatus} desde API externa al llamar a ${endpoint}: ${errorDetail}`;
      console.error(`[apiClient] ${errorMessage}`);
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
    const errorMessage = `Error de red o conexión al llamar a ${endpoint}: ${networkError.message}`;
    console.error(`[apiClient] ${errorMessage}`, networkError);
    throw new Error(errorMessage);
  }
}
