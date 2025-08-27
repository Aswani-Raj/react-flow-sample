import React, { useState, useEffect } from 'react';
import { Panel } from '@xyflow/react';

const UpdateNode = ({ selectedNode, onClose, setNodes, closeNodePanel }) => {
  const [label, setLabel] = useState('');
  const [nodeType, setNodeType] = useState(''); // Add this for dropdown
  const [nodeStatus, setNodeStatus] = useState(''); // Add this for status dropdown

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data?.label || '');
      setNodeType(selectedNode.data?.nodeType || ''); // Restore saved nodeType
      setNodeStatus(selectedNode.data?.nodeStatus || ''); // Restore saved status
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode && setNodes) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: label,
                  nodeType: nodeType,
                  nodeStatus: nodeStatus,
                },
              }
            : node
        )
      );
      closeNodePanel(false)
    }
  };

  if (!selectedNode) return null;

  return (
    <Panel position="right" style={{ width: '300px', background: 'white', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Update Node: {selectedNode.id}</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Label:
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Node Type Dropdown */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Node Type:
        </label>
        <select
          value={nodeType}
          onChange={(e) => setNodeType(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="">Select Node Type</option>
          <option value="process">Process</option>
          <option value="decision">Decision</option>
          <option value="start">Start</option>
          <option value="end">End</option>
          <option value="subprocess">Subprocess</option>
        </select>
      </div>

      {/* Node Status Dropdown */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Status:
        </label>
        <select
          value={nodeStatus}
          onChange={(e) => setNodeStatus(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleSave}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save
        </button>
        <button
          onClick={() => closeNodePanel(false)}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </Panel>
  );
};

export default UpdateNode;