import { fetchFromExternalApi } from "../../lib/apiClient";

export async function GET(request) {
  try {
    // Usar el endpoint correcto de la API externa
    const data = await fetchFromExternalApi("/products-services/");
    // Puedes filtrar aquí si solo quieres mostrar algunos productos/servicios destacados en el banner
    // Por ahora, devuelve todos para que el frontend decida qué mostrar
    return Response.json(data);
  } catch (error) {
    console.error(
      "[/api/product-banner] Error procesando la solicitud:",
      error.message
    );
    return Response.json(
      {
        success: false,
        message: "No se pudieron obtener los productos en el banner.",
      },
      { status: 502 }
    );
  }
}
