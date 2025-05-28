export async function GET() {
  const headers = {
    Authorization: "Bearer ipss.get",
    Accept: "application/json",
  };
  console.log("Enviando cabeceras:", headers);

  const response = await fetch(
    "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/about-us/",
    { headers }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Status:", response.status);
    console.error("Headers:", JSON.stringify([...response.headers]));
    console.error("Body:", errorText);
    return new Response(errorText, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
      "Access-Control-Allow-Origin": "*",
    },
  });
}
