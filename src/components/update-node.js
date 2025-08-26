import React, { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';

const UpdateNode = (props) => {
    const [nodeHidden, setNodeHidden] = useState(false);
    const [nodeName, setNodeName] = useState('');
    const [nodeBg, setNodeBg] = useState('#dbdbdb');

  useEffect(() => {
    props.setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.selectedNode.id) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeName,
            },
          };
        }

        return node;
      }),
    );
    
  }, [nodeName, props.setNodes]);

  useEffect(() => {
    props.setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.selectedNode.id) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: nodeBg,
            },
          };
        }

        return node;
      }),
    );
  }, [nodeBg]);

  useEffect(() => {
    props.setNodes((nds) =>
      nds.map((node) => {
        if (node.id === props.selectedNode.id) {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            hidden: nodeHidden,
          };
        }

        return node;
      }),
    );
    props.setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          return {
            ...edge,
            hidden: nodeHidden,
          };
        }

        return edge;
      }),
    );
  }, [nodeHidden]);

  return (
        <><label className="xy-theme__label">Label: </label><input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
          className="xy-theme__input" /><label className="xy-theme__label">Background: </label><input
            value={nodeBg}
              onChange={(evt) => setNodeBg(evt.target.value)}
              className="xy-theme__input" /><label className="xy-theme__label">Hidden:</label><input
              type="checkbox"
              checked={nodeHidden}
              onChange={(evt) => setNodeHidden(evt.target.checked)}
              className="xy-theme__checkbox" /></>
      
  );
};

export default UpdateNode;
