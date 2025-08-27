import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Background,
  ReactFlow,
    MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
  Panel,
  Controls 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import NodePalette from './components/node-palette';
import CustomEdge from './components/custom-edge';
import UpdateNode from './components/update-node';
import NodeWithToolbar from './components/node-toolbar';
import ConnectorProperties from './components/connector-properties';
import ShapeNode from './components/shape-node';

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const flowKey = 'example-flow';


const initialNodes = [
  // {
  //   id: '1',
  //   position: { x: 100, y: 100 },
  //   data: { label: 'Start' },
  //   type: 'node-with-toolbar'  },
];

const initialEdges = [];

const FlowComponent = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showEdgePanel, setShowEdgePanel] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const { getViewport } = useReactFlow();

const nodeTypes = {
  'shape': (props) => (
    <ShapeNode 
      {...props} 
      setEdges={setEdges} 
      setNodes={setNodes}
      onUpdateNode={handleUpdateNode}
    />
  ),
  'node-with-toolbar': (props) => (
    <NodeWithToolbar 
      {...props} 
      setEdges={setEdges} 
      setNodes={setNodes}
      onUpdateNode={handleUpdateNode}
    />
  ),
};
useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('ResizeObserver loop completed with undelivered notifications')) {
        return; // Suppress this specific error
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

const handleUpdateNode = (nodeId, nodeData) => {
    setSelectedNode({ id: nodeId, data: nodeData });
    setShowUpdatePanel(true);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

   const onConnect = useCallback(
  (connection) => {
    const edge = { 
      ...connection, 
      type: 'custom-edge',
      data: {}, 
    };
    setEdges((eds) => addEdge(edge, eds));
  },
  [setEdges],
);
 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

 const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const shapeType = event.dataTransfer.getData('application/reactflow-shape');
    const label = event.dataTransfer.getData('application/reactflow-label');
    const color = event.dataTransfer.getData('application/reactflow-color');

    if (typeof type === 'undefined' || !type) {
      return;
    }

    const viewport = getViewport();
    const position = {
      x: (event.clientX - reactFlowBounds.left - viewport.x) / viewport.zoom,
      y: (event.clientY - reactFlowBounds.top - viewport.y) / viewport.zoom,
    };

    const newNode = {
      id: `${type}-${Date.now()}`,
      type: type,
      position,
      data: { 
        type: shapeType,
        label: '', 
        color: color || '#7f8c8d'
      },
    };
    setNodes((nds) => nds.concat(newNode));
  },
  [getViewport, setNodes],
);

const closeNodePanel =(flag)=>{
 setShowUpdatePanel(flag)
}

   const edgeTypes = {
  'custom-edge': (props) => (
    <CustomEdge 
      {...props} 
      setEdges={setEdges} 
      markerEnd={{
        type: MarkerType.ArrowClosed,
      }}
      style={{
        strokeWidth: 2,
        stroke: '#b1b1b7',
      }} 
      onEdgeClick={handleEdgeClick}
       selectedEdge={selectedEdge}       
    />
  ),
};

const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

   const handleEdgeClick = (edgeId, edgeData, edgeLabel) => {
    setSelectedEdge({ id: edgeId, data: edgeData, label: edgeLabel });
    setShowEdgePanel(true);
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <NodePalette/>
      <div style={{ flex: 1, height: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={defaultViewport}
        minZoom={0.2}
        maxZoom={4}
        attributionPosition="bottom-left"
        fitView
        fitViewOptions={{ padding: 0.5 }}
              onInit={setRfInstance}

  //       defaultEdgeOptions={{
  //   markerEnd: {
  //     type: MarkerType.ArrowClosed,
  //   },
  //   style: {
  //     strokeWidth: 1,
  //     stroke: '#b1b1b7',
  //   },
  // }}
      >
        <Background />
        <Panel position="top-right">
        <button className="primary" onClick={onSave}>
          Save
        </button>
        <button className="primary" onClick={onRestore}>
          Restore
        </button>
      </Panel>
       <MiniMap nodeStrokeWidth={3} />
       <Controls />
      </ReactFlow>
      </div>
      {showUpdatePanel && selectedNode && (
          <div style={{
            width: '300px',
            backgroundColor: 'white',
            borderLeft: '1px solid #ddd',
            padding: '20px',
            overflowY: 'auto',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)'
          }}>
            <UpdateNode 
              setNodes={setNodes} 
              setEdges={setEdges}
              selectedNode={selectedNode}
              closeNodePanel={closeNodePanel}
            />
          </div>
        )}
        {showEdgePanel && selectedEdge && (
        <div style={{
          width: '300px',
          backgroundColor: '#f8f9fa',
          borderLeft: '1px solid #dee2e6',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#495057' }}>Edge Properties</h3>
            <button
              onClick={() => setShowEdgePanel(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#6c757d'
              }}
            >
              ×
            </button>
          </div>
          <ConnectorProperties setSelectedEdge={setSelectedEdge} 
              setEdges={setEdges}
              selectedEdge={selectedEdge}/>
          
        </div>
      )}
    </div>
  );
};
 
export default function App() {
  return (
  <ReactFlowProvider>
      <FlowComponent />
  </ReactFlowProvider>
);
}
