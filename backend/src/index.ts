import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';

// Importar configuración
import { configureGoogleAuth } from './config/passport';

// Importar rutas
import tasksRouter from './modules/tasks/routes';
import notesRouter from './modules/notes/routes';
import projectsRouter from './modules/projects/routes';
import authRouter from './modules/auth/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session para Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'miapp-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());
configureGoogleAuth();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running! 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas principales
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/notes', notesRouter);
app.use('/api/projects', projectsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: '🎉 MiApp Backend API v1.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      tasks: '/api/tasks',
      notes: '/api/notes',
      projects: '/api/projects'
    }
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🚀 MiApp Backend en ejecución       ║
║    URL: http://localhost:${PORT}          ║
║    Ambiente: ${process.env.NODE_ENV || 'development'}        ║
╚════════════════════════════════════════╝
  `);
});
