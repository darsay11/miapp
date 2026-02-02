# 📱 MiEspacio - App de Productividad y Gestión de Proyectos

Una aplicación multiplataforma (escritorio, web y móvil) para organizar tareas, notas, proyectos y cronogramas de forma visual e intuitiva.

## 🚀 Stack Técnico

- **Backend**: Node.js + Express + TypeScript
- **Frontend Web**: React + TypeScript + Vite
- **Mobile**: React Native
- **Base de Datos**: PostgreSQL + SQLite (local)
- **Autenticación**: JWT
- **Real-time**: Socket.io

## 📁 Estructura del Proyecto

```
miapp/
├── backend/              # API REST + WebSocket
│   ├── src/
│   │   ├── modules/      # Módulos (tasks, notes, projects, etc)
│   │   ├── config/       # Configuración
│   │   ├── middleware/   # Autenticación, validación
│   │   └── utils/        # Utilidades
│   ├── package.json
│   └── .env.example
├── frontend/             # React Web App
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas
│   │   ├── services/     # API calls
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Estado global
│   │   └── styles/       # CSS/Tailwind
│   └── package.json
├── mobile/               # React Native App
│   └── package.json
└── docs/                 # Documentación
```

## 📋 Módulos Principales

### 1. **Gestión de Tareas**
- CRUD de tareas
- Prioridades (alta, media, baja)
- Fechas límite
- Estados (pendiente, en progreso, completada)
- Subtareas

### 2. **Notas**
- Notas rápidas
- Búsqueda y filtrado
- Etiquetas (tags)
- Texto enriquecido

### 3. **Proyectos (Kanban)**
- Tableros visuales
- Columnas personalizables
- Tarjetas con drag & drop
- Descripción, checklist, archivos

### 4. **Calendario**
- Vistas diaria, semanal, mensual
- Integración de tareas
- Eventos recurrentes

### 5. **Dashboard**
- Resumen del día
- Tareas pendientes
- Progreso de proyectos

## 🛠️ Instalación y Setup

### 1. Configurar Google OAuth (Requerido)

Para habilitar login con Google, sigue la guía completa:  
👉 **[docs/GOOGLE_AUTH_SETUP.md](docs/GOOGLE_AUTH_SETUP.md)**

Resumen rápido:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea OAuth credentials
3. Copia Client ID y Client Secret
4. Pega en `backend/.env`

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de Google
npm run dev
```

**Verificar**: http://localhost:5000/api/health

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

**Abrir**: http://localhost:3001

### 4. Probar Login con Google

1. Abre http://localhost:3001
2. Haz clic en "Continuar con Google"
3. Autoriza la aplicación
4. ¡Listo! Estarás en el dashboard

### Mobile

```bash
cd mobile
npm install
npm run start
```

## 🔄 Sincronización en la Nube (Fase 2)

- Login de usuario
- Sincronización entre dispositivos
- Backup automático

## 👥 Modo Equipo (Fase 3)

- Compartir proyectos
- Asignar tareas
- Comentarios y historial

## 📊 MVP vs Features Completos

### MVP v1 (Semana 1-2)
- ✅ Gestión de tareas
- ✅ Notas
- ✅ Tablero Kanban básico
- ✅ Guardado local

### v2 (Semana 3-4)
- Calendario
- Sincronización en nube
- Dashboard

### v3+ (Futuro)
- IA Assistant
- Modo equipo
- Pomodoro
- Estadísticas

## 📝 Variables de Entorno

Ver `.env.example` en cada carpeta.

---

**Hecho con ❤️ para aumentar tu productividad**
