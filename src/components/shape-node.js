import React, { useState } from 'react';
import { Handle, NodeToolbar } from '@xyflow/react';

const ShapeNode = ({ id,data, selected, setEdges, setNodes, onUpdateNode }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const { type = 'rectangle', color = '#7f8c8d' } = data;

  const handleUpdateNode = () => {    
    if (onUpdateNode) {
      onUpdateNode(id, data);
    }
  };

  const renderShape = () => {
    const baseStyle = {
      width: '120px',
      height: '60px',
      backgroundColor: 'white',
      border: `1px solid black`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
      fontWeight: 'bold',
      fontSize: '12px',
      textAlign: 'center',
      position: 'relative',
    };

    switch (type) {
      case 'round-rectangle':
        return {
          ...baseStyle,
          borderRadius: '30px', // Rounded corners
        };
      case 'rectangle':
        return {
          ...baseStyle,
          borderRadius: '8px', // Slightly rounded corners
        };
      case 'circle':
        return {
          ...baseStyle,
          width: '80px',
          height: '80px',
          borderRadius: '50%', // Perfect circle
        };
      case 'diamond':
        return {
          ...baseStyle,
          width: '80px',
          height: '80px',
          transform: 'rotate(45deg)', // Rotate to create diamond
        };
      default:
        return baseStyle;
    }
  };

  const shapeStyle = renderShape();

  return (
    <div 
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      <div style={shapeStyle}>
        <div 
          style={{
            transform: type === 'diamond' ? 'rotate(-45deg)' : 'none',
            wordWrap: 'break-word',
            maxWidth: '100%',
            overflow: 'hidden',
            padding: '4px',
          }}
        >
          {data.label || ''}
        </div>
      </div>
      
      {/* Node Toolbar */}
      {(showToolbar || selected) && (
        <NodeToolbar
          isVisible={true}
          position="top"
          style={{
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          <button
            onClick={handleUpdateNode}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
              marginRight: '4px',
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              if (setNodes) {
                setNodes((nodes) => nodes.filter((node) => node.id !== data.id));
              }
            }}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </NodeToolbar>
      )}

      {/* Connection handles - positioned relative to the shape */}
      <Handle
        type="target"
        position="top"
        style={{ 
          background: "black",
          top: type === 'diamond' ? '-20px' : '-1px',
          left: type === 'circle' ? '50%' : '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <Handle
        type="source"
        position="bottom"
        style={{ 
          background: "black",
          bottom: type === 'diamond' ? '-20px' : '-1px',
          left: type === 'circle' ? '50%' : '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default ShapeNode;