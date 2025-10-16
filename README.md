# 💰 Gestor Financiero Personal

Una aplicación web moderna para gestionar tus finanzas personales con React, Node.js, Express y PostgreSQL.

## 🚀 Características

- **Autenticación segura** con JWT
- **Registro e inicio de sesión** de usuarios
- **Dashboard interactivo** con gráficos y estadísticas
- **Gestión de transacciones** (ingresos y gastos)
- **Categorización** de gastos
- **Sistema de alertas** inteligentes
- **Interfaz moderna** con Material-UI y animaciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework de UI
- **Material-UI** - Componentes de interfaz
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos y visualizaciones
- **React Router** - Navegación
- **Tailwind CSS** - Estilos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

## 📋 Prerrequisitos

- Node.js (versión 18 o superior)
- PostgreSQL
- npm o yarn

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd nueva-carpeta
```

### 2. Configurar el Backend

```bash
cd server
npm install
```

### 3. Configurar la Base de Datos

1. **Instalar PostgreSQL** en tu sistema
2. **Crear una base de datos** llamada `nueva_carpeta_db`
3. **Crear el archivo `.env`** en la carpeta `server/` con el siguiente contenido:

```env
# Configuración de la base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nueva_carpeta_db"

# JWT Secret para autenticación
JWT_SECRET="tu_jwt_secret_muy_seguro_aqui"

# Puerto del servidor
PORT=3000
```

4. **Ejecutar las migraciones** de Prisma:
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Configurar el Frontend

```bash
cd client
npm install
```

## 🚀 Ejecutar la Aplicación

### Terminal 1 - Backend
```bash
cd server
npm start
```
El servidor estará disponible en: `http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd client
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

## 📱 Uso de la Aplicación

### 1. **Registro de Usuario**
- Ve a `http://localhost:5173`
- Haz clic en "¿No tienes cuenta? Regístrate"
- Completa el formulario de registro

### 2. **Iniciar Sesión**
- Usa tus credenciales para iniciar sesión
- Serás redirigido al dashboard

### 3. **Dashboard**
- Visualiza tus estadísticas financieras
- Ve gráficos de gastos por categoría
- Revisa alertas importantes

### 4. **Agregar Transacciones**
- Haz clic en "Nueva Transacción"
- Completa el formulario con:
  - Monto (positivo para ingresos, negativo para gastos)
  - Descripción
  - Categoría
  - Fecha

### 5. **Gestionar Finanzas**
- El dashboard se actualiza automáticamente
- Recibe alertas cuando tu saldo es bajo
- Visualiza tus gastos por categoría

## 🔐 Seguridad

- Las contraseñas se encriptan con bcryptjs
- Autenticación JWT para proteger rutas
- Validación de datos en frontend y backend
- Middleware de autenticación en rutas protegidas

## 📊 API Endpoints

### Autenticación
- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión
- `GET /users` - Ver usuarios (desarrollo)

### Transacciones
- `GET /transactions` - Obtener transacciones del usuario
- `POST /transactions` - Crear nueva transacción
- `DELETE /transactions/:id` - Eliminar transacción

### Dashboard
- `GET /dashboard` - Obtener estadísticas del dashboard

### Alertas
- `GET /alerts` - Obtener alertas del usuario

## 🎨 Características de la UI

- **Diseño responsivo** que funciona en móviles y desktop
- **Animaciones suaves** con Framer Motion
- **Tema moderno** con gradientes y sombras
- **Gráficos interactivos** con Recharts
- **Componentes Material-UI** para consistencia

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté ejecutándose
- Confirma que la URL de conexión en `.env` sea correcta
- Ejecuta `npx prisma migrate dev` para crear las tablas

### Error de token inválido
- Verifica que `JWT_SECRET` esté configurado en `.env`
- Asegúrate de que el token no haya expirado
- Intenta cerrar sesión y volver a iniciar

### Error de CORS
- El servidor está configurado para aceptar peticiones desde `http://localhost:5173`
- Si usas un puerto diferente, actualiza la configuración CORS en `server/index.js`


¡Disfruta gestionando tus finanzas de manera moderna y eficiente! 💰✨
