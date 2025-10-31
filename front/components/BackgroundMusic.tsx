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
      <div className="fixed bottom-6 left-6 z-40 flex gap-3">
        <button
          onClick={togglePlay}
          className="p-4 bg-slate-800/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl hover:bg-slate-700/90 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 group"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <svg 
              className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors ml-0.5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-4 bg-slate-800/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl hover:bg-slate-700/90 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-slate-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-purple-400" />
            )}
          </button>
        )}
      </div>
    </>
  );
}
