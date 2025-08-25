import React, { useEffect, useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, MarkerType } from '@xyflow/react';

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
  selected,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label || '');
  const [showToolbar, setShowToolbar] = useState(false);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  useEffect(()=>{
 console.log('CustomEdge props:', { markerEnd, style });
  },[])


  const handleDoubleClick = () => {
    console.log("double clicked");
    setIsEditing(true);
    setEditLabel(label || '');
  };

  const handleLabelChange = (e) => {
    setEditLabel(e.target.value);
  };

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLabelSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditLabel(label || '');
    }
  };

  const handleAddLabel = () => {
    console.log("inside add label");
    console.log("setEdges available:", !!setEdges);
    setIsEditing(true);
    setEditLabel('');
  };

  const handleDeleteEdge = () => {
    console.log("Deleting edge:", id);
    if (setEdges) {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    } else {
      console.error("setEdges function is not available");
    }
  };

  return (
    <>
      <BaseEdge 
        id={id} 
        path={edgePath} 
        onMouseEnter={() => setShowToolbar(true)}
        onMouseLeave={() => setShowToolbar(false)} 
        markerEnd={markerEnd || { type: MarkerType.ArrowClosed }}  // Fallback if prop is missing
  style={style || { strokeWidth: 1, stroke: '#b1b1b7' }} 
      />
            {(showToolbar || selected) && (
        <EdgeLabelRenderer>
          
            {!label ? (
              <button
                onClick={handleAddLabel}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
                title="Add Label"
              >
                + Label
              </button>
            ) : (
              <button
                onClick={handleDoubleClick}
                style={{
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
                title="Edit Label"
              >
                ✏️ Edit
              </button>
            )}
            
           
        </EdgeLabelRenderer>
      )}
      
      <EdgeLabelRenderer>
        {isEditing ? (
          <input
            type="text"
            value={editLabel}
            onChange={handleLabelChange}
            onBlur={handleLabelSubmit}
            onKeyPress={handleKeyPress}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              border: '1px solid #007bff',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              minWidth: '80px',
              backgroundColor: 'white',
              zIndex: 1001,
            }}
            className="nodrag nopan"
            autoFocus
            placeholder="Enter label..."
          />
        ) : (
          label && (
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: 'all',
                backgroundColor: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '12px',
                minWidth: '60px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              className="nodrag nopan"
            >
              {label}
            </div>
          )
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;