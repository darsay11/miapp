# 🏗️ Arquitectura de MiApp

## Visión General

MiApp es una aplicación **multiplataforma** diseñada para ser:
- 📱 Ejecutable en móvil (iOS/Android)
- 💻 Ejecutable en escritorio (Windows/Linux/Mac)
- 🌐 Ejecutable en web

## Stack Técnico

### Backend
```
Node.js + Express + TypeScript
    ↓
PostgreSQL (producción) + SQLite (local)
    ↓
JWT + Socket.io (real-time)
```

### Frontend
```
React + TypeScript + Vite
    ↓
Tailwind CSS
    ↓
Zustand (estado global)
```

### Mobile
```
React Native
    ↓
Misma API que web
    ↓
Sincronización automática
```

## Módulos Principales

### 1. **Autenticación** (`/modules/auth`)
- Login/Registro
- JWT tokens
- Refresh tokens
- Password recovery

### 2. **Tareas** (`/modules/tasks`)
- CRUD de tareas
- Prioridades
- Subtareas
- Búsqueda y filtrado

### 3. **Notas** (`/modules/notes`)
- Crear/editar/eliminar
- Búsqueda
- Etiquetas

### 4. **Proyectos** (`/modules/projects`)
- Tableros Kanban
- Columnas personalizables
- Tarjetas con propiedades

### 5. **Calendario** (`/modules/calendar`)
- Sincronización con tareas
- Eventos recurrentes

### 6. **Dashboard** (`/modules/dashboard`)
- Resumen y estadísticas

## Estructura de Carpetas

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controller.ts
│   │   │   ├── service.ts
│   │   │   ├── routes.ts
│   │   │   └── schema.ts
│   │   ├── tasks/
│   │   ├── notes/
│   │   ├── projects/
│   │   ├── calendar/
│   │   └── dashboard/
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validators.ts
│   └── index.ts
├── dist/
├── package.json
└── tsconfig.json
```

## Flujo de Datos

```
Frontend (React)
    ↓
Axios API Call
    ↓
Express Router
    ↓
Controller (Validación)
    ↓
Service (Lógica)
    ↓
Database (PostgreSQL/SQLite)
    ↓
Response JSON
```

## Real-time con Socket.io

```
Cliente A
    ↓ emite evento
    ↓
Socket.io Server
    ↓ broadcast
    ↓
Cliente B, C, D reciben actualización
```

## Base de Datos

### Tablas principales

- `users`
- `tasks`
- `notes`
- `projects`
- `project_columns` (para Kanban)
- `project_cards` (para Kanban)
- `calendar_events`

## Seguridad

- 🔐 JWT para autenticación
- 🔒 Bcrypt para contraseñas
- ✅ CORS configurado
- 🛡️ Validación de entrada
- 🚫 Rate limiting (implementar)

## MVP Phase

**Semana 1-2:**
- ✅ Backend setup
- ✅ Autenticación
- ✅ CRUD Tareas
- ✅ CRUD Notas
- ✅ Kanban básico
- ✅ Frontend básico

**Semana 3-4:**
- Calendario
- Sincronización en nube
- Dashboard
- Notificaciones

## Deployment

- **Backend**: Heroku / Railway / DigitalOcean
- **Frontend**: Vercel / Netlify
- **Mobile**: App Store / Google Play
- **DB**: Cloud PostgreSQL

---

*Documento actualizado: Feb 2026*
