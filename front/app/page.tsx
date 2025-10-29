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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Gender Quest. Plataforma educativa para los roles de género.
            </p>
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
