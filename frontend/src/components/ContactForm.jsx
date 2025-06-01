import React, { useEffect, useRef, useState } from "react";

function getQueryParam(name) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || "";
}

// Escapa caracteres peligrosos para evitar XSS
function escapeInput(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  // Regex simple para validar email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [producto, setProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const formRef = useRef(null);

  // Sincroniza el campo producto con el query param de la URL y con el evento personalizado
  useEffect(() => {
    function syncProductoFromURL() {
      const productoQS = getQueryParam("producto");
      setProducto(productoQS || "");
    }

    // Inicial
    syncProductoFromURL();

    // Escucha cambios en la URL (navegación pushState/popstate)
    window.addEventListener("popstate", syncProductoFromURL);

    // Escucha el evento personalizado para cambios inmediatos
    window.addEventListener("producto-interes-cambiado", syncProductoFromURL);

    return () => {
      window.removeEventListener("popstate", syncProductoFromURL);
      window.removeEventListener(
        "producto-interes-cambiado",
        syncProductoFromURL
      );
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setEnviado(false);

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (nombre.length > 80) {
      setError("El nombre es demasiado largo.");
      return;
    }
    if (email.length > 100) {
      setError("El email es demasiado largo.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("El email no es válido.");
      return;
    }
    if (mensaje.length > 1000) {
      setError("El mensaje es demasiado largo.");
      return;
    }
    if (producto.length > 100) {
      setError("El producto de interés es demasiado largo.");
      return;
    }

    setEnviando(true);

    // Simula envío seguro (escapando inputs)
    const safeNombre = escapeInput(nombre);
    const safeEmail = escapeInput(email);
    const safeMensaje = escapeInput(mensaje);
    const safeProducto = escapeInput(producto);

    // Envío real al backend (reemplaza el setTimeout)
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: safeNombre,
        email: safeEmail,
        producto: safeProducto,
        mensaje: safeMensaje,
        // honeypot: "", // opcional, para anti-spam
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: `Error del servidor: ${res.status}` }));
          throw new Error(errorData.message || `Error ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setEnviando(false);
        setEnviado(true);
        setNombre("");
        setEmail("");
        setMensaje("");
        // No limpiamos producto para mantener el valor de interés
        formRef.current?.reset();
      })
      .catch(err => {
        setEnviando(false);
        setError("Error al enviar el mensaje: " + err.message);
        setEnviado(false);
      });

    // Si quieres mantener el envío simulado, comenta el bloque fetch y descomenta el setTimeout:
    /*
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setNombre("");
      setEmail("");
      setMensaje("");
      // No limpiamos producto para mantener el valor de interés
      formRef.current?.reset();
    }, 1000);
    */
  }

  return (
    <section
      id="contacto"
      className="max-w-lg mx-auto my-12 p-8 bg-white/80 rounded-xl shadow-lg"
    >
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
            onChange={(e) => setNombre(e.target.value.replace(/[<>]/g, ""))}
            required
            autoComplete="name"
            maxLength={80}
            minLength={2}
            pattern=".{2,80}"
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
            maxLength={100}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Producto de interés
          <input
            type="text"
            className="mt-1 p-2 rounded border border-gray-300"
            value={producto}
            onChange={(e) => setProducto(e.target.value.replace(/[<>]/g, ""))}
            name="producto"
            placeholder="¿Sobre qué producto o servicio consultas?"
            autoComplete="off"
            maxLength={100}
          />
        </label>
        <label className="flex flex-col font-semibold">
          Mensaje*
          <textarea
            className="mt-1 p-2 rounded border border-gray-300"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value.replace(/[<>]/g, ""))}
            required
            rows={4}
            maxLength={1000}
            minLength={10}
          />
        </label>
        {error && <p className="text-red-600">{error}</p>}
        {enviado && (
          <p className="text-green-600">¡Mensaje enviado correctamente!</p>
        )}
        <button
          type="submit"
          className="bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-800 transition font-bold"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
