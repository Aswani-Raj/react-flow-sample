import React from 'react';
import { useReactFlow } from '@xyflow/react';

const ZoomSlider = ({ position = 'top-left' }) => {
  const { zoomIn, zoomOut, setViewport, getViewport } = useReactFlow();

  const handleZoomChange = (event) => {
    const zoom = parseFloat(event.target.value);
    const viewport = getViewport();
    setViewport({ ...viewport, zoom });
  };

  const currentZoom = getViewport().zoom;

  return (
    <div
      style={{
        position: 'absolute',
        top: position.includes('top') ? '10px' : 'auto',
        bottom: position.includes('bottom') ? '10px' : 'auto',
        left: position.includes('left') ? '10px' : 'auto',
        right: position.includes('right') ? '10px' : 'auto',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <button onClick={() => zoomIn()} style={{ marginRight: '5px' }}>+</button>
        <button onClick={() => zoomOut()}>-</button>
      </div>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={currentZoom}
        onChange={handleZoomChange}
        style={{ width: '100px' }}
      />
      <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '5px' }}>
        {Math.round(currentZoom * 100)}%
      </div>
    </div>
  );
};

export default ZoomSlider;