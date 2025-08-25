import { Handle } from "@xyflow/react";

const DiamondNode = ({ data }) => (
  <div
    style={{
      width: '80px',
      height: '80px',
      // backgroundColor: '#4ecdc4',
      border: '2px solid #45b7aa',
      transform: 'rotate(45deg)',
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
      style={{ background: '#555', transform: 'rotate(-45deg)' }}
    />
    <div style={{ transform: 'rotate(-45deg)' }}>{data.label}</div>
    <Handle
      type="source"
      position="bottom"
      style={{ background: '#555', transform: 'rotate(-45deg)' }}
    />
  </div>
);

export default DiamondNode