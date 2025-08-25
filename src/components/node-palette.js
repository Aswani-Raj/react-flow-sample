const NodePalette=()=>{
    return (
<div style={{ width: '200px', backgroundColor: '#f8f9fa', padding: '20px', borderRight: '1px solid #dee2e6' }}>
        <h3 style={{ marginBottom: '20px', color: '#495057' }}>Node Palette</h3>
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '10px', color: '#6c757d' }}>Shapes</h4>
                  {/* Rectangle */}
                    <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'rectangle');
              event.dataTransfer.setData('application/reactflow-label', 'Process');
            }}
            style={{
              width: '80px',
              height: '35px',
              border: '2px solid #7f8c8d',
              borderRadius: '8px',
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
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'circle');
              event.dataTransfer.setData('application/reactflow-label', 'Decision');
            }}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid #ff5252',
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
          <div
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', 'diamond');
              event.dataTransfer.setData('application/reactflow-label', 'Condition');
            }}
            style={{
              width: '60px',
              height: '60px',
              border: '2px solid #45b7aa',
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

        
      </div>    )
}

export default NodePalette