const ConnectorProperties = (props)=>{
    console.log("selected Edge", props.selectedEdge);
        
    return (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
              Edge ID: {props.selectedEdge.id}
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
              Label:
            </label>
            <input
              type="text"
              value={props.selectedEdge.label || ''}
              onChange={(e) => {
                props.setSelectedEdge(prev => ({ ...prev, label: e.target.value }));
                props.setEdges(edges => 
                  edges.map(edge => 
                    edge.id === props.selectedEdge.id 
                      ? { ...edge, label: e.target.value }
                      : edge
                  )
                );
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              placeholder="Enter edge label..."
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
              Line Style:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['solid', 'dashed', 'dotted', 'dash-dot', 'long-dash'].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    props.setEdges(edges => 
                      edges.map(edge => 
                        edge.id === props.selectedEdge.id 
                          ? { ...edge, data: { ...edge.data, lineType: style } }
                          : edge
                      )
                    );
                  }}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    background: props.selectedEdge.data?.lineType === style ? '#007bff' : 'white',
                    color: props.selectedEdge.data?.lineType === style ? 'white' : '#495057',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
              Edge Color:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['#b1b1b7', '#007bff', '#28a745', '#ffc107', '#dc3545'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    props.setEdges(edges => 
                      edges.map(edge => 
                        edge.id === props.selectedEdge.id 
                          ? { ...edge, data: { ...edge.data, edgeColor: color } }
                          : edge
                      )
                    );
                  }}
                  style={{
                    width: '30px',
                    height: '30px',
                    border: props.selectedEdge.data?.edgeColor === color ? '3px solid #007bff' : '1px solid #ced4da',
                    borderRadius: '4px',
                    background: color,
                    cursor: 'pointer'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              props.setEdges(edges => edges.filter(edge => edge.id !== props.selectedEdge.id));
            //   setShowEdgePanel(false);
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Delete Edge
          </button>
        
        </>
    )
}
export default ConnectorProperties