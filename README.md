# grihf-frontend_capstone_starter_code

med_appt es una aplicación web full-stack (MERN) que permite a los pacientes
registrarse, iniciar sesión, buscar doctores, reservar citas médicas, dejar reseñas y
gestionar su perfil.

## Tecnologías

- **Frontend:** React 18 + Vite, React Router, Axios
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB (Mongoose)
- **Autenticación:** JSON Web Tokens (JWT) + bcryptjs

## Estructura del proyecto

```
doctor-appointment-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Instrucciones de configuración

### 1. Requisitos previos

- Node.js 18+
- Una instancia de MongoDB (local o Atlas)

### 2. Clonar el repositorio

```bash
git clone [https://github.com/<tu-usuario>/<tu-repositorio>.git
cd doctor-appointment-app](https://github.com/DavidGaitan09/grihf-frontend_capstone_starter_code.git)
```

### 3. Configurar el Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tu MONGO_URI y JWT_SECRET
npm run dev
```

El backend correrá por defecto en `http://localhost:5000`.

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend correrá por defecto en `http://localhost:5173`.

Crea un archivo `.env` en `frontend/` si necesitas apuntar a otra URL de API:

```
VITE_API_URL=http://localhost:5000/api
```

### 5. Build de producción del frontend

```bash
cd frontend
npm run build
```

Esto genera la carpeta `dist/` lista para desplegar.

## Endpoints principales de la API

| Método | Endpoint                       | Descripción                         |
|--------|---------------------------------|--------------------------------------|
| POST   | `/api/auth/register`            | Registra un nuevo usuario            |
| POST   | `/api/auth/login`               | Autentica a un usuario               |
| GET    | `/api/doctors?query=`           | Busca doctores por nombre/especialidad |
| POST   | `/api/appointments`             | Crea una cita                        |
| PATCH  | `/api/appointments/:id/cancel`  | Cancela una cita                     |
| POST   | `/api/reviews`                  | Envía una reseña                     |
| GET    | `/api/reviews`                  | Lista todas las reseñas              |

## Despliegue

- **Backend:** Render, Railway o cualquier servicio Node compatible con MongoDB.
- **Frontend:** Vercel, Netlify o cualquier servicio de hosting estático (sirviendo `dist/`).

## Licencia

Proyecto educativo con fines de evaluación.
