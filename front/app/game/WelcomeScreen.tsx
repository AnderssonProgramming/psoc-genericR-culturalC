"use client"

import { motion } from "framer-motion"

interface WelcomeScreenProps {
  onStart: () => void
  onGuestMode: () => void
  showGuestOption: boolean
  categoryDistribution: {
    Hogar: number
    Sociedad: number
    Profesional: number
  }
  attemptsRemaining?: number | null
}

export function WelcomeScreen({ onStart, onGuestMode, showGuestOption, categoryDistribution, attemptsRemaining }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Título principal */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 mb-4 drop-shadow-lg"
        >
          Roles de Género
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-white/80 font-medium"
        >
          Desafía tus percepciones y descubre nuevas perspectivas
        </motion.p>
      </div>

      {/* Tarjetas de categorías */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Hogar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="backdrop-blur-2xl bg-gradient-to-br from-green-900/80 to-emerald-800/60 rounded-3xl p-8 border-4 border-green-400/50 shadow-2xl"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🏡</div>
            <h3 className="text-3xl font-black text-white mb-2">Hogar</h3>
            <p className="text-green-200 text-sm mb-4">Roles en el ámbito doméstico</p>
            <div className="bg-green-500/30 rounded-full px-6 py-3 border-2 border-green-300/40">
              <span className="text-white font-bold text-2xl">{categoryDistribution.Hogar}</span>
              <span className="text-green-200 text-sm ml-2">preguntas</span>
            </div>
          </div>
        </motion.div>

        {/* Sociedad */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="backdrop-blur-2xl bg-gradient-to-br from-blue-900/80 to-cyan-800/60 rounded-3xl p-8 border-4 border-blue-400/50 shadow-2xl"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.1s' }}>🌍</div>
            <h3 className="text-3xl font-black text-white mb-2">Sociedad</h3>
            <p className="text-blue-200 text-sm mb-4">Roles en espacios públicos</p>
            <div className="bg-blue-500/30 rounded-full px-6 py-3 border-2 border-blue-300/40">
              <span className="text-white font-bold text-2xl">{categoryDistribution.Sociedad}</span>
              <span className="text-blue-200 text-sm ml-2">preguntas</span>
            </div>
          </div>
        </motion.div>

        {/* Profesional */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="backdrop-blur-2xl bg-gradient-to-br from-purple-900/80 to-fuchsia-800/60 rounded-3xl p-8 border-4 border-purple-400/50 shadow-2xl"
        >
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.2s' }}>💼</div>
            <h3 className="text-3xl font-black text-white mb-2">Profesional</h3>
            <p className="text-purple-200 text-sm mb-4">Roles en el trabajo</p>
            <div className="bg-purple-500/30 rounded-full px-6 py-3 border-2 border-purple-300/40">
              <span className="text-white font-bold text-2xl">{categoryDistribution.Profesional}</span>
              <span className="text-purple-200 text-sm ml-2">preguntas</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instrucciones */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border-2 border-white/20 mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📋</span> Instrucciones
        </h3>
        <ul className="space-y-3 text-white/90 text-lg">
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">1.</span>
            <span>Responde cada pregunta según tu opinión personal</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">2.</span>
            <span>Descubre información interesante después de cada respuesta</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 font-bold">3.</span>
            <span>Al finalizar, tu puntaje se guardará automáticamente en el ranking</span>
          </li>
        </ul>

        {/* Indicador de intentos restantes */}
        {attemptsRemaining !== null && attemptsRemaining !== undefined && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="text-white font-bold text-lg">Intentos Disponibles</p>
                  <p className="text-purple-300 text-sm">Cada usuario tiene máximo 3 intentos</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-black ${
                  attemptsRemaining === 0 ? 'text-red-400' :
                  attemptsRemaining === 1 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {attemptsRemaining}
                </p>
                <p className="text-white/70 text-sm">restantes</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Botones de acción */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <motion.button
          whileHover={attemptsRemaining !== 0 ? { scale: 1.05 } : {}}
          whileTap={attemptsRemaining !== 0 ? { scale: 0.95 } : {}}
          onClick={onStart}
          disabled={attemptsRemaining === 0}
          className={`w-full py-6 text-white font-black text-2xl rounded-2xl shadow-2xl border-4 transition-all ${
            attemptsRemaining === 0
              ? 'bg-gray-600 border-gray-500 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 border-white/30 hover:border-white/50'
          }`}
        >
          {attemptsRemaining === 0 ? '🚫 Sin Intentos Disponibles' : '🚀 Comenzar Quiz'}
        </motion.button>

        {showGuestOption && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGuestMode}
            className="w-full py-4 bg-white/10 backdrop-blur-lg text-white font-bold text-lg rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all"
          >
            👤 Modo Invitado
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
