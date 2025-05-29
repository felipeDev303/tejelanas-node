import React, { useEffect, useState } from "react";

// Utilidad para convertir URLs y números de WhatsApp en enlaces clicables
function parseRespuesta(respuesta) {
  if (!respuesta) return null;

  // Detecta URLs
  let parsed = respuesta.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-pink-700 underline break-all">${url}</a>`
  );

  // Detecta números de WhatsApp chilenos (+56 9 ...)
  parsed = parsed.replace(
    /(\+56\s?9\s?\d{4}\s?\d{4})/g,
    (match) => {
      const numero = match.replace(/\D/g, "");
      return `<a href="https://wa.me/${numero}" target="_blank" rel="noopener noreferrer" class="text-green-700 underline">${match}</a>`;
    }
  );

  return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/faq")
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
        setFaqs(Array.isArray(data.data) ? data.data : []);
        setError("");
      })
      .catch((err) => {
        setError(
          "No se pudieron cargar las preguntas frecuentes: " + err.message
        );
        setFaqs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-2xl mx-auto p-0 bg-transparent">
      {loading ? (
        <p className="text-gray-700 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : faqs.length === 0 ? (
        <p className="text-gray-700 text-center">
          No hay preguntas frecuentes disponibles.
        </p>
      ) : (
        <ul className="space-y-6">
          {faqs.map((faq) => (
            <li key={faq.id} className="text-left">
              <details className="group">
                <summary className="cursor-pointer font-semibold text-pink-700 group-open:underline">
                  {faq.titulo}
                </summary>
                <div className="mt-2 text-gray-700">
                  {parseRespuesta(faq.respuesta)}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
