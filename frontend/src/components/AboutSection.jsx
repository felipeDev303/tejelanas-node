import React, { useEffect, useState } from "react";

export default function AboutSection() {
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch("/api/about", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          const errorResponse = await res.json().catch(() => null);
          throw new Error(
            errorResponse?.detail ||
              errorResponse?.message ||
              `Error ${res.status} al obtener datos de /api/about`
          );
        }
        return res.json();
      })
      .then((dataFromServer) => {
        setAbout(dataFromServer.data || "");
        setError("");
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("No se pudo cargar la información: " + err.message);
          setAbout("");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <section
      id="sobre-nosotros"
      className="max-w-2xl mx-auto my-12 p-8 bg-white/80 rounded-xl shadow-lg text-center"
    >
      <h2 className="text-3xl font-bold text-pink-700 mb-4">Sobre Nosotros</h2>
      {loading ? (
        <p className="text-gray-700 text-lg">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-lg leading-relaxed">{error}</p>
      ) : about ? (
        <p className="text-gray-700 text-lg leading-relaxed">{about}</p>
      ) : (
        <p className="text-gray-700 text-lg">No hay información disponible.</p>
      )}
    </section>
  );
}
