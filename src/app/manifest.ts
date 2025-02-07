import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tu Chanchito PWA',
    short_name: 'TuChanchito',
    description:
      'Progressive Web App que te permite registrar, visualizar y gestionar tus gastos e ingresos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2D3748',
    theme_color: '#000000',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
