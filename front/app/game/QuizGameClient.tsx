"use client"

import { useState, useEffect } from "react"
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

export default function QuizGame() {
  const { user } = useAuth()
  const router = useRouter()
  
  // Estado del juego
  const [gameState, setGameState] = useState<GameState>("welcome")
  const [guestMode, setGuestMode] = useState(false)
  
  // Datos del quiz
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Resultados
  const [result, setResult] = useState<any>(null)
  
  // Intentos restantes
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null)
  
  // Intensidad de la escena 3D (cambia con respuestas correctas/incorrectas)
  const [sceneIntensity, setSceneIntensity] = useState(1)

  // Cargar preguntas e intentos al iniciar
  useEffect(() => {
    loadQuestions()
    if (user) {
      loadUserAttempts()
    }
  }, [user])

  const loadQuestions = async () => {
    try {
      console.log('🔍 Cargando preguntas desde:', process.env.NEXT_PUBLIC_API_URL);
      const data = await apiClient.getQuizQuestions()
      console.log('✅ Preguntas cargadas:', data.length);
      setQuestions(data)
      setLoading(false)
      setError(null)
    } catch (error: any) {
      console.error("❌ Error loading questions:", error)
      setError(error.message || 'Error al cargar las preguntas')
      setLoading(false)
    }
  }

  const loadUserAttempts = async () => {
    try {
      const data = await apiClient.getUserAttempts()
      setAttemptsRemaining(data.remaining)
    } catch (error) {
      console.error("Error loading attempts:", error)
    }
  }

  // Calcular distribución de categorías
  const getCategoryDistribution = () => {
    const distribution = { Hogar: 0, Sociedad: 0, Profesional: 0 }
    for (const q of questions) {
      if (q.category in distribution) {
        distribution[q.category as keyof typeof distribution]++
      }
    }
    return distribution
  }

  // Iniciar juego
  const handleStartGame = () => {
    if (!user) {
      // Si no hay usuario, preguntar si quiere ir a login o modo invitado
      // Por ahora, ir directo a login
      router.push("/login")
      return
    }
    setGameState("playing")
  }

  const handleStartGuestMode = () => {
    setGuestMode(true)
    setGameState("playing")
  }

  // Manejar respuesta
  const handleAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    
    // Guardar respuesta
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer }]
    setAnswers(newAnswers)

    // Efecto visual en escena 3D (pulso)
    setSceneIntensity(2)
    setTimeout(() => setSceneIntensity(1), 1000)

    // Esperar 4 segundos (tiempo del feedback) y avanzar
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // Quiz completado, enviar resultados
        submitQuiz(newAnswers)
      }
    }, 4000)
  }

  // Enviar quiz
  const submitQuiz = async (finalAnswers: { questionId: number; answer: string }[]) => {
    try {
      if (guestMode) {
        // Modo invitado: no guardar en backend
        setResult({
          score: finalAnswers.length,
          totalQuestions: questions.length,
          percentage: Math.round((finalAnswers.length / questions.length) * 100),
          code: "",
          guestMode: true
        })
      } else {
        // Modo autenticado: enviar al backend
        const response = await apiClient.submitQuiz(finalAnswers)
        setResult({
          ...response,
          guestMode: false
        })
      }
      setGameState("results")
    } catch (error: any) {
      console.error("Error submitting quiz:", error)
      
      // Si alcanzó el límite de intentos, mostrar mensaje
      if (error.message?.includes('límite de 3 intentos')) {
        alert('❌ Has alcanzado el límite de 3 intentos para este quiz.\n\nYa no puedes enviar más puntajes.')
        router.push('/leaderboard')
      } else {
        alert('Error al enviar el quiz: ' + error.message)
      }
    }
  }

  // Reiniciar juego
  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setResult(null)
    setGuestMode(false)
    setGameState("welcome")
  }

  // Ir al leaderboard
  const handleViewLeaderboard = () => {
    router.push("/leaderboard")
  }

  // Loading
  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <ThreeScene intensity={1} />
        <div className="relative z-10 text-center">
          <div className="text-white text-2xl font-bold mb-4">Cargando quiz...</div>
          <div className="text-slate-400 text-sm">Conectando con el servidor...</div>
        </div>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <ThreeScene intensity={1} />
        <div className="relative z-10 max-w-md mx-auto bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 border border-red-500/30">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-4">Error de Conexión</h2>
            <p className="text-slate-300 mb-2">{error}</p>
            <p className="text-sm text-slate-400 mb-6">
              API URL: {process.env.NEXT_PUBLIC_API_URL || 'No configurada'}
            </p>
            <button
              onClick={() => {
                setError(null)
                setLoading(true)
                loadQuestions()
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              🔄 Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-slate-900">
      {/* Escena 3D de fondo (fija) */}
      <div className="fixed inset-0 pointer-events-none">
        <ThreeScene intensity={sceneIntensity} />
      </div>

      {/* Contenido principal con scroll */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-24">
        <AnimatePresence mode="wait">
          {gameState === "welcome" && (
            <WelcomeScreen
              onStart={handleStartGame}
              onGuestMode={handleStartGuestMode}
              showGuestOption={!user}
              categoryDistribution={getCategoryDistribution()}
              attemptsRemaining={attemptsRemaining}
            />
          )}

          {gameState === "playing" && questions[currentQuestionIndex] && (
            <QuizCard
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              answeredQuestions={answers.length}
            />
          )}

          {gameState === "results" && result && (
            <ResultsScreen
              score={result.score}
              totalQuestions={result.totalQuestions}
              code={result.code || ""}
              onRestart={handleRestart}
              onViewLeaderboard={handleViewLeaderboard}
              guestMode={result.guestMode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
