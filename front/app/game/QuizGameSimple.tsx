'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Sparkles, Trophy, Copy, Check } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  feedback: string;
  intention: string;
}

export default function QuizGame() {
  const { user } = useAuth();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await apiClient.getQuizQuestions();
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading questions:', error);
      setLoading(false);
    }
  };

  const handleStartGame = (asGuest: boolean) => {
    if (asGuest) {
      setGuestMode(true);
      setShowWelcomeModal(false);
    } else if (!user) {
      router.push('/login');
    } else {
      setShowWelcomeModal(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = questions[currentQuestionIndex];
    setAnswers([...answers, { questionId: currentQuestion.id, answer }]);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        finishGame();
      }
    }, 4000);
  };

  const finishGame = async () => {
    try {
      const finalAnswers = [...answers, { 
        questionId: questions[currentQuestionIndex].id, 
        answer: selectedAnswer! 
      }];
      
      if (guestMode) {
        setResult({
          score: finalAnswers.length,
          totalQuestions: questions.length,
          percentage: Math.round((finalAnswers.length / questions.length) * 100),
          code: null,
          guestMode: true
        });
        setGameCompleted(true);
        return;
      }

      const response = await apiClient.submitQuiz(finalAnswers);
      setResult(response);
      setGameCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const copyCode = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-2xl">Cargando juego...</div>
      </div>
    );
  }

  if (gameCompleted && result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
            </motion.div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
              ¡Juego Completado!
            </h1>

            <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
              <div className="text-6xl font-bold text-white mb-2">
                {result.percentage}%
              </div>
              <div className="text-gray-400 text-lg">
                {result.score} de {result.totalQuestions} respuestas correctas
              </div>
            </div>

            {result.guestMode ? (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6 mb-6">
                <div className="text-yellow-400 text-lg font-bold mb-3 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Modo Invitado
                </div>
                <p className="text-gray-300 mb-4">
                  ¡Excelente trabajo! Para guardar tu puntaje y aparecer en el ranking, necesitas crear una cuenta.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => router.push('/register')}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Crear Cuenta
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6 border border-purple-500/30">
                <p className="text-gray-300 text-sm mb-3">Tu código único:</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl font-mono font-bold text-white tracking-wider bg-black/30 px-6 py-3 rounded-xl">
                    {result.code}
                  </div>
                  <button
                    onClick={copyCode}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6 text-white" />}
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  Válido por 1 hora • Úsalo en "Enviar Puntaje"
                </p>
              </div>
            )}

            <div className="flex gap-4">
              {!result.guestMode && (
                <button
                  onClick={() => router.push('/submit-score')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Registrar Puntaje
                </button>
              )}
              <button
                onClick={() => router.push('/leaderboard')}
                className="flex-1 bg-white/10 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Ver Ranking
              </button>
            </div>

            <button
              onClick={() => globalThis.location.reload()}
              className="mt-4 text-gray-400 hover:text-white transition-colors"
            >
              Jugar de nuevo
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (showWelcomeModal && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌌</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
              Bienvenido al Quiz 3D
            </h1>
            <p className="text-xl text-gray-300">
              Explora el espacio y aprende sobre igualdad de género
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">📋 ¿Cómo funciona?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">1.</span>
                <span>Responde 10 preguntas sobre roles de género</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">2.</span>
                <span>Navega por las preguntas en orden</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">3.</span>
                <span>Aprende con el feedback educativo de cada pregunta</span>
              </li>
            </ul>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
                <p className="text-green-400 font-semibold mb-1">✅ Sesión iniciada</p>
                <p className="text-gray-300 text-sm">Tu puntaje se guardará automáticamente</p>
              </div>
              <button
                onClick={() => handleStartGame(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:scale-105"
              >
                🚀 Comenzar Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4">
                <p className="text-yellow-400 font-semibold mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Opciones de Juego
                </p>
                <p className="text-gray-300 text-sm text-center">
                  Elige cómo quieres jugar el quiz
                </p>
              </div>

              <button
                onClick={() => handleStartGame(true)}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                🎮 Jugar como Invitado
                <span className="block text-sm text-gray-400 mt-1">
                  (No se guardará tu puntaje)
                </span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900 text-gray-400">o</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/login')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => router.push('/register')}
                  className="flex-1 bg-purple-500/20 border border-purple-500/30 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-500/30 transition-all"
                >
                  Registrarse
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm">
                💡 Crea una cuenta para guardar tu puntaje y aparecer en el ranking
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* UI Overlay - Versión sin escena 3D por ahora */}
      <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10 inline-block">
            <div className="flex items-center gap-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-white font-semibold">Pregunta {currentQuestionIndex + 1} de {questions.length}</div>
                <div className="text-gray-400 text-sm">{currentQuestion?.category}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto max-w-3xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {currentQuestion?.question}
              </h2>

              <div className="space-y-3 mb-6">
                {currentQuestion?.options.map((option, index) => (
                  <button
                    key={`option-${currentQuestionIndex}-${index}`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl font-medium transition-all ${
                      selectedAnswer === option
                        ? 'bg-purple-600 text-white scale-105'
                        : 'bg-white/5 text-white hover:bg-white/10 hover:scale-102'
                    } ${showFeedback ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
                  >
                    <p className="text-white text-sm leading-relaxed">
                      {currentQuestion?.feedback}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
