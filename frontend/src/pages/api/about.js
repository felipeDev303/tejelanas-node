import { fetchFromExternalApi } from "../../lib/apiClient";

export async function GET(request) {
  try {
    const data = await fetchFromExternalApi("/about-us/");
    return Response.json(data);
  } catch (error) {
    console.error("[/api/about] Error procesando la solicitud:", error.message);
    return Response.json(
      {
        success: false,
        message: "No se pudo obtener la información de 'Sobre Nosotros'.",
        detail: error.message,
      },
      { status: 502 }
    );
  }
}
