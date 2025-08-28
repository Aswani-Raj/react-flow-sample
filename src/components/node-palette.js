const NodePalette = () => {
  return (
    <div style={{ width: '115px', backgroundColor: '#f8f9fa', padding: '20px', borderRight: '1px solid #dee2e6' }}>
      <h3 style={{ marginBottom: '20px', color: '#495057' }}>Node Palette</h3>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '10px', color: '#6c757d' }}>Shapes</h4>
        
        {/* Round Rectangle */}
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', 'shape');
            event.dataTransfer.setData('application/reactflow-shape', 'round-rectangle');
            event.dataTransfer.setData('application/reactflow-label', 'Round Rectangle');
            event.dataTransfer.setData('application/reactflow-color', '#7f8c8d');
          }}
          style={{
            width: '50px',
            height: '30px',
            border: '2px solid black',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '10px',
            cursor: 'grab',
          }}
        >
          
        </div>

        {/* Rectangle */}
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', 'shape');
            event.dataTransfer.setData('application/reactflow-shape', 'rectangle');
            event.dataTransfer.setData('application/reactflow-label', 'Rectangle');
            event.dataTransfer.setData('application/reactflow-color', '#7f8c8d');
          }}
          style={{
            width: '50px',
            height: '30px',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '10px',
            cursor: 'grab',
          }}
        >
          
        </div>

        {/* Circle */}
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', 'shape');
            event.dataTransfer.setData('application/reactflow-shape', 'circle');
            event.dataTransfer.setData('application/reactflow-label', 'Circle');
            event.dataTransfer.setData('application/reactflow-color', '#ff5252');
          }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '10px',
            cursor: 'grab',
          }}
        >
          
        </div>

        {/* Diamond */}
        <div
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', 'shape');
            event.dataTransfer.setData('application/reactflow-shape', 'diamond');
            event.dataTransfer.setData('application/reactflow-label', 'Diamond');
            event.dataTransfer.setData('application/reactflow-color', '#45b7aa');
          }}
          style={{
            width: '40px',
            height: '40px',
            border: '2px solid black',
            transform: 'rotate(45deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            marginBottom: '10px',
            cursor: 'grab',
            marginTop: "20px"
          }}
        >
          <div style={{ transform: 'rotate(-45deg)' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NodePalette;