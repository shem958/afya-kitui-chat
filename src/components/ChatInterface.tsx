import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, User, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("welcomeMessage"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition with current language
  const speechLang = language === "en" ? "en-US" : "sw-KE";
  const {
    text: speechText,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition(speechLang);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        ...prev[0],
        text: t("welcomeMessage"),
      },
      ...prev.slice(1),
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
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response (this would be replaced with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
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
          variant: "destructive",
        });
        return;
      }
      startListening();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple mock responses - in a real app, this would be replaced with API calls
  const getMockResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (language === "en") {
      if (
        lowerQuery.includes("clinic") ||
        lowerQuery.includes("hospital") ||
        lowerQuery.includes("location")
      ) {
        return "We have clinics in Kitui Town, Mwingi, and Mutomo. Which location would you like more information about?";
      } else if (
        lowerQuery.includes("appointment") ||
        lowerQuery.includes("book") ||
        lowerQuery.includes("schedule")
      ) {
        return "To schedule an appointment, please provide your preferred clinic location, the date, and what service you need.";
      } else if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
        return "Hello! How can I help you with your health needs today?";
      } else {
        return "Thank you for your question. How else can I assist you with health services in Kitui County?";
      }
    } else {
      // Swahili responses
      if (
        lowerQuery.includes("kliniki") ||
        lowerQuery.includes("hospitali") ||
        lowerQuery.includes("eneo")
      ) {
        return "Tuna kliniki katika Mji wa Kitui, Mwingi, na Mutomo. Ungependa habari zaidi kuhusu eneo gani?";
      } else if (lowerQuery.includes("miadi") || lowerQuery.includes("panga")) {
        return "Ili kupanga miadi, tafadhali toa eneo lako la kliniki unayopendelea, tarehe, na huduma unayohitaji.";
      } else if (
        lowerQuery.includes("jambo") ||
        lowerQuery.includes("habari")
      ) {
        return "Habari! Nawezaje kukusaidia na mahitaji yako ya afya leo?";
      } else {
        return "Asante kwa swali lako. Ni vipi ninaweza kukusaidia zaidi na huduma za afya katika Kaunti ya Kitui?";
      }
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container flex flex-col h-full bg-gradient-to-br from-afya-neutral/5 to-afya-secondary/5">
      <div className="bg-afya-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Afya Health Assistant</h1>
      </div>

      <div className="chat-messages flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
            >
              <div
                className={`rounded-full p-2 ${message.sender === "user" ? "bg-afya-primary text-white" : "bg-afya-secondary text-white"}`}
              >
                {message.sender === "user" ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>

              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-afya-primary text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                }`}
              >
                <div className="mb-1 text-sm">{message.text}</div>
                <div
                  className={`text-xs ${message.sender === "user" ? "text-white/70" : "text-gray-400"}`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-start gap-2 max-w-[80%]">
              <div className="rounded-full p-2 bg-afya-secondary text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-afya-secondary animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-afya-secondary animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-afya-secondary animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 shadow-inner">
        <div className="flex gap-2 items-center bg-gray-50 rounded-full border border-gray-200 pl-4 pr-2 py-1 shadow-sm">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("inputPlaceholder")}
            className="text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button
            onClick={handleVoiceInput}
            type="button"
            variant={isListening ? "destructive" : "ghost"}
            size="sm"
            className="rounded-full h-10 w-10"
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5 text-afya-secondary" />
            )}
          </Button>

          <Button
            onClick={handleSend}
            type="button"
            variant="default"
            size="sm"
            className="bg-afya-primary hover:bg-afya-primary/90 rounded-full h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {isListening && (
          <div className="text-sm text-afya-secondary mt-2 text-center animate-pulse font-medium">
            {t("listening")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
