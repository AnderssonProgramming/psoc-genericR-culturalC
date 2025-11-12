'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api';

interface LeaderboardStats {
  totalPlayers: number;
  totalGamesPlayed: number;
  averageScore: number;
}

export default function Home() {
  const [stats, setStats] = useState<LeaderboardStats>({
    totalPlayers: 0,
    totalGamesPlayed: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
              <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                ✨ Plataforma Educativa Innovadora
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Gender Quest
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aprende sobre <span className="text-purple-400 font-semibold">roles de género</span> jugando.
              Compite, explora contenido educativo y chatea con nuestra{' '}
              <span className="text-fuchsia-400 font-semibold">IA especializada</span>.
            </p>

            {/* Info Box */}
            <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-purple-400 font-bold">✨ ¿Nuevo aquí?</span> Puedes jugar como invitado para probar el quiz, 
                o <span className="text-white font-semibold">crear una cuenta gratis</span> para guardar tu puntaje y competir en el ranking global.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/game"
                className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                🎮 Jugar Quiz 3D
              </Link>
              
              <Link
                href="/sections"
                className="px-8 py-4 rounded-xl font-bold bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                📚 Explorar Contenido
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">👥</span>
              <span className="text-2xl">📈</span>
            </div>
            <p className="text-5xl font-black text-white mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {loading ? '...' : stats.totalPlayers.toLocaleString()}
            </p>
            <p className="text-slate-400 font-medium">Jugadores Registrados</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🎮</span>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-5xl font-black text-white mb-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              {loading ? '...' : stats.totalGamesPlayed.toLocaleString()}
            </p>
            <p className="text-slate-400 font-medium">Partidas Completadas</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🏆</span>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-5xl font-black text-white mb-2 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {loading ? '...' : Math.round(stats.averageScore).toLocaleString()}
            </p>
            <p className="text-slate-400 font-medium">Puntaje Promedio</p>
          </motion.div>
        </div>
      </section>

      {/* Open Source Banner */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 via-fuchsia-900/50 to-purple-900/50 backdrop-blur-xl border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/20"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-4 py-2 mb-4"
              >
                <span className="text-2xl">🌟</span>
                <span className="text-purple-300 font-bold text-sm uppercase tracking-wider">Open Source</span>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Proyecto de{' '}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Código Abierto
                </span>
              </h3>
              
              <p className="text-slate-300 text-lg mb-6 max-w-2xl">
                Esta es una plataforma educativa desarrollada con tecnologías modernas. 
                Explora el código, aprende de la implementación y contribuye si lo deseas.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <span className="text-xl">⚛️</span>
                  <span className="text-white font-semibold text-sm">Next.js</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <span className="text-xl">🎨</span>
                  <span className="text-white font-semibold text-sm">Three.js</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <span className="text-xl">🚀</span>
                  <span className="text-white font-semibold text-sm">NestJS</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                  <span className="text-xl">🗄️</span>
                  <span className="text-white font-semibold text-sm">PostgreSQL</span>
                </div>
              </div>
            </div>
            
            <motion.a
              href="https://github.com/AnderssonProgramming/psoc-genericR-culturalC"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-2xl px-8 py-5 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <motion.svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </motion.svg>
              <div className="text-left">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Visitar Repositorio</p>
                <p className="text-xl font-black">GitHub →</p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ¿Qué incluye{' '}
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Gender Quest
            </span>
            ?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Una experiencia completa que combina educación, gamificación y tecnología de IA
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-4">Juego Inmersivo</h3>
            <p className="text-slate-300 leading-relaxed">
              Explora <span className="text-purple-400 font-semibold">3 mundos</span> (Hogar, Trabajo, Social) 
              y responde preguntas sobre roles de género.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-4">Ranking Global</h3>
            <p className="text-slate-300 leading-relaxed">
              Compite con otros jugadores y sube en el{' '}
              <span className="text-fuchsia-400 font-semibold">leaderboard</span> con actualizaciones en tiempo real.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-white mb-4">Chatbot AI</h3>
            <p className="text-slate-300 leading-relaxed">
              Conversa con nuestra <span className="text-pink-400 font-semibold">IA especializada</span> para 
              profundizar conceptos y resolver dudas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-slate-400 text-lg">
              Sigue estos 4 pasos simples para comenzar
            </p>
          </div>

          <div className="space-y-6">
            {[
              { step: 1, title: 'Juega en tu Navegador', desc: 'No necesitas descargar nada. Juega directamente desde tu navegador web.', icon: '🌐' },
              { step: 2, title: 'Responde 10 Preguntas', desc: 'Explora el espacio 3D y responde preguntas sobre roles de género en el hogar, sociedad y lo profesional.', icon: '🎮' },
              { step: 3, title: 'Tu Puntaje Guardado', desc: 'Al terminar, tu puntaje se registra automáticamente en el ranking. ¡Compite con otros jugadores!', icon: '🏆' },
              { step: 4, title: 'Consulta el Ranking', desc: 'Revisa tu posición y compara tus resultados con la comunidad.', icon: '📈' },
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ scale: 1.02, x: 10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex gap-6 items-start hover:bg-white/10 transition-all"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center font-black text-2xl text-white shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-12 text-center shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Únete a la comunidad de Gender Quest y aprende sobre roles de género
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:bg-purple-50 shadow-xl transform hover:scale-105 transition-all"
              >
                Crear Cuenta Gratis
              </Link>
              <Link
                href="/leaderboard"
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 shadow-xl transform hover:scale-105 transition-all"
              >
                Ver Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-slate-400 text-sm">
                © 2025 Gender Quest. Plataforma educativa para los roles de género.
              </p>
              <a 
                href="https://github.com/AnderssonProgramming/psoc-genericR-culturalC" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-105 group"
              >
                <svg 
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">Código Abierto</span> en GitHub
                </span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="flex gap-6">
              <Link href="/sections" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contenido
              </Link>
              <Link href="/leaderboard" className="text-slate-400 hover:text-white transition-colors text-sm">
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
