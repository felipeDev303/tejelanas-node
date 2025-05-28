import React, { useEffect, useState } from "react";

export default function AboutSection() {
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/about")
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          let errorJson;
          try {
            errorJson = JSON.parse(errorText);
          } catch {}
          throw new Error(
            errorJson?.detail || errorJson?.message || res.statusText
          );
        }
        return res.json();
      })
      .then((data) => {
        setAbout(data.content || data.data || "");
        setError("");
      })
      .catch((err) => {
        setError("No se pudo cargar la información: " + err.message);
        setAbout("");
      })
      .finally(() => setLoading(false));
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
