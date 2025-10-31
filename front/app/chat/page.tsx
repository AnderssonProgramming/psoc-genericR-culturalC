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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-500/20" style={{ height: '88vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 border-b border-purple-500/20">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Chatbot Educativo</h1>
                <p className="text-white/90 text-sm font-medium">
                  Pregunta sobre roles de género, estereotipos y la importancia de la igualdad
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-5" style={{ height: 'calc(88vh - 180px)' }}>
            {messages.length === 0 && (
              <div className="text-center py-16 px-6">
                <div className="inline-block bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-purple-500/30">
                  <p className="text-3xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    ¡Hola! Soy tu asistente educativo 👋
                  </p>
                  <p className="text-xl mb-6 text-purple-200 font-semibold">Puedes preguntarme sobre:</p>
                  <ul className="space-y-4 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-3 text-purple-100">
                      <span className="text-2xl">💭</span>
                      <span className="font-medium text-lg">Roles de género y estereotipos</span>
                    </li>
                    <li className="flex items-center gap-3 text-purple-100">
                      <span className="text-2xl">📜</span>
                      <span className="font-medium text-lg">Historia de la igualdad de género</span>
                    </li>
                    <li className="flex items-center gap-3 text-purple-100">
                      <span className="text-2xl">⭐</span>
                      <span className="font-medium text-lg">Mujeres destacadas en diferentes campos</span>
                    </li>
                    <li className="flex items-center gap-3 text-purple-100">
                      <span className="text-2xl">🌈</span>
                      <span className="font-medium text-lg">Cómo promover la igualdad en la vida diaria</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border border-purple-400/30'
                    : 'bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 text-purple-50'
                }`}
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 font-medium ${message.role === 'user' ? 'text-purple-200' : 'text-purple-300'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-slate-700/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex gap-2 items-center">
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-purple-200 font-medium">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-6 bg-slate-800/80 backdrop-blur-sm border-t border-purple-500/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="✨ Escribe tu pregunta aquí..."
              className="flex-1 px-5 py-4 bg-slate-700/50 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 text-white placeholder-purple-300/60 text-base transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Enviar 🚀
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
