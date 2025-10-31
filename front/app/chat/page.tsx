'use client';

import { useEffect, useState, useRef } from 'react';
import { apiClient } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      // Load all sessions for the user
      const sessions = await apiClient.getChatSessions();
      if (sessions && sessions.length > 0) {
        // Get the most recent session
        const mostRecentSession = sessions[0];
        setSessionId(mostRecentSession.id);
        
        // Load messages from that session
        const history = await apiClient.getChatHistory(mostRecentSession.id);
        setMessages(history.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })));
      }
    } catch (err) {
      console.log('No previous chat history');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await apiClient.sendChatMessage(inputMessage, sessionId || undefined);
      
      setSessionId(response.sessionId);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-4 sm:py-6 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-purple-500/20 h-[85vh] sm:h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-3 sm:p-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg">
                <span className="text-xl sm:text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-white">Chatbot Educativo</h1>
                <p className="text-white/80 text-xs hidden sm:block">
                  Pregunta sobre roles de género, estereotipos y la importancia de la igualdad
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="inline-block bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl border border-purple-500/30 max-w-lg mx-4 sm:mx-0">
                  <p className="text-xl sm:text-2xl mb-3 sm:mb-5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    ¡Hola! Soy tu asistente educativo 👋
                  </p>
                  <p className="text-sm sm:text-base mb-3 sm:mb-5 text-purple-200 font-semibold">Puedes preguntarme sobre:</p>
                  <ul className="space-y-2 sm:space-y-3 text-left">
                    <li className="flex items-center gap-2 sm:gap-3 text-purple-100">
                      <span className="text-lg sm:text-xl">💭</span>
                      <span className="font-medium text-sm sm:text-base">Roles de género y estereotipos</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-purple-100">
                      <span className="text-lg sm:text-xl">📜</span>
                      <span className="font-medium text-sm sm:text-base">Historia de la igualdad de género</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-purple-100">
                      <span className="text-lg sm:text-xl">⭐</span>
                      <span className="font-medium text-sm sm:text-base">Mujeres destacadas en diferentes campos</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3 text-purple-100">
                      <span className="text-lg sm:text-xl">🌈</span>
                      <span className="font-medium text-sm sm:text-base">Cómo promover la igualdad en la vida diaria</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white'
                    : 'bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 text-purple-50'
                }`}
              >
                <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{message.content}</p>
                <p className={`text-[10px] sm:text-xs mt-1 sm:mt-1.5 ${message.role === 'user' ? 'text-purple-200' : 'text-purple-300'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-purple-200 text-xs sm:text-sm">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-slate-800/80 backdrop-blur-sm border-t border-purple-500/20 shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="✨ Escribe tu pregunta..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300/60 text-xs sm:text-sm transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="hidden sm:inline">Enviar 🚀</span>
              <span className="sm:hidden">🚀</span>
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
