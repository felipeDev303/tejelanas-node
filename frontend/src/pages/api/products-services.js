export async function GET() {
  const response = await fetch(
    "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/",
    {
      headers: {
        Authorization: "Bearer ipss.get",
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    return new Response(errorText, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  let data;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const text = await response.text();
    data = { data: text };
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
