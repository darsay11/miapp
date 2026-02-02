# 🔐 Configurar Google OAuth 2.0

## Paso 1: Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre del proyecto: **MiApp**

## Paso 2: Habilitar Google+ API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google+ API"
3. Haz clic en **Enable**

## Paso 3: Crear Credenciales OAuth

1. Ve a **APIs & Services** > **Credentials**
2. Clic en **Create Credentials** > **OAuth client ID**
3. Si es primera vez, configura la pantalla de consentimiento:
   - **User Type**: External
   - **App name**: MiApp
   - **User support email**: tu email
   - **Developer contact**: tu email
   - Guarda y continúa

4. **Application type**: Web application
5. **Name**: MiApp OAuth Client
6. **Authorized JavaScript origins**:
   ```
   http://localhost:3001
   http://localhost:5000
   ```
7. **Authorized redirect URIs**:
   ```
   http://localhost:5000/api/auth/google/callback
   ```
8. Clic en **Create**

## Paso 4: Copiar Credenciales

Verás dos valores importantes:
- **Client ID**: `123456789-abcdefgh.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abcdefghijklmnop`

## Paso 5: Configurar Backend

Crea el archivo `backend/.env` (basado en `.env.example`):

```bash
# Google OAuth
GOOGLE_CLIENT_ID=TU_CLIENT_ID_AQUI
GOOGLE_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend
FRONTEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001

# Session
SESSION_SECRET=miapp_session_secret_change_me
```

## Paso 6: Instalar Dependencias

```bash
cd backend
npm install passport passport-google-oauth20 express-session
npm install --save-dev @types/passport @types/passport-google-oauth20 @types/express-session
```

## Paso 7: Reiniciar Backend

```bash
cd backend
npm run dev
```

## Paso 8: Probar Login

1. Ve a http://localhost:3001
2. Verás la página de login
3. Haz clic en "Continuar con Google"
4. Selecciona tu cuenta de Google
5. Autoriza la aplicación
6. Serás redirigido al dashboard

## 🎉 ¡Listo!

Ahora los usuarios pueden iniciar sesión con Google OAuth 2.0.

## 🔒 Producción

Para producción, actualiza las URIs:

```
Authorized JavaScript origins:
https://tudominio.com

Authorized redirect URIs:
https://tudominio.com/api/auth/google/callback
```

---

**Documentación oficial**: https://developers.google.com/identity/protocols/oauth2
