import { fetchFromExternalApi } from "../../lib/apiClient";

export async function GET(request) {
  try {
    const data = await fetchFromExternalApi("/faq/");
    return Response.json(data);
  } catch (error) {
    console.error("[/api/faq] Error procesando la solicitud:", error.message);
    return Response.json(
      {
        success: false,
        message: "No se pudieron obtener las Preguntas Frecuentes.",
        detail: error.message,
      },
      { status: 502 }
    );
  }
}
