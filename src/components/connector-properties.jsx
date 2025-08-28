const ConnectorProperties = (props) => {    
    const updateEdgeData = (newData) => {
        
        if (props.selectedEdge?.id && props.setEdges) {
            props.setEdges(edges => {
                const currentEdge = edges.find(edge => edge.id === props.selectedEdge.id);
                const currentData = currentEdge?.data || {};
                
                const updatedEdges = edges.map(edge => 
                    edge.id === props.selectedEdge.id 
                        ? { 
                            ...edge, 
                            data: { ...currentData, ...newData } 
                        }
                        : edge
                );
                
                return updatedEdges;
            });
            
            props.setSelectedEdge(prev => ({
                ...prev,
                data: { ...prev.data, ...newData }
            }));
        } 
    };

    const edgeData = props.selectedEdge?.data || {};

    return (
        <div style={{
            width: '300px',
            backgroundColor: '#f8f9fa',
            borderLeft: '1px solid #dee2e6',
            padding: '20px',
            overflowY: 'auto'
        }}>
            
{/*             
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                    Edge ID: {props.selectedEdge?.id}
                </label>
            </div> */}

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                    Label:
                </label>
                <input
                    type="text"
                    value={props.selectedEdge?.label || ''}
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
                    {['solid', 'dashed', 'dotted'].map((style) => (
                        <button
                            key={style}
                            onClick={() => {
                                updateEdgeData({ lineType: style });
                            }}
                            style={{
                                padding: '6px 12px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                background: edgeData.lineType === style ? '#007bff' : 'white',
                                color: edgeData.lineType === style ? 'white' : '#495057',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            {/* <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                    Edge Color:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['#b1b1b7', '#007bff', '#28a745', '#ffc107', '#dc3545'].map((color) => (
                        <button
                            key={color}
                            onClick={() => {
                                updateEdgeData({ edgeColor: color });
                            }}
                            style={{
                                width: '30px',
                                height: '30px',
                                border: edgeData.edgeColor === color ? '3px solid #007bff' : '1px solid #ced4da',
                                borderRadius: '4px',
                                background: color,
                                cursor: 'pointer'
                            }}
                            title={color}
                        />
                    ))}
                </div>
            </div> */}

            <button
                onClick={() => {
                    props.setEdges(edges => edges.filter(edge => edge.id !== props.selectedEdge.id));
// Close the edge panel if the function exists
            if (props.setShowEdgePanel) {
                props.setShowEdgePanel(false);
            }
            
            // Clear the selected edge
            if (props.setSelectedEdge) {
                props.setSelectedEdge(null);
            }                }}
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
        </div>
    );
};

export default ConnectorProperties;