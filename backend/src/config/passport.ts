// Configuración de Google OAuth
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Store de usuarios en memoria (después será BD)
const users = new Map<string, any>();

export function configureGoogleAuth() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Crear o actualizar usuario
          const user = {
            id: profile.id,
            email: profile.emails?.[0]?.value || '',
            displayName: profile.displayName || '',
            photo: profile.photos?.[0]?.value || '',
            googleId: profile.id,
          };
          
          // Guardar en memoria
          users.set(profile.id, user);
          
          console.log('✅ Usuario autenticado con Google:', user.email);
          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    // Buscar en memory store
    const user = users.get(id);
    done(null, user || { id });
  });
}
