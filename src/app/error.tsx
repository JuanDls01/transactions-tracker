'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Application error:', error);
    }
  }, [error]);

  // Check if it's a connection error
  const isConnectionError = error.name === 'ConnectionError' || 
    error.message.includes('Database is temporarily unavailable');

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          {isConnectionError ? (
            <WifiOff className='mx-auto h-12 w-12 text-destructive mb-4' />
          ) : (
            <AlertCircle className='mx-auto h-12 w-12 text-destructive mb-4' />
          )}
          <CardTitle className='text-xl'>
            {isConnectionError ? 'Conexión perdida' : 'Algo salió mal'}
          </CardTitle>
          <CardDescription>
            {isConnectionError 
              ? 'No se puede conectar a la base de datos en este momento.'
              : 'Ha ocurrido un error inesperado en la aplicación.'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className='space-y-4'>
          <Alert>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription className='text-sm'>
              {isConnectionError 
                ? 'Por favor, verifica tu conexión a internet e inténtalo nuevamente.'
                : 'Nuestro equipo ha sido notificado del problema.'
              }
            </AlertDescription>
          </Alert>

          <div className='flex flex-col gap-2'>
            <Button onClick={reset} className='w-full'>
              <RefreshCw className='mr-2 h-4 w-4' />
              Intentar nuevamente
            </Button>
            
            {isConnectionError && (
              <Button 
                variant='outline' 
                onClick={() => window.location.reload()} 
                className='w-full'
              >
                <Wifi className='mr-2 h-4 w-4' />
                Recargar página
              </Button>
            )}
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className='mt-4'>
              <summary className='text-sm text-muted-foreground cursor-pointer'>
                Detalles técnicos (desarrollo)
              </summary>
              <pre className='mt-2 text-xs bg-muted p-2 rounded overflow-auto'>
                {error.message}
                {error.stack && `\n${error.stack}`}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}