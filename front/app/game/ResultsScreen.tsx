"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  code: string
  onRestart: () => void
  onViewLeaderboard: () => void
  guestMode: boolean
}

export function ResultsScreen({ score, totalQuestions, code, onRestart, onViewLeaderboard, guestMode }: ResultsScreenProps) {
  const [codeCopied, setCodeCopied] = useState(false)
  const percentage = Math.round((score / totalQuestions) * 100)

  const getScoreMessage = () => {
    if (percentage === 100) return { text: "¡Perfecto! 🌟", color: "from-yellow-400 to-amber-500" }
    if (percentage >= 80) return { text: "¡Excelente! 🎉", color: "from-green-400 to-emerald-500" }
    if (percentage >= 60) return { text: "¡Muy bien! 👏", color: "from-blue-400 to-cyan-500" }
    if (percentage >= 40) return { text: "¡Buen intento! 💪", color: "from-purple-400 to-fuchsia-500" }
    return { text: "¡Sigue intentando! 🌱", color: "from-pink-400 to-rose-500" }
  }

  const message = getScoreMessage()

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Título de resultados */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 mb-4 drop-shadow-lg">
          ¡Quiz Completado!
        </h1>
        <p className="text-xl text-white/80 font-medium">
          Aquí están tus resultados
        </p>
      </motion.div>

      {/* Tarjeta de puntuación */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", duration: 0.7 }}
        className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 border-4 border-white/30 shadow-2xl mb-8"
      >
        {/* Mensaje de puntuación */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${message.color} mb-2`}>
            {message.text}
          </h2>
        </motion.div>

        {/* Círculo de puntuación */}
        <div className="flex justify-center items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", duration: 0.8 }}
            className="relative w-64 h-64"
          >
            {/* Círculo de fondo */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="20"
                fill="none"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="110"
                stroke="url(#gradient)"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 110}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 110 * (1 - percentage / 100) }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Texto central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-7xl font-black text-white"
              >
                {percentage}%
              </motion.div>
              <div className="text-white/70 text-xl font-semibold">
                {score} / {totalQuestions}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Confirmación y código de referencia */}
        {!guestMode && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-4"
          >
            {/* Confirmación principal */}
            <div className="bg-gradient-to-r from-green-900/40 via-emerald-900/40 to-teal-900/40 rounded-2xl p-5 border-2 border-green-400/30">
              <div className="text-center">
                <p className="text-green-400 text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  ✅ ¡Ya estás en el ranking!
                </p>
                <p className="text-white/80 text-base">
                  Tu puntaje ha sido registrado exitosamente
                </p>
              </div>
            </div>

            {/* Código de referencia (discreto) */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-white/60 text-xs font-medium mb-1">
                    Código de referencia:
                  </p>
                  <code className="text-lg font-mono font-bold text-white/90 tracking-wider">
                    {code}
                  </code>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all text-sm font-medium text-white/80"
                >
                  {codeCopied ? (
                    <span className="flex items-center gap-1">✓ Copiado</span>
                  ) : (
                    <span className="flex items-center gap-1">📋 Copiar</span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {guestMode && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-2xl p-6 border-2 border-amber-400/30 text-center"
          >
            <p className="text-amber-200 text-lg font-semibold mb-2">
              👤 Modo Invitado
            </p>
            <p className="text-white/70">
              Tu puntuación no se guardará en el ranking. Inicia sesión para competir con otros usuarios.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Botones de acción */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {!guestMode && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewLeaderboard}
            className="flex-1 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white font-black text-xl rounded-2xl shadow-2xl border-4 border-white/30 hover:border-white/50 transition-all"
          >
            🏆 Ver Ranking
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="flex-1 py-5 bg-white/10 backdrop-blur-lg text-white font-bold text-xl rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all"
        >
          🔄 Jugar de Nuevo
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
