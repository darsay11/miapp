// Rutas de autenticación con Google
import { Router } from 'express';
import passport from 'passport';
import jwt, { SignOptions } from 'jsonwebtoken';

const router = Router();

// Función para generar JWT
function generateJWT(user: any) {
  const payload = {
    id: user.id,
    email: user.emails?.[0]?.value || '',
    displayName: user.displayName || '',
    photo: user.photos?.[0]?.value || '',
    googleId: user.id
  };
  
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  const secret = process.env.JWT_SECRET || 'your_super_secret_jwt_key';
  
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
}

// Iniciar autenticación con Google
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Callback de Google
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/login?error=auth_failed',
    session: false 
  }),
  (req, res) => {
    try {
      const user = req.user as any;
      
      // Generar JWT token
      const token = generateJWT(user);
      
      // Preparar datos del usuario para enviar al frontend
      const userData = {
        id: user.id,
        email: user.emails?.[0]?.value || '',
        displayName: user.displayName || '',
        photo: user.photos?.[0]?.value || '',
        googleId: user.id
      };
      
      // Redirigir al frontend con el token y datos del usuario
      const callbackUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
      
      console.log('✅ OAuth callback exitoso para:', user.displayName);
      console.log('📍 Redirigiendo a:', callbackUrl);
      
      res.redirect(callbackUrl);
    } catch (error) {
      console.error('❌ Error en OAuth callback:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login?error=callback_error`);
    }
  }
);

// Login tradicional (email/password)
router.post('/login', (req, res) => {
  res.json({ message: 'POST /auth/login - En desarrollo' });
});

// Registro tradicional
router.post('/register', (req, res) => {
  res.json({ message: 'POST /auth/register - En desarrollo' });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'POST /auth/logout - En desarrollo' });
});

// Refresh token
router.post('/refresh', (req, res) => {
  res.json({ message: 'POST /auth/refresh - En desarrollo' });
});

// Obtener usuario actual
router.get('/me', (req, res) => {
  res.json({ message: 'GET /auth/me - En desarrollo' });
});

export default router;
