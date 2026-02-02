import { useEffect, useState } from 'react';
import authService from '../services/auth';

export default function AuthCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Autenticando...');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userStr = params.get('user');
        const error = params.get('error');

        console.log('🔐 Callback recibido:');
        console.log('Token:', token?.substring(0, 20) + '...');
        console.log('User:', userStr);
        console.log('Error:', error);

        // Verificar si hay error en los parámetros
        if (error) {
          console.error('❌ Error en OAuth:', error);
          setStatus('error');
          setMessage(`Error de autenticación: ${error}`);
          setTimeout(() => {
            window.location.href = '/login?error=' + error;
          }, 3000);
          return;
        }

        // Verificar que tenemos los parámetros necesarios
        if (!token) {
          console.error('❌ No token en callback');
          setStatus('error');
          setMessage('No se recibió token de autenticación');
          setTimeout(() => {
            window.location.href = '/login?error=no_token';
          }, 3000);
          return;
        }

        if (!userStr) {
          console.error('❌ No user data en callback');
          setStatus('error');
          setMessage('No se recibieron datos del usuario');
          setTimeout(() => {
            window.location.href = '/login?error=no_user';
          }, 3000);
          return;
        }

        // Parsear datos del usuario
        let user;
        try {
          user = JSON.parse(decodeURIComponent(userStr));
          console.log('✅ Usuario parseado:', user);
        } catch (parseError) {
          console.error('❌ Error al parsear usuario:', parseError);
          setStatus('error');
          setMessage('Error al procesar datos del usuario');
          setTimeout(() => {
            window.location.href = '/login?error=parse_error';
          }, 3000);
          return;
        }

        // Guardar sesión
        console.log('💾 Guardando sesión para:', user.displayName);
        authService.saveSession(token, user);

        // Verificar que se guardó correctamente
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (!savedToken || !savedUser) {
          console.error('❌ Error al guardar en localStorage');
          setStatus('error');
          setMessage('Error al guardar sesión');
          setTimeout(() => {
            window.location.href = '/login?error=storage_error';
          }, 3000);
          return;
        }

        console.log('✅ Sesión guardada correctamente');
        setStatus('success');
        setMessage('Autenticación exitosa ✓');

        // Dar tiempo para que el usuario vea el mensaje y luego redirigir
        setTimeout(() => {
          console.log('🚀 Redirigiendo al dashboard...');
          window.location.href = '/';
        }, 1500);

      } catch (error) {
        console.error('❌ Error inesperado en callback:', error);
        setStatus('error');
        setMessage('Error inesperado durante la autenticación');
        setTimeout(() => {
          window.location.href = '/login?error=unexpected';
        }, 3000);
      }
    };

    processCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-800">Autenticando...</h2>
            <p className="text-gray-600 mt-2">Cargando tu dashboard</p>
            <p className="text-sm text-gray-500 mt-4">Abre la consola (F12) para ver detalles</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold text-green-600">¡Bienvenido!</h2>
            <p className="text-gray-600 mt-2">Redirigiendo al dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold text-red-600">Error de autenticación</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Redirigiendo a login en 3 segundos...</p>
          </>
        )}
      </div>
    </div>
  );
}

