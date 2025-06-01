import { fetchFromExternalApi } from "../../lib/apiClient";

// Permitir otros métodos HTTP en el futuro
export async function GET(request) {
  try {
    const data = await fetchFromExternalApi("/products-services/");
    return Response.json(data);
  } catch (error) {
    // Log interno con detalles
    console.error(
      "[/api/products-services] Error procesando la solicitud:",
      error.message
    );
    // Mensaje genérico al frontend, sin detalles internos
    return Response.json(
      {
        success: false,
        message: "No se pudieron obtener los Productos y Servicios.",
      },
      { status: 502 }
    );
  }
}
