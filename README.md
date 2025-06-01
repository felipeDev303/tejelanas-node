# Tejelanas Vivi - Frontend

Este es el frontend del proyecto **Tejelanas Vivi**, desarrollado con [Astro](https://astro.build/), React y Tailwind CSS. El frontend consume una API externa a través de endpoints API propios construidos con Astro, que actúan como intermediarios para mayor seguridad y flexibilidad.

## ✨ Características Principales

- **Astro**: Framework principal para la construcción del sitio, enfocado en el rendimiento y la generación de HTML.
- **React**: Utilizado para componentes UI interactivos y dinámicos (carrusel, formularios, header, tarjetas de producto, secciones de contenido, etc.) integrados como "islas" de Astro.
- **Tailwind CSS**: Framework CSS de utilidad para un desarrollo de estilos rápido, personalizable y responsivo.
- **Endpoints API de Astro**: Rutas en `src/pages/api/*` que sirven como backend intermediario (BFF - Backend For Frontend) para:
  - Comunicarse de forma segura con la API externa de Tejelanas Vivi.
  - Manejar tokens de API sensibles del lado del servidor.
  - Transformar o cachear datos antes de enviarlos al cliente.
- **Componentes reutilizables**: Diseño modular con componentes como `ProductCard`, `ProductBanner`, `ContactForm`, `FaqSection`, `HeaderReact`, etc.
- **Buenas prácticas**: Código limpio, manejo de errores, estados de carga, accesibilidad (ARIA) y usabilidad.

## 🚀 Empezando

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada, ej. 18.x o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tejelanas-vivi-frontend.git
   cd tejelanas-vivi-frontend
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto frontend:
   ```env
   EXTERNAL_API_URL_BASE="https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1"
   EXTERNAL_API_TOKEN="TU_BEARER_TOKEN_PARA_LA_API_EXTERNA"
   ```
   > **Nota:** El archivo `.env` **no** debe subirse al repositorio. Asegúrate de que esté en tu `.gitignore`.

### Ejecución en desarrollo

```bash
npm run dev
# o
yarn dev
```

Esto iniciará el servidor en http://localhost:4321.

### Build para producción

```bash
npm run build
# o
yarn build
```

Esto generará los archivos optimizados en la carpeta `dist/` o preparará la app para SSR según la configuración.

## 📂 Estructura del Proyecto

.
├── public/ # Assets estáticos (imágenes, favicons, fonts)
├── src/
│ ├── components/ # Componentes React reutilizables (.jsx, .tsx)
│ │ ├── HeaderReact.jsx
│ │ ├── ProductCard.jsx
│ │ └── ...
│ ├── data/ # (Opcional) Datos mockeados o estáticos (ej. mockProducts.json)
│ ├── layouts/ # Layouts de Astro (.astro)
│ │ └── Layout.astro
│ ├── lib/ # Código de utilidad, helpers (ej. apiClient.js)
│ │ └── apiClient.js
│ ├── pages/ # Rutas y páginas de Astro (.astro) y Endpoints API (.js, .ts)
│ │ ├── api/ # Endpoints API de Astro (backend intermediario)
│ │ │ ├── about.js
│ │ │ ├── faq.js
│ │ │ └── products-services.js
│ │ ├── faq.astro
│ │ └── index.astro
│ ├── styles/ # Estilos globales CSS o Tailwind base (ej. global.css)
│ └── env.d.ts # (Si usas TypeScript) Definiciones de tipo para variables de entorno
├── astro.config.mjs # Configuración de Astro
├── package.json
├── tailwind.config.cjs # Configuración de Tailwind CSS
├── tsconfig.json # (Si usas TypeScript) Configuración de TypeScript
├── .env # (No subir a Git) Variables de entorno locales
├── .env.example # Ejemplo de variables de entorno
└── README.md

## 📜 Guía de Buenas Prácticas y Convenciones

1. Nomenclatura

Componentes React: PascalCase (ej. ProductCard.jsx, ContactForm.jsx).

Archivos Astro (Páginas y Layouts): PascalCase (ej. Layout.astro, AboutPage.astro) o kebab-case para rutas (ej. sobre-nosotros.astro se accede como /sobre-nosotros). La consistencia es clave, se recomienda PascalCase para los archivos fuente.

Endpoints API de Astro: kebab-case (ej. products-services.js se accede como /api/products-services).

Funciones JavaScript/TypeScript: camelCase (ej. fetchProducts, handleSubmit).

Variables y Constantes:

Variables locales: camelCase (ej. isLoading, productData).

Constantes (valores que no cambian y son significativos globalmente en un módulo): SCREAMING_SNAKE_CASE (ej. DEFAULT_TIMEOUT_MS, API_BASE_URL si se define como constante en un archivo).

Variables de Entorno (en .env): SCREAMING_SNAKE_CASE (ej. EXTERNAL_API_TOKEN).

Clases CSS (Tailwind): Seguir las convenciones de Tailwind. Para clases personalizadas (si es necesario), usar BEM-like o kebab-case.

Nombres de Ramas Git: kebab-case, descriptivas (ej. feat/contact-form-validation, fix/header-mobile-menu).

Mensajes de Commit Git: Seguir Conventional Commits (ej. feat: add contact form, fix: correct API endpoint for products, docs: update README).

2. Estructura de Archivos

Seguir la estructura de proyecto descrita arriba.

Componentes: Mantener los componentes React en src/components/. Si un componente es muy específico de una página y no se reutiliza, puede vivir en una subcarpeta dentro de src/pages/nombre-pagina/components/ o directamente en el archivo .astro de la página si es muy simple (aunque se prefiere separar la lógica React a archivos .jsx/.tsx).

Lógica de API Client: Centralizar la lógica para interactuar con APIs externas en src/lib/apiClient.js o similar.

Layouts: Usar src/layouts/ para definir la estructura común de las páginas.

Endpoints API de Astro: Dentro de src/pages/api/. Cada archivo .js o .ts aquí define un endpoint.

3. Uso de Variables

Variables de Entorno:

Utilizar variables de entorno para cualquier configuración sensible o específica del entorno (API keys, URLs de API, tokens).

Variables para el servidor (usadas en endpoints API de Astro, getStaticPaths, etc.): import.meta.env.NOMBRE_VARIABLE.

Variables para el cliente (navegador): Deben tener el prefijo PUBLIC\_ en .env (ej. PUBLIC_ANALYTICS_ID) y se acceden con import.meta.env.PUBLIC_NOMBRE_VARIABLE. Evitar exponer secretos aquí.

Const vs. Let: Preferir const por defecto. Usar let solo cuando la variable necesite ser reasignada.

Tipado (si usas TypeScript): Proveer tipos explícitos para props de componentes, estados, y retornos de funciones para mejorar la claridad y prevenir errores.

4. Código React

Componentes Funcionales y Hooks: Usar componentes funcionales y hooks (useState, useEffect, useContext, etc.).

Props Inmutables: Tratar las props como inmutables dentro del componente.

Manejo de Estado:

Para estado local, usar useState.

Para estado complejo o compartido entre muchos componentes, considerar useReducer, React Context, o librerías de estado ligeras (Zustand, Jotai).

useEffect:

Especificar el array de dependencias correctamente para evitar ejecuciones innecesarias o bucles infinitos.

Incluir funciones de limpieza (retornar una función desde useEffect) para cancelar suscripciones, timers, o peticiones fetch (usando AbortController) cuando el componente se desmonte.

Keys en Listas: Siempre proveer una key única y estable cuando se renderizan listas de elementos.

5. Endpoints API de Astro (Backend Intermediario)

Seguridad: El propósito principal es actuar como un proxy seguro. El token de la API externa (EXTERNAL_API_TOKEN) NUNCA debe salir del servidor.

Manejo de Errores: Implementar try...catch robusto. Devolver códigos de estado HTTP apropiados (ej. 502 Bad Gateway si la API externa falla, 500 para errores internos del endpoint Astro).

Respuestas JSON: Devolver respuestas JSON consistentes al frontend.

Simplicidad: Mantener estos endpoints lo más simples posible. Si la lógica de negocio se vuelve muy compleja, podría ser una señal para considerar un backend dedicado más adelante.

6. Accesibilidad (a11y)

HTML Semántico: Usar etiquetas HTML apropiadas para su propósito (ej. <nav>, <main>, <article>, <aside>, <button>).

Atributos ARIA: Usar atributos ARIA cuando sea necesario para mejorar la semántica y la experiencia de los usuarios de tecnologías asistivas (ej. aria-label, aria-hidden, aria-current, role).

Navegación por Teclado: Asegurar que todos los elementos interactivos sean accesibles y operables usando solo el teclado. Mantener un orden de foco lógico.

Contraste de Color: Verificar que el texto tenga suficiente contraste con su fondo.

Texto Alternativo para Imágenes: Siempre proveer texto alternativo descriptivo para las imágenes (alt attribute), excepto para imágenes puramente decorativas (en cuyo caso, alt="").

Formularios Accesibles:

Asociar etiquetas (<label>) con sus controles de formulario (<input>, <textarea>) usando el atributo for o anidándolos.

Proveer feedback claro de errores y validación.

7. Usabilidad (UX)

Feedback al Usuario: Proveer indicaciones claras de estados de carga, errores y éxito de las acciones.

Rendimiento:

Optimizar imágenes (compresión, formatos modernos como WebP).

Usar loading="lazy" para imágenes fuera del viewport inicial.

Minimizar el JavaScript enviado al cliente (Astro ayuda mucho con esto).

Diseño Responsivo: Asegurar que el sitio se vea y funcione bien en todos los tamaños de pantalla.

Navegación Intuitiva: La estructura de navegación debe ser clara y fácil de usar.

Consistencia: Mantener un diseño y comportamiento consistentes a lo largo del sitio.

8. Gestión de Dependencias

Mantener las dependencias actualizadas (con precaución, probando después de actualizar).

Eliminar dependencias no utilizadas.

Revisar npm audit o yarn audit periódicamente para vulnerabilidades.

9. Pruebas

(Idealmente, para fases posteriores o proyectos más grandes)

Considerar pruebas unitarias para lógica compleja (React Testing Library, Vitest).

Pruebas E2E para flujos críticos (Playwright, Cypress).

🤝 Contribuciones

Si deseas contribuir, por favor sigue estas pautas:

Crea una rama para tu feature o bugfix (ej. feat/nombre-feature o fix/descripcion-bug).

Realiza tus cambios y haz commits siguiendo las Convenciones de Commit.

Asegúrate de que el código siga las buenas prácticas y convenciones descritas en este README.

Abre un Pull Request (PR) describiendo tus cambios.

Espera la revisión del código.
