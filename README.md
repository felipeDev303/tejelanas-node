# Tejelanas Vivi - Proyecto Full Stack (Node.js & Astro)

Este repositorio contiene el proyecto **Tejelanas Vivi**. Actualmente, se centra en un **frontend** robusto construido con [Astro](https://astro.build/), React y Tailwind CSS, que consume una API externa de forma segura a través de endpoints API propios. Se plantea la evolución hacia un **backend** dedicado con Node.js y Express para mayor autonomía y funcionalidades personalizadas.

## 📌 Estructura General del Repositorio

```
.
├── frontend/ # Aplicación Frontend (Astro, React, Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   └── api/ # Endpoints API de Astro (BFF actual)
│   │   └── styles/
│   ├── astro.config.mjs
│   ├── package.json
│   ├── .env.example # Variables de entorno para el frontend
│   └── README.md # (Este archivo)
│
├── backend/ # (Futuro) Aplicación Backend (Node.js, Express)
│   ├── src/
│   ├── package.json
│   └── .env.example # Variables de entorno para el backend
│
├── docs/ # Documentación general del proyecto
│   └── swagger.yaml # Especificación OpenAPI (puede cubrir BFF y futuro backend)
│
└── README.md # README principal del repositorio (si este es el de frontend, se puede mover)
```

> **Nota:** Este `README.md` se enfoca principalmente en la parte **Frontend**. La documentación y el código del backend se desarrollarán en su respectiva carpeta.

---

## Frontend (Astro, React, Tailwind CSS)

### Introducción

El frontend de **Tejelanas Vivi** está diseñado para ofrecer una experiencia de usuario moderna, rápida y accesible. Utiliza Astro para la estructura y el rendimiento, React para componentes interactivos, y Tailwind CSS para un estilizado eficiente.

### Consumo de API Externa (Situación Actual)

Actualmente, el frontend consume una API externa. Para gestionar esta interacción de forma segura y flexible, se utilizan **endpoints API propios construidos con Astro** (ubicados en `frontend/src/pages/api/`). Estos actúan como un Backend For Frontend (BFF):

- Abstraen la API externa del cliente.
- Manejan de forma segura los tokens de autenticación necesarios para la API externa (estos tokens nunca se exponen al navegador).
- Permiten transformar o adaptar los datos de la API externa antes de enviarlos al frontend.

**¿Qué pasa si no se necesita la API externa en el futuro?**
Si los requisitos cambian y el consumo de la API externa ya no es necesario, estos endpoints de Astro pueden ser:

- Modificados para servir datos mockeados o estáticos.
- Eventualmente reemplazados o complementados por un backend propio más robusto (ver "Próximas Features").

### ✨ Características Principales del Frontend

- **Astro**: Framework principal para la construcción del sitio, enfocado en el rendimiento y la generación de HTML (con opción de SSR mediante adaptador Node.js).
- **React**: Utilizado para componentes UI interactivos y dinámicos (carrusel, formularios, header, tarjetas de producto, secciones de contenido, etc.) integrados como "Islas de Astro".
- **Tailwind CSS**: Framework CSS de utilidad para un desarrollo de estilos rápido, personalizable y responsivo.
- **Endpoints API de Astro (BFF)**: Rutas en `frontend/src/pages/api/*` como capa intermediaria segura.
- **Componentes Reutilizables**: Diseño modular (`ProductCard`, `ProductBanner`, `ContactForm`, etc.).
- **Buenas Prácticas**: Énfasis en código limpio, manejo de errores, estados de carga, accesibilidad (ARIA) y usabilidad.

### 🚀 Empezando con el Frontend

#### Prerrequisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

#### Instalación

1. **Clona el repositorio (si aún no lo has hecho):**

   ```bash
   git clone https://github.com/tu-usuario/tejelanas-vivi-node.git
   cd tejelanas-vivi-node/frontend
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz de la carpeta `frontend/`:

   ```env
   # frontend/.env
   EXTERNAL_API_URL_BASE="https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1"
   EXTERNAL_API_TOKEN="TU_BEARER_TOKEN_PARA_LA_API_EXTERNA"
   # Para el cliente (si alguna variable debe ser pública, aunque no es el caso de los tokens)
   # PUBLIC_ALGUNA_VARIABLE_PUBLICA="valor"
   ```

   > **Importante:** El archivo `.env` **no** debe subirse al repositorio. Asegúrate de que esté en tu `.gitignore` global o en `frontend/.gitignore`. Se recomienda tener un `.env.example` con la estructura.

#### Ejecución en Desarrollo

```bash
npm run dev
```

El servidor de desarrollo Astro se iniciará, generalmente en http://localhost:4321.

#### Build para Producción

```bash
npm run build
```

Esto generará los archivos optimizados (ej. en dist/) o preparará la aplicación para el modo SSR, según la configuración de tu adaptador en astro.config.mjs.

## 📜 Guía de Buenas Prácticas y Convenciones (Frontend)

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
- **Git y Commits:**
  - Ramas descriptivas, Conventional Commits.

## 🔮 Próximas Features / Evolución del Backend

Si bien los endpoints API de Astro sirven bien como un BFF inicial, el proyecto "Tejelanas Vivi" tiene el potencial de crecer y requerir funcionalidades más avanzadas que justificarían un backend dedicado.

### Objetivos de un Backend Propio (Node.js + Express)

Un backend propio en la carpeta backend/ (utilizando Node.js, Express, y potencialmente una base de datos) permitiría:

- **Persistencia de Datos Propia:**
  - Almacenar información de productos, talleres, FAQs, y otros contenidos directamente, sin depender de la API externa.
  - Gestionar inventario, precios, y descripciones de forma autónoma.
  - Almacenar envíos de formularios de contacto.
- **Gestión de Usuarios y Autenticación:**
  - Implementar un sistema de registro e inicio de sesión para clientas.
  - Permitir a las clientas ver historial de pedidos, guardar favoritos, etc.
  - Implementar un panel de administración para que "Tejelanas Vivi" gestione el contenido y los pedidos.
- **Procesamiento de Pedidos y Pagos (E-commerce Básico):**
  - Integración con pasarelas de pago (Stripe, PayPal, Mercado Pago).
  - Lógica para gestionar el carrito de compras y el proceso de checkout.
- **Notificaciones Personalizadas:**
  - Envío de correos electrónicos transaccionales (confirmación de pedido, envío, etc.).
- **Mayor Control y Escalabilidad:**
  - Total control sobre la lógica de negocio y la estructura de la API.
  - Capacidad de optimizar y escalar el backend de forma independiente al frontend.
- **API Pública (Opcional):**
  - Si en el futuro se desea exponer una API para integraciones con terceros.

### Pasos Potenciales para la Construcción del Backend

1. Definición de Requisitos: Detallar qué funcionalidades específicas necesitará el backend.
2. Diseño de la API: Crear una especificación OpenAPI (swagger.yaml en docs/) para la nueva API interna.
3. Elección de Base de Datos: Decidir entre SQL (PostgreSQL, MySQL) o NoSQL (MongoDB) según las necesidades.
4. Desarrollo de Endpoints CRUD: Implementar operaciones para crear, leer, actualizar y eliminar los recursos principales (productos, servicios, usuarios, pedidos, etc.).
5. Implementación de Autenticación y Autorización: (ej. JWT, Passport.js).
6. Integración con el Frontend: Modificar el frontend (específicamente frontend/src/lib/apiClient.js y los endpoints API de Astro) para que, en lugar de (o además de) llamar a la API externa, llamen a este nuevo backend. Los endpoints de Astro podrían seguir actuando como BFF, pero ahora hacia tu propio backend.
7. Despliegue del Backend: Configurar un entorno de hosting para la aplicación Node.js/Express.

Este desarrollo del backend se llevaría a cabo en la carpeta backend/ del repositorio, manteniendo una clara separación del frontend.

## 🤝 Contribuciones

Si deseas contribuir, por favor sigue estas pautas:

- Crea una rama para tu feature o bugfix (ej. feat/nombre-feature o fix/descripcion-bug).
- Realiza tus cambios y haz commits siguiendo las Convenciones de Commit.
- Asegúrate de que el código siga las buenas prácticas y convenciones descritas en este README.
- Abre un Pull Request (PR) describiendo tus cambios.
- Espera la revisión del código.
