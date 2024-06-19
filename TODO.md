# TODO

## MAILING Y MENSAJERÍA

1. **MODIFICAR LA CAPA DE PERSISTENCIA PARA APLICAR LOS CONCEPTOS DE FACTORY, DAO Y DTO:**

- [✅] Implementar un mecanismo para devolver el DAO seleccionado por un parámetro en línea de comandos.
- [✅] Utilizar una Factory (opcional) para devolver el DAO a la capa de negocio.
- [✅] Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

2. **MODIFICAR LA RUTA /CURRENT PARA ENVIAR UN DTO DEL USUARIO:**

- [✅] Ajustar la ruta /current para enviar únicamente la información necesaria del usuario en un DTO.
- [✅] Asegurar que no se envíe información sensible.

3. **CREAR UN MIDDLEWARE DE AUTORIZACIÓN:**

- [✅] Desarrollar un middleware para trabajar con la estrategia "current" y realizar la autorización en los endpoints.
- [✅] Permitir que solo el administrador pueda crear, actualizar y eliminar productos.
- [✅] Restringir el acceso a ciertos endpoints, como el envío de mensajes al chat y la manipulación del carrito, solo para usuarios autorizados.

4. **CREAR UN MODELO TICKET PARA FORMALIZAR COMPRAS:**

- [✅] Definir un modelo Ticket con los campos especificados.
- [✅] Implementar la generación automática de un código único para cada ticket.
- [✅] Guardar la fecha y hora exacta de la compra.
- [✅] Asociar el comprador (purchaser) al correo del usuario asociado al carrito.

5. **IMPLEMENTAR LA RUTA /:CID/PURCHASE EN EL ROUTER DE CARRITOS:**

- [✅] Crear la ruta /:cid/purchase para finalizar el proceso de compra del carrito especificado.
- [✅] Verificar el stock del producto al momento de finalizar la compra.
- [✅] Restar el stock del producto si hay suficiente disponibilidad.
- [✅] No agregar el producto al proceso de compra si no hay suficiente stock.
- [✅] Utilizar el servicio de Tickets para generar un ticket con los datos de la compra.
- [✅] Devolver un arreglo con los IDs de los productos que no pudieron procesarse si existen compras no completadas.
- [✅] Filtrar el carrito del usuario para contener solo los productos que no pudieron ser comprados.

## OPTIMIZACIÓN

1. **GENERAR UN MÓDULO DE MOCKING PARA EL SERVIDOR:**

- [✅] Crear un módulo en el servidor que pueda simular la respuesta de una petición de MongoDB.
- [✅] Configurar el módulo para que pueda generar y entregar 100 productos con el mismo formato que una respuesta de MongoDB.
- [✅] Asegurarse de que esta funcionalidad solo esté disponible en un endpoint específico, '/mockingproducts'.
- [✅] Crear un customizador de errores:

2. **DESARROLLAR UN MECANISMO PARA PERSONALIZAR LOS ERRORES QUE EL SERVIDOR PUEDE DEVOLVER EN DIFERENTES SITUACIONES.**

- [✅] Este customizador de errores debe ser flexible y capaz de manejar errores comunes en acciones como crear un producto, agregarlo al carrito, etc.
- [✅] Implementar un diccionario para almacenar los errores más comunes y asociarlos con códigos de error apropiados.

## LOGGING Y TESTING DE PERFORMANCE

1. **DEFINIR EL SISTEMA DE NIVELES DE REGISTRO:**

   - [✅] Definir los niveles de registro en orden de prioridad: debug, http, info, warning, error, fatal.

2. **IMPLEMENTAR EL LOGGER PARA DESARROLLO:**

   - [✅] Configurar una instancia de Winston para el entorno de desarrollo.
   - [✅] Establecer el nivel de registro mínimo en debug.
   - [✅] Configurar el transporte para registrar en la consola.

3. **IMPLEMENTAR EL LOGGER PARA PRODUCCIÓN:**

   - [✅] Configurar una instancia de Winston para el entorno de producción.
   - [✅] Establecer el nivel de registro mínimo en info.
   - [✅] Configurar el transporte para registrar en un archivo "errors.log" a partir del nivel de error.

4. **AGREGAR LOGS EN PUNTOS IMPORTANTES DEL SERVIDOR:**

   - [✅] Añadir registros de valor alto en puntos críticos del servidor, como errores, advertencias, etc.
   - [✅] Modificar las llamadas a `console.log()` existentes para utilizar las instancias de Winston y registrar todos los niveles a partir de Winston.

5. **CREAR EL ENDPOINT /LOGGERTEST:**
   - [✅] Implementar un endpoint /loggerTest en el servidor.
   - [✅] Utilizar este endpoint para probar todos los niveles de registro y verificar que los registros se realicen correctamente según la configuración de desarrollo o producción.

## TERCERA PRÁCTICA INTEGRADORA

1. **SISTEMA DE RECUPERACIÓN DE CONTRASEÑA**

- [✅] Implementar la funcionalidad para enviar un correo con un botón que redirija a una página para restablecer la contraseña.
- [✅] Asegurarse de que el link del correo expire después de 1 hora de enviado.
- [✅] Crear una vista que permita generar nuevamente el correo de restablecimiento si el link ha expirado, con una nueva duración de 1 hora.
- [✅] Implementar la lógica para impedir que el usuario restablezca la contraseña con la misma contraseña que ya tenía, y mostrar un mensaje de error si intenta hacerlo.

2. **MODIFICACIONES EN EL SCHEMA DEL USUARIO Y EL PRODUCTO**

- [✅] Añadir un nuevo rol "premium" al schema del usuario, habilitado para crear productos.
- [✅] Modificar el schema del producto para incluir un campo "owner" que haga referencia a la persona que creó el producto.
  - [✅] Asegurarse de que el campo "owner" guarde sólo el correo electrónico (o \_id) del usuario que creó el producto.
  - [✅] Si un producto se crea sin owner, establecer "admin" como valor por defecto.

3. **PERMISOS DE MODIFICACIÓN Y ELIMINACIÓN DE PRODUCTOS**

- [✅] Modificar los permisos de los productos:
  - [✅] Permitir que un usuario premium sólo pueda borrar los productos que le pertenecen.
  - [✅] Permitir que el admin pueda borrar cualquier producto, incluso si tiene un owner.
- [✅] Modificar la lógica del carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece.

4. **NUEVA RUTA EN EL ROUTER DE API**

- [✅] Implementar una nueva ruta en el router de API `/api/users/premium/:uid`.
  - [✅] Permitir cambiar el rol de un usuario de "user" a "premium" y viceversa.

## DOCUMENTAR API

- [✅] Se debe tener documentado el módulo de productos.
- [✅] Se debe tener documentado el módulo de carrito
- [✅] No realizar documentación de sesiones

## TESTING AVANZADO

1. **PREPARACIÓN DEL ENTORNO DE TESTING**

- [✅] Instalar Mocha, Chai y Supertest:
  ```bash
  npm install mocha chai supertest --save-dev
  ```
- [✅] Configurar un script de prueba en `package.json`:
  ```json
  "scripts": {
    "test": "mocha --timeout 10000"
  }
  ```

2. **CREAR LA ESTRUCTURA DE ARCHIVOS DE PRUEBAS**

- [✅] Crear un directorio para las pruebas (e.g., `test`):
  - [✅] Crear archivos de prueba para cada router:
    - `test/products.test.js`
    - `test/carts.test.js`
    - `test/sessions.test.js`

3. **PRUEBAS PARA EL ROUTER DE PRODUCTS**

- [✅] Incluir por lo menos 3 tests desarrollados para el router de products:
  - [✅] Test para crear un producto correctamente.
  - [✅] Test para obtener un producto por ID y validar su contenido.
  - [✅] Test para actualizar un producto y verificar los cambios.
  - [✅] Test para eliminar un producto y verificar que ya no exista.

4. **PRUEBAS PARA EL ROUTER DE CARTS**

- [✅] Incluir por lo menos 3 tests desarrollados para el router de carts:
  - [✅] Test para agregar un producto al carrito y verificar que se ha agregado correctamente.
  - [✅] Test para obtener el carrito y validar que contiene los productos esperados.
  - [✅] Test para actualizar la cantidad de un producto en el carrito y verificar los cambios.
  - [✅] Test para eliminar un producto del carrito y verificar que ya no esté presente.

5. **PRUEBAS PARA EL ROUTER DE SESSIONS**

- [✅] Incluir por lo menos 3 tests desarrollados para el router de sessions:
  - [✅] Test para iniciar sesión correctamente con credenciales válidas.
  - [✅] Test para fallar al iniciar sesión con credenciales inválidas y verificar el mensaje de error.
  - [✅] Test para cerrar sesión y verificar que el usuario ya no esté autenticado.

6. **EJECUCIÓN Y VALIDACIÓN DE LAS PRUEBAS**

- [✅] Ejecutar las pruebas y asegurarse de que todas pasen:
  ```bash
  npm test
  ```
- [✅] Revisar y corregir cualquier error o falla en las pruebas.
- [✅] Asegurarse de que las pruebas cubran adecuadamente las funcionalidades de cada router y las validaciones necesarias.

## CUARTA PRÁCTICA INTEGRADORA

1. **REORGANIZACIÓN DE RUTAS**

- [✅] Mover la ruta `/api/users/premium/:uid` a un router específico para usuarios en `/api/users/`.

2. **MODIFICACIÓN DEL MODELO DE USER**

- [✅] Añadir una nueva propiedad `documents` al modelo de User, que será un array de objetos con las propiedades:
  - `name: String` (Nombre del documento)
  - `reference: String` (Link al documento)
- [✅] Añadir una nueva propiedad `last_connection` al modelo de User, que se actualizará en cada login y logout.

3. **ENDPOINT PARA SUBIR DOCUMENTOS**

- [✅] Crear un endpoint en el router de usuarios `api/users/:uid/documents` con el método POST.
- [✅] Utilizar el middleware de Multer para recibir y gestionar los documentos cargados.
- [✅] Actualizar el modelo de User para reflejar que el usuario ha subido documentos específicos.

4. **CONFIGURACIÓN DE MULTER**

- [✅] Configurar Multer para guardar archivos en diferentes carpetas según el tipo de archivo:
  - Imágenes de perfil en una carpeta `profiles`.
  - Imágenes de productos en una carpeta `products`.
  - Documentos en una carpeta `documents`.

5. **MODIFICACIÓN DEL ENDPOINT PARA ACTUALIZAR A PREMIUM**

- [✅] Modificar el endpoint `/api/users/premium/:uid` para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
  - Identificación
  - Comprobante de domicilio
  - Comprobante de estado de cuenta

6. **VALIDACIONES Y ACTUALIZACIONES DE CONEXIÓN**

- [✅] Asegurarse de que la propiedad `last_connection` se actualice correctamente cada vez que el usuario inicie sesión (login) o cierre sesión (logout).

7. **PRUEBAS Y VALIDACIÓN**

- [✅] Probar la carga de documentos y verificar que se guardan en las carpetas correctas.
- [✅] Verificar que la promoción a usuario premium sólo ocurre si se han subido los documentos requeridos.
- [✅] Asegurarse de que las rutas reorganizadas funcionan correctamente.
- [✅] Validar que la propiedad `last_connection` se actualice en los procesos de login y logout.

## FINAL

1. **NUEVAS RUTAS EN EL ROUTER DE /API/USERS**

  - [✅] **GET /API/USERS**: Obtener todos los usuarios devolviendo los datos principales (nombre, correo, tipo de cuenta).
  - [✅] **DELETE /API/USERS**: Limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días.
  - [✅] Implementar la lógica para verificar la última conexión y eliminar los usuarios inactivos.
  - [✅] Enviar un correo notificando a los usuarios que su cuenta ha sido eliminada por inactividad.

2. **VISTA DE ADMINISTRACIÓN DE USUARIOS**

  - [✅] Crear una vista accesible solo para el administrador para visualizar, modificar el rol y eliminar un usuario.
  - [✅] Asegurarse de que esta vista incluya:
    - Listado de usuarios con datos principales.
    - Opciones para modificar el rol de un usuario.
    - Opción para eliminar un usuario.

3. **MODIFICACIÓN DEL ENDPOINT DE ELIMINACIÓN DE PRODUCTOS**

- [] Modificar el endpoint que elimina productos para que, en caso de que el producto pertenezca a un usuario premium, se envíe un correo indicándole que el producto fue eliminado.

4. **VISTAS PARA EL FLUJO COMPLETO DE COMPRA**

- [✅] Finalizar las vistas necesarias para realizar el flujo completo de compra. Esto puede incluir:
  - [✅] Página de listado de productos.
  - [✅] Página de detalles del producto.
  - [✅] Página de carrito de compras.
  - [✅] Página de checkout (pago y confirmación).
  - [✅] Página de confirmación de pedido.

5. **DESPLIEGUE DEL APLICATIVO**

- [✅] Realizar el despliegue de tu aplicativo en la plataforma de tu elección (preferentemente Railway.app).
- [✅] Corroborar que se puede llevar a cabo un proceso de compra completo en el entorno desplegado.

6. **VALIDACIÓN Y PRUEBAS**

- [✅] Probar las nuevas rutas y funcionalidades para asegurar que funcionan correctamente.
- [✅] Asegurarse de que la vista de administración es accesible solo para el administrador.
- [] Verificar que los correos se envían correctamente tanto para la eliminación de usuarios inactivos como para la eliminación de productos de usuarios premium.
- [✅] Realizar pruebas de flujo de compra completo en el entorno desplegado para asegurar que todo funciona según lo esperado.

7. **DOCUMENTACIÓN Y ACTUALIZACIÓN DEL REPOSITORIO**

- [✅] Actualizar la documentación del proyecto para reflejar las nuevas rutas, funcionalidades y vistas.
- [✅] Asegurarse de que el código esté debidamente comentado y estructurado.
- [✅] Publicar y actualizar el repositorio en GitHub.
