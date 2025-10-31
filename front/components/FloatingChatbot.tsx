'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, Minus } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FloatingChatbot() {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de Gender Quest. Puedo ayudarte con información sobre el juego, desigualdad de género, y responder tus preguntas. ¿En qué puedo ayudarte?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let response;
      if (user && token) {
        // User is logged in, use chat API with token
        apiClient.setToken(token);
        response = await apiClient.sendChatMessage(input.trim());
      } else {
        // Guest mode - simulate AI response
        response = {
          message: 'Por favor, inicia sesión para usar el chatbot completo. Mientras tanto, puedes explorar el juego y registrarte en la sección de "Crear Cuenta".',
        };
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message || response.reply || 'Lo siento, no pude procesar tu mensaje.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-4 rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 max-w-md bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${isMinimized ? 'h-auto' : 'h-[500px] max-h-[80vh]'}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">Gender Quest AI</h3>
                  <p className="text-[10px] sm:text-xs text-white/80">Asistente virtual</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Minimizar"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                  title="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages - hidden when minimized */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white'
                            : 'bg-white/5 border border-white/10 text-slate-200'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        <span className="text-sm text-slate-300">Pensando...</span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Enviar mensaje"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
