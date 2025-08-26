import React, { useEffect, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType, getSmoothStepPath } from '@xyflow/react';
import ConnectorProperties from './connector-properties';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  label,
  style = {},
  markerEnd,
  setEdges,
  selectedEdge,
  onEdgeClick
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label || '');
  const [showToolbar, setShowToolbar] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleLabelSubmit = () => {
    console.log("Submitting label:", editLabel, "for edge:", id);
    if (setEdges) {
      setEdges((edges) =>
        edges.map((edge) =>
          edge.id === id ? { ...edge, label: editLabel } : edge
        )
      );
    } else {
      console.error("setEdges function is not available");
    }
    setIsEditing(false);
  };

  const getLineStyle = () => {
    console.log("line style", data);
    
    const lineType = data?.lineType || 'solid';
    const edgeColor = data?.edgeColor || '#b1b1b7';
    
    const baseStyle = {
      strokeWidth: 2,
      stroke: edgeColor,
      ...style,
    };

    switch (lineType) {
      case 'dashed':
        return { ...baseStyle, strokeDasharray: '5,5' };
      case 'dotted':
        return { ...baseStyle, strokeDasharray: '2,2' };
      case 'dash-dot':
        return { ...baseStyle, strokeDasharray: '5,2,2,2' };
      case 'long-dash':
        return { ...baseStyle, strokeDasharray: '10,5' };
      default:
        return baseStyle;
    }    
  };

  const handleConnectorClick = (e)=>{    
    onEdgeClick(id,data, label)
  }
  console.log("styleee", getLineStyle());
  

  return (
    <>
      {/* <BaseEdge 
        id={id} 
        path={edgePath} 
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)} 
        markerEnd={markerEnd}
        style={getLineStyle()}
      /> */}

<svg
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  }}
  onClick={(e) => handleConnectorClick(e)}
>
  <defs>
    <marker
      id={`arrow-${id}`}
      markerWidth="10"
      markerHeight="10"
      refX="9"
      refY="3"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <polygon
        points="0,0 0,6 9,3"
        fill={getLineStyle().stroke}
      />
    </marker>
  </defs>
  
  <path
    d={edgePath}
    stroke={getLineStyle().stroke}
    strokeWidth={getLineStyle().strokeWidth}
    fill="none"
    markerEnd={`url(#arrow-${id})`}
    strokeDasharray={getLineStyle().strokeDasharray}  // ✅ This is the key fix
    style={{
      pointerEvents: 'all',
      cursor: 'pointer',
    }}
  />
</svg>

       <EdgeLabelRenderer>
        {selectedEdge.label && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              backgroundColor: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
            //   border: '1px solid #ccc',
              fontSize: '12px',
              minWidth: '60px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              zIndex: 1000,
            }}
            className="nodrag nopan"
            onClick={()=>onEdgeClick(id, data, label)}
            title="Double-click to edit"
          >
            {selectedEdge.label}
          </div>
        )}
        </EdgeLabelRenderer> 
    </>
  );
};

export default CustomEdge;