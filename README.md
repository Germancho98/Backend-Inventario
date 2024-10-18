# Proyecto de Inventario - Backend 

Este proyecto es un sistema de inventario desarrollado con Node.js, Express y MongoDB. El backend proporciona una API RESTful para gestionar usuarios, categorías, productos, movimientos y reportes.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización.
- **bcryptjs**: Para el hashing de contraseñas.
- **dotenv**: Para la gestión de variables de entorno.
- **Jest**: Framework de pruebas para JavaScript.
- **Supertest**: Biblioteca para probar aplicaciones HTTP.

## Estructura del Proyecto
Backend/ 
├── controllers/ │ 
    ├── categoryController.js │ 
    ├── historyController.js │ 
    ├── movementController.js │ 
    ├── productController.js 
    │ └── userController.js 
├── models/ │ 
    ├── category.js │ 
    ├── history.js │ 
    ├── movement.js │ 
    ├── product.js │ 
    └── user.js 
├── routes/ │ 
    ├── categoryRoutes.js │ 
    ├── historyRoutes.js │ 
    ├── movementRoutes.js │ 
    ├── productRoutes.js │ 
    └── userRoutes.js 
├── test/ │ 
    ├── categoryController.test.js │ 
    ├── historyController.test.js │ 
    ├── movementController.test.js │ 
    ├── productController.test.js │ 
    └── userController.test.js 
├── .env 
├── app.js 
├── package.json


## Configuración del Proyecto

### 1. Clonar el Repositorio

npm install
MONGODB_URI=mongodb://localhost:27017/inventario
JWT_SECRET=tu_secreto_jwt
npm run dev
npm test

Usuarios
POST /api/users/register: Registrar un nuevo usuario.
POST /api/users/login: Iniciar sesión.
GET /api/users: Obtener todos los usuarios.
GET /api/users/:id: Obtener un usuario por ID.
PUT /api/users/:id: Actualizar un usuario.
DELETE /api/users/:id: Eliminar un usuario.
Categorías
POST /api/categories: Crear una nueva categoría.
GET /api/categories: Obtener todas las categorías.
GET /api/categories/:id: Obtener una categoría por ID.
PUT /api/categories/:id: Actualizar una categoría.
DELETE /api/categories/:id: Eliminar una categoría.
Productos
POST /api/products: Crear un nuevo producto.
GET /api/products: Obtener todos los productos.
GET /api/products/:id: Obtener un producto por ID.
PUT /api/products/:id: Actualizar un producto.
DELETE /api/products/:id: Eliminar un producto.
Movimientos
POST /api/movements: Crear un nuevo movimiento.
GET /api/movements: Obtener todos los movimientos.
GET /api/movements/:id: Obtener un movimiento por ID.
PUT /api/movements/:id: Actualizar un movimiento.
DELETE /api/movements/:id: Eliminar un movimiento.
Reportes
GET /api/reports/inventory: Obtener un reporte de inventario.
GET /api/reports/movements: Obtener un reporte de movimientos.

Contribuir
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Haz push a la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.