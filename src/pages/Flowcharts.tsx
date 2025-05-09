
import React, { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConnectivityStatus from '@/components/ConnectivityStatus';
import { useLanguage } from '@/contexts/LanguageContext';

// User Flow Diagram
const userFlowNodes: Node[] = [
  {
    id: '1',
    data: { label: 'User Opens App' },
    position: { x: 250, y: 0 },
    type: 'input',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
  {
    id: '2',
    data: { label: 'Select Language (EN/SW)' },
    position: { x: 250, y: 80 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '3',
    data: { label: 'View Quick Actions' },
    position: { x: 250, y: 160 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '4a',
    data: { label: 'Clinic Locations' },
    position: { x: 100, y: 240 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '4b',
    data: { label: 'Schedule Appointment' },
    position: { x: 250, y: 240 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '4c',
    data: { label: 'View FAQs' },
    position: { x: 400, y: 240 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '5',
    data: { label: 'Chat with AI Assistant' },
    position: { x: 250, y: 320 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '6',
    data: { label: 'Text or Voice Input' },
    position: { x: 250, y: 400 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '7',
    data: { label: 'Receive AI Response' },
    position: { x: 250, y: 480 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: '8',
    data: { label: 'End Interaction / New Query' },
    position: { x: 250, y: 560 },
    type: 'output',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
];

const userFlowEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4a', source: '3', target: '4a', animated: false },
  { id: 'e3-4b', source: '3', target: '4b', animated: false },
  { id: 'e3-4c', source: '3', target: '4c', animated: false },
  { id: 'e4a-5', source: '4a', target: '5', animated: false },
  { id: 'e4b-5', source: '4b', target: '5', animated: false },
  { id: 'e4c-5', source: '4c', target: '5', animated: false },
  { id: 'e3-5', source: '3', target: '5', animated: true, type: 'straight' },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-6', source: '8', target: '6', animated: true, type: 'step', style: { stroke: '#f6ad55' } },
];

// System Architecture Flow
const systemArchNodes: Node[] = [
  {
    id: 's1',
    data: { label: 'User Interface' },
    position: { x: 250, y: 0 },
    type: 'input',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
  {
    id: 's2',
    data: { label: 'React Components' },
    position: { x: 250, y: 80 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's2a',
    data: { label: 'Header' },
    position: { x: 100, y: 160 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's2b',
    data: { label: 'ChatInterface' },
    position: { x: 250, y: 160 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's2c',
    data: { label: 'QuickActions' },
    position: { x: 400, y: 160 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's3',
    data: { label: 'Context Providers' },
    position: { x: 250, y: 240 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's3a',
    data: { label: 'LanguageContext' },
    position: { x: 175, y: 320 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's3b',
    data: { label: 'Other Contexts' },
    position: { x: 325, y: 320 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's4',
    data: { label: 'API Integration' },
    position: { x: 250, y: 400 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 's5',
    data: { label: 'Supabase Backend' },
    position: { x: 250, y: 480 },
    type: 'output',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
];

const systemArchEdges: Edge[] = [
  { id: 'es1-s2', source: 's1', target: 's2', animated: true },
  { id: 'es2-s2a', source: 's2', target: 's2a' },
  { id: 'es2-s2b', source: 's2', target: 's2b' },
  { id: 'es2-s2c', source: 's2', target: 's2c' },
  { id: 'es2-s3', source: 's2', target: 's3', animated: true },
  { id: 'es3-s3a', source: 's3', target: 's3a' },
  { id: 'es3-s3b', source: 's3', target: 's3b' },
  { id: 'es3-s4', source: 's3', target: 's4', animated: true },
  { id: 'es4-s5', source: 's4', target: 's5', animated: true },
];

// Conversation Flow
const conversationFlowNodes: Node[] = [
  {
    id: 'c1',
    data: { label: 'User Enters Query' },
    position: { x: 250, y: 0 },
    type: 'input',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
  {
    id: 'c2',
    data: { label: 'Text Input' },
    position: { x: 175, y: 80 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 'c3',
    data: { label: 'Voice Input' },
    position: { x: 325, y: 80 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 'c4',
    data: { label: 'Process Query' },
    position: { x: 250, y: 160 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 'c5',
    data: { label: 'Check Language Context' },
    position: { x: 250, y: 240 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 'c6',
    data: { label: 'Generate Response' },
    position: { x: 250, y: 320 },
    className: 'bg-white border border-afya-secondary p-2 rounded-md shadow-md',
  },
  {
    id: 'c7',
    data: { label: 'Display Response to User' },
    position: { x: 250, y: 400 },
    type: 'output',
    className: 'bg-afya-secondary text-white p-2 rounded-md shadow-md',
  },
];

const conversationFlowEdges: Edge[] = [
  { id: 'ec1-c2', source: 'c1', target: 'c2' },
  { id: 'ec1-c3', source: 'c1', target: 'c3' },
  { id: 'ec2-c4', source: 'c2', target: 'c4', animated: true },
  { id: 'ec3-c4', source: 'c3', target: 'c4', animated: true },
  { id: 'ec4-c5', source: 'c4', target: 'c5', animated: true },
  { id: 'ec5-c6', source: 'c5', target: 'c6', animated: true },
  { id: 'ec6-c7', source: 'c6', target: 'c7', animated: true },
];

const Flowcharts: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('user-flow');

  return (
    <LanguageProvider>
      <div className="flex flex-col h-screen bg-afya-neutral">
        <Header />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4 text-afya-secondary">{t('flowcharts')}</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="user-flow">{t('userFlow')}</TabsTrigger>
                <TabsTrigger value="system-arch">{t('systemArchitecture')}</TabsTrigger>
                <TabsTrigger value="conversation-flow">{t('conversationFlow')}</TabsTrigger>
              </TabsList>
              
              <div className="bg-white rounded-lg shadow-lg border border-afya-secondary/30 h-[70vh]">
                <TabsContent value="user-flow" className="h-full">
                  <ReactFlow 
                    nodes={userFlowNodes}
                    edges={userFlowEdges}
                    fitView
                    className="h-full"
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </TabsContent>
                
                <TabsContent value="system-arch" className="h-full">
                  <ReactFlow 
                    nodes={systemArchNodes}
                    edges={systemArchEdges}
                    fitView
                    className="h-full"
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </TabsContent>
                
                <TabsContent value="conversation-flow" className="h-full">
                  <ReactFlow 
                    nodes={conversationFlowNodes}
                    edges={conversationFlowEdges}
                    fitView
                    className="h-full"
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
        
        <Footer />
        <ConnectivityStatus />
      </div>
    </LanguageProvider>
  );
};

export default Flowcharts;
