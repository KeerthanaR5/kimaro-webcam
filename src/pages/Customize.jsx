import React from 'react';
import CameraConfigurator from '../components/CameraConfigurator';

export default function Customize() {
  return (
    <main className="w-full">
      <CameraConfigurator isFullPage={true} />
    </main>
  );
}
