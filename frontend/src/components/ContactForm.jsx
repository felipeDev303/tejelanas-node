import React, { useEffect, useRef, useState } from "react";

function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

export default function ContactForm() {
  const [producto, setProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const productoQS = getQueryParam("producto");
    if (productoQS) setProducto(productoQS);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviado(false);

    if (!nombre || !email || !mensaje) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Aquí puedes hacer el fetch a tu backend o servicio de correo
    setEnviado(true);
    formRef.current?.reset();
  }

  return (
    <section className="max-w-lg mx-auto my-12 p-8 bg-white/80 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">
        Contáctanos
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        autoComplete="on"
      >
        <label className="flex flex-col font-semibold">
          Nombre*
          <input
            type="text"
            className="mt-1 p-2 rounded border border-gray-300"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Email*
          <input
            type="email"
            className="mt-1 p-2 rounded border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Producto de interés
          <input
            type="text"
            className="mt-1 p-2 rounded border border-gray-300"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            name="producto"
            placeholder="¿Sobre qué producto o servicio consultas?"
            autoComplete="off"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Mensaje*
          <textarea
            className="mt-1 p-2 rounded border border-gray-300"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            rows={4}
          />
        </label>
        {error && <p className="text-red-600">{error}</p>}
        {enviado && (
          <p className="text-green-600">¡Mensaje enviado correctamente!</p>
        )}
        <button
          type="submit"
          className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 transition font-bold"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
