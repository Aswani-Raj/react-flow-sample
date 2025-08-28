import React, { useEffect, useState } from 'react';
import { Handle, NodeResizer, NodeToolbar } from '@xyflow/react';

const ShapeNode = ({ id,data, selected, setEdges, setNodes, onUpdateNode,clickNode }) => {
  const [showToolbar, setShowToolbar] = useState(false);
 const getDefaultDimensions = (shapeType) => {
    switch (shapeType) {
      case 'circle':
        return { width: 40, height: 40 };
      case 'diamond':
        return { width: 40, height: 40 };
      case 'rectangle':
        return { width: 60, height: 30 };
      case 'round-rectangle':
        return { width: 60, height: 30 };
      default:
        return { width: 120, height: 60 };
    }
  };

  const [dimensions, setDimensions] = useState(() => {
    if (data.width && data.height) {
      return { width: data.width, height: data.height };
    }
    return getDefaultDimensions(data.type || 'rectangle');
  });

  const { type = 'rectangle', color = '#7f8c8d' } = data;  
  const backgroundColor = data.backgroundColor || 'white';

  useEffect(() => {
    if (data.width && data.height) {
      setDimensions({ width: data.width, height: data.height });
    }
  }, [data.width, data.height]);

  const handleUpdateNode = () => {    
    if (onUpdateNode) {
      onUpdateNode(id, data);
    }
  };
   const handleResize = (event, params) => {
    setDimensions({
      width: params.width,
      height: params.height
    });
  };

  const handleResizeEnd = (event, params) => {
    const newDimensions = {
      width: params.width,
      height: params.height
    };
    
    setDimensions(newDimensions);
    
    if (setNodes) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  width: newDimensions.width,
                  height: newDimensions.height
                }
              }
            : node
        )
      );
    }
  };

  const renderShape = () => {
    const baseStyle = {
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      border: `1px solid black`,
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: "white",
      fontWeight: 'bold',
      fontSize: '12px',
      textAlign: 'center',
      position: 'relative',
    };
    switch (type) {
      case 'round-rectangle':
        return {
          ...baseStyle,
                // backgroundColor: backgroundColor,

          borderRadius: '30px', 
        };
      case 'rectangle':
        return {
          ...baseStyle,
          
        };
      case 'circle':
        return {
          ...baseStyle,
        //   width: '80px',
        //   height: '80px',
          borderRadius: '50%',
        };
      case 'diamond':
        return {
          ...baseStyle,
        //   width: '80px',
        //   height: '80px',
          transform: 'rotate(45deg)',
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
      onClick={() => clickNode(id,data)}
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

<NodeResizer
        color="blue"
        isVisible={selected}
        // minWidth={100}
        // minHeight={30}
        width={dimensions.width}
        height={dimensions.height} 
        onResize={handleResize}     
        onResizeEnd={handleResizeEnd} 
      />      
      <Handle
        type="target"
        position="top"
        style={{ 
        background: "grey",
        top: type === 'diamond' ? '-10px' : '-1px',
        left: type === 'circle' ? '50%' : '50%',
        transform: 'translateX(-50%)',
        minWidth: "0px",
        minHeight: "0px",
        width: "2px",
        height: "2px"
        }}
      />
      <Handle
        type="source"
        position="bottom"
        style={{ 
        background: "grey",
        bottom: type === 'diamond' ? '-10px' : '-1px',
        left: type === 'circle' ? '50%' : '50%',
        transform: 'translateX(-50%)',
        minWidth: "0px",
        minHeight: "0px",
        width: "2px",
        height: "2px"
        }}
      />
    </div>
  );
};

export default ShapeNode;