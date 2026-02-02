# 🚀 Guía Rápida - Primeros Pasos

## Requisitos Previos

- Node.js v18+ 
- npm o yarn
- PostgreSQL (opcional para fase local)
- Git

## 1️⃣ Clonar y Setup Inicial

```bash
cd miapp
npm install
```

## 2️⃣ Backend - Primeros Pasos

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Verificar**: http://localhost:5000/api/health

## 3️⃣ Frontend - Primeros Pasos

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**Abrir**: http://localhost:3000

## 4️⃣ Variables de Entorno

### Backend (.env)

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_NAME=miapp_db
JWT_SECRET=cambiar_en_produccion
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5001
```

## ✅ Checklist de Setup

- [ ] Node.js instalado (`node --version`)
- [ ] Backend ejecutándose en puerto 5000
- [ ] Frontend ejecutándose en puerto 3000
- [ ] Health check del backend respondiendo
- [ ] Tailwind CSS cargando en frontend

## 📝 Próximos Pasos

1. **Crear tabla de usuarios** en base de datos
2. **Implementar autenticación** (JWT)
3. **Crear CRUD de tareas**
4. **Crear componentes React** para tareas
5. **Conectar frontend con backend**

## 🐛 Troubleshooting

### Puerto ya en uso

```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Módulos no encontrados

```bash
npm install
npm ci  # Clean install
```

### CORS error

Revisar `CORS_ORIGIN` en `.env` del backend

---

**¡Listo! Tu proyecto está en marcha 🎉**
