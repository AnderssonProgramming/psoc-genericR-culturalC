"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  feedback: string
  intention: string
}

interface QuizCardProps {
  question: Question
  onAnswer: (answer: string) => void
  questionNumber: number
  totalQuestions: number
  answeredQuestions: number
  elapsedTime?: number // Tiempo transcurrido en segundos (solo para usuarios autenticados)
}

export function QuizCard({ question, onAnswer, questionNumber, totalQuestions, answeredQuestions, elapsedTime }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Formatear tiempo en mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const answer = question.options[answerIndex]

    setTimeout(() => {
      onAnswer(answer)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }, 4000)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hogar':
        return {
          from: 'from-green-600',
          to: 'to-emerald-500',
          bg: 'bg-green-500',
          border: 'border-green-400',
          text: 'text-green-300',
          gradient: 'from-green-900/90 to-emerald-800/70',
          buttonGradient: 'from-green-600 to-emerald-500',
          emoji: '🏡'
        }
      case 'Sociedad':
        return {
          from: 'from-blue-600',
          to: 'to-cyan-500',
          bg: 'bg-blue-500',
          border: 'border-blue-400',
          text: 'text-blue-300',
          gradient: 'from-blue-900/90 to-cyan-800/70',
          buttonGradient: 'from-blue-600 to-cyan-500',
          emoji: '🌍'
        }
      case 'Profesional':
        return {
          from: 'from-purple-600',
          to: 'to-fuchsia-500',
          bg: 'bg-purple-500',
          border: 'border-purple-400',
          text: 'text-purple-300',
          gradient: 'from-purple-900/90 to-fuchsia-800/70',
          buttonGradient: 'from-purple-600 to-fuchsia-500',
          emoji: '💼'
        }
      default:
        return {
          from: 'from-purple-600',
          to: 'to-fuchsia-500',
          bg: 'bg-purple-500',
          border: 'border-purple-400',
          text: 'text-purple-300',
          gradient: 'from-purple-900/90 to-fuchsia-800/70',
          buttonGradient: 'from-purple-600 to-fuchsia-500',
          emoji: '⭐'
        }
    }
  }

  const colors = getCategoryColor(question.category)

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -50 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={`backdrop-blur-2xl rounded-3xl border-4 shadow-2xl overflow-hidden ${colors.border}`}
    >
      {/* Banner de categoría superior */}
      <div className={`px-8 py-6 flex items-center justify-between bg-gradient-to-r ${colors.from} ${colors.to}`}>
        <div className="flex items-center gap-4">
          <span className="text-5xl animate-bounce">{colors.emoji}</span>
          <div>
            <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">Categoría</div>
            <div className="text-white font-black text-3xl uppercase tracking-wider drop-shadow-lg">
              {question.category}
            </div>
          </div>
        </div>
        <div className="text-white font-bold text-xl bg-white/30 px-5 py-3 rounded-2xl backdrop-blur-sm border-2 border-white/40">
          {questionNumber} / {totalQuestions}
        </div>
      </div>

      {/* Contenido de la pregunta */}
      <div className={`p-8 bg-gradient-to-br ${colors.gradient}`}>
        {/* Temporizador - Solo para usuarios autenticados */}
        {elapsedTime !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-2 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20"
          >
            <span className="text-2xl">⏱️</span>
            <div className="text-white">
              <div className="text-xs font-semibold opacity-70">Tiempo transcurrido</div>
              <div className="text-2xl font-black tabular-nums">{formatTime(elapsedTime)}</div>
            </div>
          </motion.div>
        )}

        {/* Pregunta */}
        <h2 className="text-3xl font-black text-white mb-6 leading-tight">
          {question.question}
        </h2>

        {/* Opciones */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            
            return (
              <motion.button
                key={index}
                whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-5 rounded-2xl font-bold text-lg transition-all relative overflow-hidden
                  ${isSelected
                    ? `bg-gradient-to-r ${colors.buttonGradient} shadow-2xl border-2 border-white/30 text-white scale-105`
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
            )
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ height: 0, opacity: 0, scale: 0.9 }}
              animate={{ height: 'auto', opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.4 }}
              className={`rounded-2xl p-6 border-2 bg-${question.category === 'Hogar' ? 'green' : question.category === 'Sociedad' ? 'blue' : 'purple'}-500/20 ${colors.border}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">💡</div>
                <div>
                  <p className="text-white font-semibold text-lg mb-2">¿Sabías que...?</p>
                  <p className="text-white/90 leading-relaxed">{question.feedback}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra de progreso */}
        <div className="mt-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${colors.from} ${colors.to}`}
              initial={{ width: 0 }}
              animate={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
