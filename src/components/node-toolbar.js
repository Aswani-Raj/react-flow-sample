import React, { useState } from 'react';
import { NodeToolbar, Handle, NodeResizer } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function NodeWithToolbar(props) {
  const [showToolbar, setShowToolbar] = useState(false);

  const updateNode = () => {
    if (props.onUpdateNode) {
      props.onUpdateNode(props.id, props.data);
    }
  };

  // Get the original node type for styling
  const nodeType = props.data?.nodeType || props.data?.originalType || 'default';
  
  // Define styles based on node type
  const getNodeStyle = () => {
    const baseStyle = {
      padding: '10px',
      fontSize: '12px',
      color: 'white',
      textAlign: 'center',
      border: props.selected ? '2px solid #ff0066' : '1px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    };

    switch (nodeType) {
      case 'circle':
        return { 
          ...baseStyle, 
          width: '80px',
          height: '80px',
          borderRadius: '50%',
        //   backgroundColor: '#ff6b6b',
          border: props.selected ? '2px solid #ff5252' : '1px solid #ff5252'
        };
      case 'diamond':
        return { 
          ...baseStyle, 
          width: '80px',
          height: '80px',
        //   backgroundColor: '#4ecdc4',
          border: props.selected ? '2px solid #45b7aa' : '1px solid #45b7aa',
          transform: 'rotate(45deg)'
        };
      case 'rectangle':
        return { 
          ...baseStyle, 
          width: '120px',
          height: '60px',
          borderRadius: '8px',
        //   backgroundColor: '#95a5a6',
          border: props.selected ? '2px solid #7f8c8d' : '1px solid #7f8c8d'
        };
      default:
        return { 
          ...baseStyle, 
          width: '150px',
          height: '60px',
          borderRadius: '8px',
        //   backgroundColor: '#ff0072' 
        };
    }
  };

  // Handle rotation for diamond nodes
  const getHandleStyle = (position) => {
    const baseStyle = { background: '#555' };
    if (nodeType === 'diamond' && position === 'top') {
      return { ...baseStyle, transform: 'rotate(-45deg)' };
    }
    if (nodeType === 'diamond' && position === 'bottom') {
      return { ...baseStyle, transform: 'rotate(-45deg)' };
    }
    return baseStyle;
  };

  // Handle label rotation for diamond nodes
  const getLabelStyle = () => {
    if (nodeType === 'diamond') {
      return { transform: 'rotate(-45deg)' };
    }
    return {};
  };

  return (
    <div
      style={getNodeStyle()}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
  {/* <NodeResizer
        color="#ff0071"
        isVisible={props.selected}
        minWidth={100}
        minHeight={30}
      /> */}
      <Handle
        type="target"
        position="top"
        style={getHandleStyle('top')}
      />
      
      <div style={getLabelStyle()}>
        {props.data?.label}
      </div>
      
      <Handle
        type="source"
        position="bottom"
        style={getHandleStyle('bottom')}
      />
      
      <NodeToolbar
        isVisible={showToolbar || props.selected}
        position="top"
        offset={10}
      >
        <button
          onClick={updateNode}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            margin: '2px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Update Node
        </button>
        <button
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            margin: '2px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
        <button
          style={{
            background: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            margin: '2px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Paste
        </button>
      </NodeToolbar>
    </div>
  );
}

export default NodeWithToolbar;