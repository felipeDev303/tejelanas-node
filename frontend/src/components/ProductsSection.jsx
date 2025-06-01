import React, { useEffect, useState } from "react";

// Tarjeta reutilizable para producto o servicio
function ProductCard({ image, title, description, onContact }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center max-w-xs h-full min-h-[420px]">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3"
        loading="lazy"
      />
      <h3 className="text-xl font-bold text-pink-700 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4 text-center">{description}</p>
      <div className="mt-auto w-full flex justify-center">
        <button
          className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 transition"
          onClick={onContact}
          type="button"
        >
          Contáctanos
        </button>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [productos, setProductos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch("/api/products-services", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          const errorJson = await res.json().catch(() => ({}));
          throw new Error(errorJson.message || "Error desconocido");
        }
        return res.json();
      })
      .then((data) => {
        const d = data.data || {};
        setProductos(Array.isArray(d.productos) ? d.productos : []);
        setServicios(Array.isArray(d.servicios) ? d.servicios : []);
        setError("");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los productos: " + err.message);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  function handleContact(nombre) {
    // Actualiza la URL con el query param y el hash sin recargar la página
    const url = new URL(window.location.href);
    url.searchParams.set("producto", nombre);
    url.hash = "contacto";
    window.history.pushState({}, "", url);

    // Scroll al formulario de contacto
    const contactoSection = document.getElementById("contacto");
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: "smooth" });
    }

    // Dispara un evento personalizado para notificar al formulario
    window.dispatchEvent(
      new CustomEvent("producto-interes-cambiado", { detail: nombre })
    );
  }

  return (
    <section id="productos" className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
        Nuestros Productos
      </h2>
      {loading ? (
        <p className="text-gray-700 text-center">Cargando...</p>
      ) : error ? (
        <div className="text-red-600 text-center my-8">{error}</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6 mb-10 items-stretch">
            {productos.length === 0 ? (
              <p className="text-gray-700">No hay productos disponibles.</p>
            ) : (
              productos.map((prod) => (
                <ProductCard
                  key={`producto-${prod.id}`}
                  image={prod.imgs?.[0] || "/placeholder.jpg"}
                  title={prod.nombre}
                  description={prod.descripcion}
                  onContact={() => handleContact(prod.nombre)}
                />
              ))
            )}
          </div>
          <h3 className="text-3xl font-bold text-center text-pink-700 mb-6">
            Nuestros Talleres
          </h3>
          <div className="flex flex-wrap justify-center gap-6 items-stretch">
            {servicios.length === 0 ? (
              <p className="text-gray-700">No hay servicios disponibles.</p>
            ) : (
              servicios.map((serv) => (
                <ProductCard
                  key={`servicio-${serv.id}`}
                  image={serv.imgs?.[0] || "/placeholder.jpg"}
                  title={serv.nombre}
                  description={
                    (serv.ubicacion ? `Ubicación: ${serv.ubicacion}. ` : "") +
                    (serv.fecha ? `Fecha: ${serv.fecha}. ` : "") +
                    (serv.cupos ? `Cupos: ${serv.cupos}.` : "")
                  }
                  onContact={() => handleContact(serv.nombre)}
                />
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}
