import { Handle } from "@xyflow/react";

const RectangleNode = ({ data }) => (
  <div
    style={{
      width: '80px',
      height: '35px',
      // backgroundColor: '#95a5a6',
      border: '2px solid #7f8c8d',
      borderRadius: '8px',
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
    {data.label}
    <Handle
      type="source"
      position="bottom"
      style={{ background: '#555' }}
    />
  </div>
);

export default RectangleNode