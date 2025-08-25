import { Handle } from "@xyflow/react";

const CircleNode = ({ data }) => {
  return (
    <div
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        // backgroundColor: '#ff6b6b',
        border: '2px solid #ff5252',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px',
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
      />
      <div style={{ 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: '11px',
        textAlign: 'center',
        wordWrap: 'break-word',
        maxWidth: '100%',
        overflow: 'hidden',
      }}>
        {data.label || 'Decision'}
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CircleNode