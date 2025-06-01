import { fetchFromExternalApi } from "../../lib/apiClient";

export async function GET(request) {
  try {
    const data = await fetchFromExternalApi("/products-banner/");
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
        detail: error.message,
      },
      { status: 502 }
    );
  }
}
