'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Importar QuizGameClient con Three.js usando dynamic import
const QuizGameClient = dynamic(() => import('./QuizGameClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <div className="text-white text-2xl font-bold">Cargando experiencia 3D...</div>
        <div className="text-gray-400 text-sm mt-2">Preparando el universo de preguntas 🌌</div>
      </div>
    </div>
  ),
});

export default function GamePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <div className="text-white text-2xl font-bold">Inicializando...</div>
        </div>
      </div>
    );
  }

  return <QuizGameClient />;
}
