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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-100" style={{ height: '85vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <span className="text-4xl">🤖</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1 drop-shadow-lg">Chatbot Educativo</h1>
                <p className="text-lg opacity-90 font-medium">
                  Pregunta sobre roles de género, estereotipos y la importancia de la igualdad
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white/50 to-purple-50/30" style={{ height: 'calc(85vh - 220px)' }}>
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-lg">
                  <p className="text-2xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    ¡Hola! Soy tu asistente educativo 👋
                  </p>
                  <p className="text-lg mb-4 text-gray-700 font-semibold">Puedes preguntarme sobre:</p>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="text-2xl">💭</span>
                      <span className="font-medium">Roles de género y estereotipos</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="text-2xl">📜</span>
                      <span className="font-medium">Historia de la igualdad de género</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="text-2xl">⭐</span>
                      <span className="font-medium">Mujeres destacadas en diferentes campos</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <span className="text-2xl">🌈</span>
                      <span className="font-medium">Cómo promover la igualdad en la vida diaria</span>
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
                className={`max-w-[80%] rounded-3xl px-6 py-4 shadow-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white'
                    : 'bg-white border-2 border-purple-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap text-base leading-relaxed font-medium">{message.content}</p>
                <p className={`text-xs mt-2 font-semibold ${message.role === 'user' ? 'text-white/70' : 'text-purple-400'}`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border-2 border-purple-200 rounded-3xl px-6 py-4 shadow-lg">
                <div className="flex gap-2 items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-purple-600 font-semibold">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-6 bg-gradient-to-r from-white to-purple-50/30 border-t-2 border-purple-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="✨ Escribe tu pregunta aquí..."
              className="flex-1 px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-gray-800 bg-white placeholder-gray-400 text-lg font-medium shadow-sm transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
