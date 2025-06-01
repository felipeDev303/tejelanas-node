import { fetchFromExternalApi } from "../../lib/apiClient";

export async function GET(request) {
  try {
    const data = await fetchFromExternalApi("/products-services/");
    return Response.json(data);
  } catch (error) {
    console.error(
      "[/api/products-services] Error procesando la solicitud:",
      error.message
    );
    return Response.json(
      {
        success: false,
        message: "No se pudieron obtener los Productos y Servicios.",
        detail: error.message,
      },
      { status: 502 }
    );
  }
}
