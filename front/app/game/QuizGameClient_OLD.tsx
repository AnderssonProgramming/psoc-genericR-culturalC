"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Text } from "@react-three/drei"
import * as THREE from "three"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ThreeScene } from "./ThreeScene"
import { WelcomeScreen } from "./WelcomeScreen"
import { QuizCard } from "./QuizCard"
import { ResultsScreen } from "./ResultsScreen"
import { AnimatePresence } from "framer-motion"

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  feedback: string
  intention: string
}

type GameState = "welcome" | "playing" | "results"

// Componente de cristal 3D animado que representa una pregunta
function QuestionCrystal({ position, color, onClick, isActive, isAnswered, questionNumber }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position} onClick={onClick}>
        {/* Cristal principal MÁS GRANDE */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? [1.8, 1.8, 1.8] : isActive ? [1.6, 1.6, 1.6] : [1.4, 1.4, 1.4]}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={isAnswered ? '#fbbf24' : (isActive ? '#ffffff' : color)}
            emissive={color}
            emissiveIntensity={isActive ? 1.2 : 0.6}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Anillo de energía */}
        {(isActive || hovered) && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.08, 16, 100]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
        
        {/* Número de pregunta MÁS GRANDE */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
          font="/fonts/bold.woff"
        >
          {questionNumber}
        </Text>
      </group>
    </Float>
  );
}

// Escena 3D principal con múltiples grupos por categoría
function Scene({ currentQuestionIndex, onSphereClick, totalQuestions, questions, answeredQuestions }: any) {
  // Colores vibrantes por categoría
  const categoryColors: { [key: string]: string } = {
    'Hogar': '#10b981',      // Verde brillante
    'Sociedad': '#3b82f6',   // Azul brillante
    'Profesional': '#a855f7' // Morado brillante
  };

  // Agrupar preguntas por categoría
  const questionsByCategory = questions.reduce((acc: any, q: any, index: number) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push({ ...q, originalIndex: index });
    return acc;
  }, {});

  // Posiciones en 3 grupos circulares (uno por categoría)
  const categories = ['Hogar', 'Sociedad', 'Profesional'];
  const categoryPositions = [
    { x: -6, z: -3 },  // Hogar (izquierda)
    { x: 0, z: 0 },    // Sociedad (centro)
    { x: 6, z: -3 }    // Profesional (derecha)
  ];

  return (
    <>
      {/* Iluminación mejorada y MÁS BRILLANTE */}
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, 10, -10]} intensity={2} color="#a855f7" />
      <pointLight position={[0, -5, 5]} intensity={2} color="#3b82f6" />
      <spotLight position={[0, 20, 0]} intensity={2} angle={0.6} penumbra={1} color="#10b981" />
      
      {/* Estrellas de fondo MÁS VISIBLES */}
      <Stars radius={100} depth={50} count={10000} factor={8} saturation={1} fade speed={1} />
      
      {/* Renderizar cristales por categoría */}
      {categories.map((category, catIndex) => {
        const questionsInCategory = questionsByCategory[category] || [];
        const centerPos = categoryPositions[catIndex];
        const color = categoryColors[category];
        const radius = 2.5;
        
        return (
          <group key={category} position={[centerPos.x, 0, centerPos.z]}>
            {/* Título de categoría flotante */}
            <Text
              position={[0, 4, 0]}
              fontSize={0.6}
              color={color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
              font="/fonts/bold.ttf"
            >
              {category.toUpperCase()}
            </Text>
            
            {/* Círculo de energía en el suelo MÁS VISIBLE */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
              <ringGeometry args={[2.5, 3.5, 64]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.2}
                transparent
                opacity={0.7}
              />
            </mesh>
            
            {/* Círculo interior adicional */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
              <circleGeometry args={[2.3, 64]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.4}
              />
            </mesh>
            
            {/* Cristales de preguntas */}
            {questionsInCategory.map((q: any, index: number) => {
              const angle = (index / questionsInCategory.length) * Math.PI * 2;
              const pos: [number, number, number] = [
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 1,
                Math.sin(angle) * radius
              ];
              
              return (
                <QuestionCrystal
                  key={q.originalIndex}
                  position={pos}
                  color={color}
                  onClick={() => onSphereClick(q.originalIndex)}
                  isActive={q.originalIndex === currentQuestionIndex}
                  isAnswered={answeredQuestions.includes(q.id)}
                  questionNumber={q.originalIndex + 1}
                />
              );
            })}
          </group>
        );
      })}

      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={10}
        maxDistance={30}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
    </>
  );
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
    } else {
      if (!user) {
        router.push('/login');
      } else {
        setShowWelcomeModal(false);
      }
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = questions[currentQuestionIndex];
    setAnswers([...answers, { questionId: currentQuestion.id, answer }]);

    // Auto-avanzar después de 4 segundos
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        handleSubmitQuiz();
      }
    }, 4000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      const finalAnswers = [...answers, { 
        questionId: questions[currentQuestionIndex].id, 
        answer: selectedAnswer! 
      }];
      
      // Si es modo invitado, solo calcular score local sin guardar
      if (guestMode) {
        // Calcular score local (simple count)
        let correctCount = 0;
        finalAnswers.forEach((ans) => {
          const q = questions.find(qq => qq.id === ans.questionId);
          // Note: We don't have correctAnswer in client, so just show completion
        });
        setResult({
          score: finalAnswers.length,
          totalQuestions: questions.length,
          percentage: Math.round((finalAnswers.length / questions.length) * 100),
          code: null, // No code for guests
          guestMode: true
        });
        setGameCompleted(true);
        return;
      }

      // Modo autenticado: guardar en backend
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

            {/* Modo invitado: mostrar mensaje de registro */}
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
              /* Modo autenticado: mostrar código */
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

  // Modal de bienvenida rediseñado
  if (showWelcomeModal && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="max-w-3xl w-full bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-2xl rounded-3xl p-8 border-2 border-purple-400/30 shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div 
              className="text-7xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              �
            </motion.div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Quiz 3D Interactivo
            </h1>
            <p className="text-2xl text-white font-bold mb-2">
              Explora • Aprende • Reflexiona
            </p>
            <p className="text-gray-300">
              Un viaje educativo sobre igualdad de género
            </p>
          </div>

          {/* Sección de categorías mejorada */}
          <div className="mb-8">
            <h3 className="text-2xl font-black text-white mb-6 text-center">
              🎨 Tres Mundos de Conocimiento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Hogar */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-green-500/30 to-emerald-600/20 border-2 border-green-400/50 rounded-2xl p-6 backdrop-blur-xl"
              >
                <div className="text-5xl mb-3 text-center">🏡</div>
                <h4 className="text-green-300 font-black text-xl mb-2 text-center">HOGAR</h4>
                <p className="text-white/80 text-sm text-center">
                  Roles en el ámbito doméstico y familiar
                </p>
                <div className="mt-3 text-center text-green-400 font-bold">3 preguntas</div>
              </motion.div>

              {/* Sociedad */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-blue-500/30 to-cyan-600/20 border-2 border-blue-400/50 rounded-2xl p-6 backdrop-blur-xl"
              >
                <div className="text-5xl mb-3 text-center">🌍</div>
                <h4 className="text-blue-300 font-black text-xl mb-2 text-center">SOCIEDAD</h4>
                <p className="text-white/80 text-sm text-center">
                  Expectativas y presiones sociales
                </p>
                <div className="mt-3 text-center text-blue-400 font-bold">4 preguntas</div>
              </motion.div>

              {/* Profesional */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-purple-500/30 to-fuchsia-600/20 border-2 border-purple-400/50 rounded-2xl p-6 backdrop-blur-xl"
              >
                <div className="text-5xl mb-3 text-center">💼</div>
                <h4 className="text-purple-300 font-black text-xl mb-2 text-center">PROFESIONAL</h4>
                <p className="text-white/80 text-sm text-center">
                  Liderazgo y ambiente laboral
                </p>
                <div className="mt-3 text-center text-purple-400 font-bold">3 preguntas</div>
              </motion.div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              ¿Cómo funciona?
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold text-lg">1.</span>
                <span><strong className="text-white">Explora el espacio 3D</strong> - Los cristales representan preguntas agrupadas por categoría</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold text-lg">2.</span>
                <span><strong className="text-white">Haz clic en cualquier cristal</strong> para responder esa pregunta</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold text-lg">3.</span>
                <span><strong className="text-white">Aprende con el feedback</strong> educativo después de cada respuesta</span>
              </li>
            </ul>
          </div>

          {user ? (
            /* Usuario autenticado */
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
            /* Modo invitado */
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
      {/* Canvas 3D - Visible en el fondo */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 8, 18], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene 
              currentQuestionIndex={currentQuestionIndex}
              onSphereClick={setCurrentQuestionIndex}
              totalQuestions={questions.length}
              questions={questions}
              answeredQuestions={answers.map(a => a.questionId)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay mejorado - sobre el canvas */}
      <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-6">
        {/* Header solo con contador de respuestas */}
        <div className="pointer-events-auto flex justify-end items-start">
          {/* Contador de respuestas */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="backdrop-blur-xl bg-slate-900/80 rounded-2xl p-4 border border-white/20"
          >
            <div className="text-yellow-400 font-bold text-sm">RESPONDIDAS</div>
            <div className="text-white font-black text-2xl">{answers.length}/10</div>
          </motion.div>
        </div>

        {/* Question Card rediseñada */}
        <div className="pointer-events-auto max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`
                backdrop-blur-2xl rounded-3xl p-0 border-4 shadow-2xl overflow-hidden
                ${currentQuestion?.category === 'Hogar' ? 'border-green-400' : ''}
                ${currentQuestion?.category === 'Sociedad' ? 'border-blue-400' : ''}
                ${currentQuestion?.category === 'Profesional' ? 'border-purple-400' : ''}
              `}
            >
              {/* Banner GRANDE de categoría en la parte superior */}
              <div className={`
                px-8 py-6 flex items-center justify-between
                ${currentQuestion?.category === 'Hogar' ? 'bg-gradient-to-r from-green-600 via-emerald-500 to-green-600' : ''}
                ${currentQuestion?.category === 'Sociedad' ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600' : ''}
                ${currentQuestion?.category === 'Profesional' ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600' : ''}
              `}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl animate-bounce">
                    {currentQuestion?.category === 'Hogar' && '🏡'}
                    {currentQuestion?.category === 'Sociedad' && '🌍'}
                    {currentQuestion?.category === 'Profesional' && '💼'}
                  </span>
                  <div>
                    <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">Categoría</div>
                    <div className="text-white font-black text-3xl uppercase tracking-wider drop-shadow-lg">
                      {currentQuestion?.category}
                    </div>
                  </div>
                </div>
                <div className="text-white font-bold text-xl bg-white/30 px-5 py-3 rounded-2xl backdrop-blur-sm border-2 border-white/40">
                  {currentQuestionIndex + 1} / {questions.length}
                </div>
              </div>

              {/* Contenido de la pregunta */}
              <div className={`
                p-8
                ${currentQuestion?.category === 'Hogar' ? 'bg-gradient-to-br from-green-900/50 to-emerald-800/30' : ''}
                ${currentQuestion?.category === 'Sociedad' ? 'bg-gradient-to-br from-blue-900/50 to-cyan-800/30' : ''}
                ${currentQuestion?.category === 'Profesional' ? 'bg-gradient-to-br from-purple-900/50 to-fuchsia-800/30' : ''}
              `}>
                {/* Título de la pregunta */}
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                    {currentQuestion?.question}
                  </h2>
                </div>

              {/* Opciones mejoradas */}
              <div className="space-y-3 mb-6">
                {currentQuestion?.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const baseColor = currentQuestion?.category === 'Hogar' ? 'green' :
                                   currentQuestion?.category === 'Sociedad' ? 'blue' : 'purple';
                  
                  return (
                    <motion.button
                      key={index}
                      whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showFeedback}
                      className={`
                        w-full text-left p-5 rounded-2xl font-bold text-lg transition-all relative overflow-hidden
                        ${isSelected
                          ? `bg-gradient-to-r shadow-2xl border-2
                             ${baseColor === 'green' ? 'from-green-600 to-emerald-500 border-green-300' : ''}
                             ${baseColor === 'blue' ? 'from-blue-600 to-cyan-500 border-blue-300' : ''}
                             ${baseColor === 'purple' ? 'from-purple-600 to-fuchsia-500 border-purple-300' : ''}
                             text-white scale-105`
                          : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/20'
                        }
                        ${showFeedback ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className={`
                          w-8 h-8 rounded-lg flex items-center justify-center font-black
                          ${isSelected ? 'bg-white/30' : 'bg-white/10'}
                        `}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback mejorado */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, scale: 0.9 }}
                    animate={{ height: 'auto', opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className={`
                      rounded-2xl p-6 border-2
                      ${currentQuestion?.category === 'Hogar' ? 'bg-green-500/20 border-green-400/50' : ''}
                      ${currentQuestion?.category === 'Sociedad' ? 'bg-blue-500/20 border-blue-400/50' : ''}
                      ${currentQuestion?.category === 'Profesional' ? 'bg-purple-500/20 border-purple-400/50' : ''}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">💡</div>
                      <div>
                        <p className="text-white font-semibold text-lg mb-2">¿Sabías que...?</p>
                        <p className="text-white/90 leading-relaxed">{currentQuestion?.feedback}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botón de siguiente */}
              {showFeedback && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNextQuestion}
                  className={`
                    w-full mt-6 py-4 rounded-2xl font-black text-xl uppercase tracking-wider transition-all shadow-xl
                    ${currentQuestion?.category === 'Hogar' ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600' : ''}
                    ${currentQuestion?.category === 'Sociedad' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600' : ''}
                    ${currentQuestion?.category === 'Profesional' ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-700 hover:to-fuchsia-600' : ''}
                    text-white
                  `}
                >
                  {currentQuestionIndex < questions.length - 1 ? '➡️ Siguiente Pregunta' : '🎉 Finalizar Quiz'}
                </motion.button>
              )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
