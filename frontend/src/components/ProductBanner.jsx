import React, { useEffect, useState } from "react";

export default function ProductBanner() {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/product-banner")
      .then(async (res) => {
        if (!res.ok) {
          const errorJson = await res.json().catch(() => ({}));
          throw new Error(
            errorJson.message ||
              "No se pudieron cargar los productos del banner."
          );
        }
        return res.json();
      })
      .then((data) => {
        const d = data.data || {};
        const productos = Array.isArray(d.productos) ? d.productos : [];
        const servicios = Array.isArray(d.servicios) ? d.servicios : [];
        setProducts([...productos, ...servicios]);
        setError("");
      })
      .catch((err) => {
        setError("No se pudieron cargar los productos del banner.");
        setProducts([]);
      })
      .finally(() => setLoading(false));
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Cargando productos...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-2xl mx-auto overflow-hidden bg-gradient-to-r from-pink-200 via-white to-pink-100 rounded-xl shadow-lg min-h-[250px] flex items-center justify-center"
      role="region"
      aria-label="Carrusel de productos"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      {products.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No hay productos para mostrar.
        </div>
      ) : (
        <img
          src={products[current]?.imgs?.[0] || "/placeholder.jpg"}
          alt={products[current]?.nombre || "Producto"}
          className="w-full max-h-80 object-contain rounded-xl shadow-md transition-all duration-500 bg-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      )}

      {/* Controles modernos tipo banner */}
      {products.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow transition disabled:opacity-50"
            aria-label="Anterior"
            onClick={prev}
            disabled={current === 0 || loading || products.length === 0}
            tabIndex={0}
          >
            &#8592;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-700 rounded-full w-10 h-10 flex items-center justify-center shadow transition disabled:opacity-50"
            aria-label="Siguiente"
            onClick={next}
            disabled={
              current === products.length - 1 ||
              loading ||
              products.length === 0
            }
            tabIndex={0}
          >
            &#8594;
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-colors ${
                  current === idx ? "bg-pink-700" : "bg-gray-300"
                }`}
                aria-label={`Ir a la imagen ${idx + 1}`}
                aria-current={current === idx}
                onClick={() => goTo(idx)}
                disabled={loading}
                tabIndex={0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
