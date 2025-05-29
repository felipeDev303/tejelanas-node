import React, { useState, useEffect } from "react";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1/products-services/",
          {
            headers: {
              Authorization: "Bearer ipss.get",
            },
          }
        );
        const data = await res.json();
        // Extrae correctamente los productos del JSON anidado
        setProducts(
          Array.isArray(data?.data?.productos) ? data.data.productos : []
        );
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }
  function next() {
    setCurrent((c) => Math.min(products.length - 1, c + 1));
  }
  function goTo(idx) {
    setCurrent(idx);
  }

  return (
    <div
      className="relative w-full max-w-xl mx-auto overflow-hidden bg-gray-100 min-h-[250px]"
      role="region"
      aria-label="Carrusel de productos"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Cargando productos...
        </div>
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No hay productos para mostrar.
        </div>
      ) : (
        <>
          <img
            src={products[current]?.imgs?.[0] || "/images/placeholder.png"}
            alt={products[current]?.nombre || "Producto"}
            className="w-full h-auto block rounded-lg object-contain min-h-[200px] bg-white"
            role="group"
            aria-roledescription="slide"
            aria-label={`Imagen ${current + 1} de ${products.length}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/placeholder.png";
            }}
          />
          <div className="text-center mt-2 font-semibold">
            {products[current]?.nombre || "Producto"}
          </div>
        </>
      )}

      <div className="flex justify-center gap-4 mt-2">
        <button
          className="bg-white border border-gray-300 rounded-full w-10 h-10 text-xl cursor-pointer transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Anterior"
          onClick={prev}
          disabled={current === 0 || loading || products.length === 0}
        >
          &#8592;
        </button>
        <button
          className="bg-white border border-gray-300 rounded-full w-10 h-10 text-xl cursor-pointer transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Siguiente"
          onClick={next}
          disabled={
            current === products.length - 1 || loading || products.length === 0
          }
        >
          &#8594;
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {products.map((product, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-none cursor-pointer transition-colors ${
              current === idx ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Ir a la imagen ${idx + 1}`}
            aria-current={current === idx}
            onClick={() => goTo(idx)}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
}
