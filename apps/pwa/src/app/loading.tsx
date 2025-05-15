import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Image src='/web-app-manifest-512x512.png' alt='Loading' width={100} height={100} />
      <p className='mt-4 text-muted-foreground'>Cargando TuChanchito...</p>
    </div>
  );
};

export default Loading;
