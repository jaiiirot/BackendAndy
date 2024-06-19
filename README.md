# e-commerce Ilicito

## Descripción
e-commerce Ilicito es una aplicación de comercio electrónico que permite a los usuarios comprar y vender productos en línea. Está construida con Node.js y Express.js en el backend, utilizando una base de datos MongoDB para almacenar datos de usuarios, productos y otras entidades relacionadas. La aplicación también incluye características como autenticación de usuario, gestión de carrito de compras, mensajería y procesamiento de pagos.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <URL del repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en el directorio raíz del proyecto y define las variables de entorno necesarias. Aquí tienes un ejemplo:
   ```plaintext
   PORT=<tu_puerto>
   DB_MONGO=<tu_puerto_mongo>
   SECRET_COOKIE=<tu_secret_cookie>
   SECRET_SESSION=<tu_secret_session>
   TTL=<tu_ttl>

   # Asegúrate de configurar estas credenciales antes de iniciar la aplicación
   # GitHub OAuth
   GITHUB_CLIENT_ID=<tu_id_client>
   GITHUB_CLIENT_SECRET=<tu_secreto_de_cliente_github>
   GITHUB_CALLBACK_URL=<tu_puerto_callback>

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=<tu_usuario>
   CLOUDINARY_API_KEY=<tu_api_key_cloudinary>
   CLOUDINARY_API_SECRET=<tu_secreto_api_cloudinary>

   # Nodemailer
   NODEMAILER_USER=<tu_correo_electronico>
   NODEMAILER_KEY=<tu_contraseña_de_correo_electronico>
   ```

## Configuración
- **MONGODB_URI**: URI de conexión a la base de datos MongoDB.
- **SECRET_COOKIE**: Clave secreta para firmar cookies.
- **SECRET_SESSION**: Clave secreta para sesiones de usuario.
- **TTL**: Tiempo de vida de la sesión en segundos.
- **GITHUB_CLIENT_ID**: Identificador de cliente OAuth de GitHub.
- **GITHUB_CLIENT_SECRET**: Secreto de cliente OAuth de GitHub.
- **GITHUB_CALLBACK_URL**: URL de retorno de llamada para la autenticación de GitHub.
- **CLOUDINARY_CLOUD_NAME**: Nombre del cloudinary.
- **CLOUDINARY_API_KEY**: Clave de la API de Cloudinary.
- **CLOUDINARY_API_SECRET**: Secreto de la API de Cloudinary.
- **NODEMAILER_USER**: Correo electrónico para enviar correos electrónicos.
- **NODEMAILER_KEY**: Contraseña del correo electrónico.

## Uso
1. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   npm run dev
   ```

2. Accede a la aplicación en tu navegador web en `http://localhost:8080`

## Tecnologías utilizadas
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Passport.js
  - JWT (JSON Web Tokens)
  - Nodemailer
  - Socket.io
  - Winston (para registro)
  - Swagger (para documentación de la API)

## Endpoints de la API
La API de esta aplicación incluye los siguientes endpoints principales:
- **Productos**:
  - `GET /api/products`: Obtiene la lista de productos.
  - `POST /api/products`: Crea un nuevo producto (requiere autorización).
  - `GET /api/products/:id`: Obtiene un producto por su ID.
  - `PUT /api/products/:id`: Actualiza un producto por su ID (requiere autorización).
  - `DELETE /api/products/:id`: Elimina un producto por su ID (requiere autorización).

- **Mensajes**:
  - `GET /api/messages`: Obtiene la lista de mensajes.
  - `POST /api/messages`: Envía un nuevo mensaje (requiere autorización).

- **Carritos**:
  - `GET /api/carts`: Obtiene la lista de carritos.
  - `POST /api/carts`: Crea un nuevo carrito.
  - `PUT /api/carts/:cid`: Actualiza un carrito por su ID.
  - `DELETE /api/carts/:cid`: Elimina un carrito por su ID.
  - `POST /api/carts/:cid/purchase`: Finaliza la compra de un carrito.

- **Sesiones**:
  - `POST /api/sessions/login`: Inicia sesión.
  - `POST /api/sessions/logout`: Cierra sesión.
  - `GET /api/sessions/current`: Obtiene la información de la sesión actual en un DTO.

- **Tickets**:
  - `GET /api/tickets`: Obtiene la lista de tickets.
  - `POST /api/tickets`: Crea un nuevo ticket.

- **Usuarios**:
  - `GET /api/users`: Obtiene la lista de usuarios.
  - `DELETE /api/users`: Elimina usuarios inactivos.
  - `POST /api/users/:uid/documents`: Sube documentos para un usuario.
  - `POST /api/users/premium/:uid`: Cambia el rol de un usuario a premium.

Para obtener detalles sobre todos los endpoints disponibles y cómo usarlos, consulta la documentación de la API generada con Swagger UI.

## Características adicionales

### Modificación de la capa de persistencia
- Se ha implementado un mecanismo para devolver el DAO seleccionado por un parámetro en línea de comandos, utilizando una Factory para devolver el DAO a la capa de negocio y el patrón Repository para trabajar con el DAO en la lógica de negocio.

### Middleware de autorización
- Se ha desarrollado un middleware de autorización para asegurar que solo los administradores puedan crear, actualizar y eliminar productos, y que solo usuarios autorizados puedan enviar mensajes al chat y manipular el carrito.

### Modelo Ticket
- Se ha definido un modelo Ticket para formalizar compras, con generación automática de un código único y asociación del comprador al correo del usuario asociado al carrito.

### Módulo de mocking
- Se ha creado un módulo de mocking para simular la respuesta de MongoDB y generar 100 productos con el mismo formato que una respuesta de MongoDB.

### Customizador de errores
- Se ha desarrollado un customizador de errores flexible para manejar errores comunes en acciones como crear un producto, agregarlo al carrito, etc.

### Sistema de niveles de registro y logging
- Se ha definido un sistema de niveles de registro con Winston y se ha implementado tanto para desarrollo como para producción.

### Sistema de recuperación de contraseña
- Se ha implementado la funcionalidad para enviar un correo con un botón para restablecer la contraseña, asegurando que el link expire después de 1 hora y que la contraseña nueva no sea la misma que la anterior.

### Roles y permisos
- Se ha añadido un nuevo rol "premium" al esquema de usuario y se han modificado los permisos de modificación y eliminación de productos, asegurando que un usuario premium solo pueda borrar los productos que le pertenecen.

### Endpoints adicionales
- Se han añadido nuevas rutas en el router de usuarios, incluyendo la posibilidad de cambiar el rol de un usuario y subir documentos para un usuario.

### Documentación y pruebas
- Se ha documentado adecuadamente el módulo de productos y carrito, y se han implementado pruebas avanzadas con Mocha, Chai y Supertest.

### Vista de administración de usuarios
- Se ha creado una vista accesible solo para el administrador para visualizar, modificar el rol y eliminar usuarios.
