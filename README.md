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
   cd tejelanas-node/frontend
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

```
frontend/
├── public/                # Assets estáticos (imágenes, favicons, fonts)
├── src/
│   ├── components/        # Componentes React y Astro reutilizables
│   ├── layouts/           # Layouts de Astro (.astro)
│   ├── lib/               # Código de utilidad, helpers (ej. apiClient.js)
│   ├── pages/             # Rutas y páginas de Astro (.astro) y Endpoints API (.js, .ts)
│   │   ├── api/           # Endpoints API de Astro (backend intermediario)
│   ├── styles/            # Estilos globales CSS o Tailwind base (ej. global.css)
│   └── env.d.ts           # (Si usas TypeScript) Definiciones de tipo para variables de entorno
├── astro.config.mjs       # Configuración de Astro
├── package.json
├── tailwind.config.js     # Configuración de Tailwind CSS
├── tsconfig.json          # (Si usas TypeScript) Configuración de TypeScript
├── .env                   # (No subir a Git) Variables de entorno locales
├── .env.example           # Ejemplo de variables de entorno
└── README.md
```

## 📜 Buenas Prácticas y Convenciones

- **Nomenclatura:**
  - Componentes React: PascalCase (ej. ProductCard.jsx, ContactForm.jsx).
  - Archivos Astro: PascalCase (ej. Layout.astro) o kebab-case para rutas.
  - Endpoints API: kebab-case (ej. products-services.js).
  - Variables locales: camelCase. Constantes globales: SCREAMING_SNAKE_CASE.
  - Variables de entorno: SCREAMING_SNAKE_CASE.
- **Estructura:**
  - Mantener componentes en `src/components/`.
  - Centralizar lógica de API en `src/lib/apiClient.js`.
  - Layouts en `src/layouts/`.
  - Endpoints en `src/pages/api/`.
- **Variables de Entorno:**
  - Usar variables de entorno para configuración sensible.
  - Variables para el cliente deben tener el prefijo PUBLIC\_.
- **React:**
  - Usar componentes funcionales y hooks.
  - Especificar correctamente el array de dependencias en useEffect.
  - Proveer keys únicas en listas.
- **Endpoints API de Astro:**
  - El token de la API externa nunca debe salir del servidor.
  - Manejar errores y devolver respuestas JSON consistentes.
- **Accesibilidad:**
  - Usar HTML semántico y atributos ARIA cuando sea necesario.
  - Asegurar navegación por teclado y contraste adecuado.
- **Usabilidad:**
  - Proveer feedback de carga y errores.
  - Optimizar imágenes y usar diseño responsivo.
- **Dependencias:**
  - Mantener dependencias actualizadas y eliminar las no usadas.
- **Pruebas:**
  - (Opcional) Usar pruebas unitarias y E2E para flujos críticos.

## 🤝 Contribuciones

Si deseas contribuir, por favor sigue estas pautas:

- Crea una rama para tu feature o bugfix (ej. feat/nombre-feature o fix/descripcion-bug).
- Realiza tus cambios y haz commits siguiendo las Convenciones de Commit.
- Asegúrate de que el código siga las buenas prácticas y convenciones descritas en este README.
- Abre un Pull Request (PR) describiendo tus cambios.
- Espera la revisión del código.
