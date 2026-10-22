import React from 'react';
import GalleryPreview from '../components/GalleryPreview';

export default function Gallery() {
  return (
    <main className="w-full">
      <GalleryPreview isFullPage={true} />
    </main>
  );
}
