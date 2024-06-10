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
- `/api/products`: Gestiona la información de los productos disponibles para la venta.
- `/api/messages`: Gestiona la mensajería entre usuarios.
- `/api/carts`: Gestiona el carrito de compras de los usuarios.
- `/api/sessions`: Gestiona la autenticación de usuarios y sesiones.
- `/api/tickets`: Gestiona la compra de productos y generación de tickets de compra.

Para obtener detalles sobre todos los endpoints disponibles y cómo usarlos, consulta la documentación de la API generada con Swagger UI.