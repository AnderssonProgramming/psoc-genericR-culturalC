'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volumen bajo (30%)
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        loop
        src="/ambient-music.mp3"
      />
      
      {/* Control de audio flotante */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        <button
          onClick={togglePlay}
          className="p-3 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-full hover:bg-slate-700/90 transition-all shadow-lg hover:shadow-xl group"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-400 rounded animate-pulse"></div>
              <div className="w-1 h-4 bg-purple-400 rounded animate-pulse delay-100"></div>
              <div className="w-1 h-4 bg-purple-400 rounded animate-pulse delay-200"></div>
            </div>
          ) : (
            <div className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors">▶</div>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-3 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-full hover:bg-slate-700/90 transition-all shadow-lg hover:shadow-xl"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-purple-400" />
            )}
          </button>
        )}
      </div>
    </>
  );
}
