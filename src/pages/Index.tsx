
import React, { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import ConnectivityStatus from '@/components/ConnectivityStatus';
import QuickActionButtons from '@/components/QuickActionButtons';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FlowChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleQuickAction = (action: string) => {
    // In a real application, these would trigger specific functionality
    // For now, we'll just show a toast notification
    toast({
      title: `Action: ${action}`,
      description: `You selected the ${action} action. This feature would be implemented in the full application.`,
    });
  };
  
  return (
    <LanguageProvider>
      <div className="flex flex-col h-screen bg-afya-neutral">
        <Header />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="container mx-auto p-4 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <QuickActionButtons onActionClick={handleQuickAction} />
              <Button variant="outline" asChild className="flex items-center gap-2 border-afya-secondary hover:bg-afya-secondary hover:text-white">
                <Link to="/flowcharts">
                  <FlowChart className="h-4 w-4" />
                  <span>{t('viewFlowcharts') || 'View Flowcharts'}</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden container mx-auto max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border border-afya-secondary/30">
              <ChatInterface />
            </div>
          </div>
        </main>
        
        <Footer />
        <ConnectivityStatus />
      </div>
    </LanguageProvider>
  );
};

export default Index;
