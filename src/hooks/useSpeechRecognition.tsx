
import { useState, useEffect, useCallback } from 'react';

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionHook {
  text: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  error: string | null;
}

export const useSpeechRecognition = (language = 'en-US'): SpeechRecognitionHook => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if browser supports speech recognition
  const hasRecognitionSupport = 
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  
  // Initialize speech recognition
  let recognition: any = null;
  
  if (hasRecognitionSupport) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;
  }
  
  // Start listening
  const startListening = useCallback(() => {
    if (!hasRecognitionSupport) {
      setError('Your browser does not support speech recognition');
      return;
    }
    
    setText('');
    setError(null);
    setIsListening(true);
    
    try {
      recognition.start();
    } catch (err) {
      setError('Error starting speech recognition');
      setIsListening(false);
      console.error('Speech recognition error:', err);
    }
  }, [hasRecognitionSupport, recognition]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);
  
  useEffect(() => {
    if (!hasRecognitionSupport) return;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    
    recognition.onerror = (event: any) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    // Update language when it changes
    recognition.lang = language;
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [hasRecognitionSupport, recognition, language]);
  
  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    error
  };
};

export default useSpeechRecognition;
