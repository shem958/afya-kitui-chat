
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('welcomeMessage'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize speech recognition with current language
  const speechLang = language === 'en' ? 'en-US' : 'sw-KE';
  const { 
    text: speechText, 
    isListening, 
    startListening, 
    stopListening, 
    hasRecognitionSupport 
  } = useSpeechRecognition(speechLang);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => [
      {
        ...prev[0],
        text: t('welcomeMessage')
      },
      ...prev.slice(1)
    ]);
  }, [language, t]);
  
  // Update input when speech recognition provides text
  useEffect(() => {
    if (speechText) {
      setInput(speechText);
    }
  }, [speechText]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate bot response (this would be replaced with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      if (!hasRecognitionSupport) {
        toast({
          title: "Voice input not supported",
          description: "Your browser does not support speech recognition.",
          variant: "destructive"
        });
        return;
      }
      startListening();
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple mock responses - in a real app, this would be replaced with API calls
  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (language === 'en') {
      if (lowerQuery.includes('clinic') || lowerQuery.includes('hospital') || lowerQuery.includes('location')) {
        return "We have clinics in Kitui Town, Mwingi, and Mutomo. Which location would you like more information about?";
      } else if (lowerQuery.includes('appointment') || lowerQuery.includes('book') || lowerQuery.includes('schedule')) {
        return "To schedule an appointment, please provide your preferred clinic location, the date, and what service you need.";
      } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        return "Hello! How can I help you with your health needs today?";
      } else {
        return "Thank you for your question. How else can I assist you with health services in Kitui County?";
      }
    } else {
      // Swahili responses
      if (lowerQuery.includes('kliniki') || lowerQuery.includes('hospitali') || lowerQuery.includes('eneo')) {
        return "Tuna kliniki katika Mji wa Kitui, Mwingi, na Mutomo. Ungependa habari zaidi kuhusu eneo gani?";
      } else if (lowerQuery.includes('miadi') || lowerQuery.includes('panga')) {
        return "Ili kupanga miadi, tafadhali toa eneo lako la kliniki unayopendelea, tarehe, na huduma unayohitaji.";
      } else if (lowerQuery.includes('jambo') || lowerQuery.includes('habari')) {
        return "Habari! Nawezaje kukusaidia na mahitaji yako ya afya leo?";
      } else {
        return "Asante kwa swali lako. Ni vipi ninaweza kukusaidia zaidi na huduma za afya katika Kaunti ya Kitui?";
      }
    }
  };
  
  return (
    <div className="chat-container">
      <div className="chat-messages bg-afya-neutral/30 px-2 sm:px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.sender === 'user' ? 'message-user' : 'message-bot'}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message-bot">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-2 sm:p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('inputPlaceholder')}
            className="text-base sm:text-lg"
          />
          
          <Button
            onClick={handleVoiceInput}
            type="button"
            variant={isListening ? "destructive" : "secondary"}
            size={isMobile ? "sm" : "icon"}
          >
            {isListening ? <MicOff className={isMobile ? "h-4 w-4" : "h-5 w-5"} /> : <Mic className={isMobile ? "h-4 w-4" : "h-5 w-5"} />}
          </Button>
          
          <Button 
            onClick={handleSend} 
            type="button" 
            variant="default" 
            size={isMobile ? "sm" : "icon"}
          >
            <Send className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
          </Button>
        </div>
        {isListening && (
          <div className="text-xs sm:text-sm text-afya-secondary mt-2 animate-pulse">
            {t('listening')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
