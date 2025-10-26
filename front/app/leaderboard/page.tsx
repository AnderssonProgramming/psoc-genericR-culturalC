'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { formatRelativeTime } from '@/lib/utils';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [myRank, setMyRank] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
    loadMyRank();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await apiClient.getLeaderboard(50);
      setLeaderboard(data);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMyRank = async () => {
    try {
      const rank = await apiClient.getMyRank();
      setMyRank(rank);
    } catch (err) {
      // User not logged in or no scores
      console.log('No rank data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4">
            🏆 Ranking Global
          </h1>
          <p className="text-lg text-purple-200">
            Los mejores jugadores de Gender Quest
          </p>
        </div>

        {/* Tu Posición */}
        {myRank && (
          <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-slate-900 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-purple-300 mb-4">Tu Posición</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                    #{myRank.rank}
                  </p>
                  <p className="text-sm text-purple-300 mt-1">Posición actual</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white">{myRank.score} pts</p>
                  <p className="text-sm text-purple-300 mt-1">Precisión: {myRank.accuracy}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent"></div>
            <p className="mt-4 text-purple-300 text-lg">Cargando ranking...</p>
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">
                      Posición
                    </th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm uppercase tracking-wider">
                      Jugador
                    </th>
                    <th className="px-6 py-4 text-right text-white font-bold text-sm uppercase tracking-wider">
                      Puntaje
                    </th>
                    <th className="px-6 py-4 text-right text-white font-bold text-sm uppercase tracking-wider">
                      Precisión
                    </th>
                    <th className="px-6 py-4 text-right text-white font-bold text-sm uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {leaderboard.map((entry) => (
                    <tr
                      key={entry.rank}
                      className="hover:bg-white/5 transition-all duration-200"
                    >
                      <td className="px-6 py-5">
                        <span className={`font-black text-2xl ${
                          entry.rank === 1 ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' :
                          entry.rank === 2 ? 'text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]' :
                          entry.rank === 3 ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]' :
                          'text-purple-300'
                        }`}>
                          {entry.rank === 1 && '🥇'}
                          {entry.rank === 2 && '🥈'}
                          {entry.rank === 3 && '🥉'}
                          {entry.rank > 3 && `#${entry.rank}`}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                            {entry.username[0].toUpperCase()}
                          </div>
                          <span className="font-bold text-white text-lg">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                          {entry.score}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg">
                          {entry.accuracy}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-sm text-purple-300 font-medium">
                          {formatRelativeTime(entry.submittedAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>

          {/* Empty State */}
          {leaderboard.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-purple-300 mb-2">No hay puntajes aún</p>
              <p className="text-purple-400">¡Sé el primero en jugar y aparecer en el ranking!</p>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
