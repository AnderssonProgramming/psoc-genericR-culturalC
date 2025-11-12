'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Download, Smartphone, User, Sparkles } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useAuth } from '@/lib/auth-context';

interface QRCodeModalProps {
  url?: string;
}

export default function QRCodeModal({ url = 'https://psoc-generic-r-cultural-c.vercel.app/' }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const { user } = useAuth();

  // Determinar el nombre a mostrar
  const displayName = user?.username || guestName || 'visitante';
  const isAuthenticated = !!user;

  // Resetear el nombre de invitado al cerrar el modal
  useEffect(() => {
    if (!isOpen && !isAuthenticated) {
      setGuestName('');
      setShowNameInput(false);
    }
  }, [isOpen, isAuthenticated]);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      if (!ctx) return;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 512, 512);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'gender-quest-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <>
      {/* Floating QR Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 hover:scale-110 transition-all duration-300"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        title="Escanear desde móvil"
      >
        <QrCode className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setIsOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 max-w-sm w-full overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />
                <div className="absolute -top-20 -right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl" />

                {/* Header */}
                <div className="relative flex justify-between items-center p-4 sm:p-6 border-b border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
                      ¡Comparte Gender Quest!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Escanea y comparte con tu comunidad
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mensaje Motivacional Personalizado */}
                <div className="relative px-4 sm:px-6 pt-4 sm:pt-6">
                  {!isAuthenticated && !guestName && !showNameInput ? (
                    /* Invitación a personalizar el mensaje */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 mb-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-semibold mb-2">
                            💫 Personaliza tu experiencia
                          </p>
                          <p className="text-xs text-slate-300 mb-3">
                            ¿Quieres un mensaje personalizado? ¡Ingresa tu nombre!
                          </p>
                          <button
                            onClick={() => setShowNameInput(true)}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                          >
                            Agregar mi nombre
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {!isAuthenticated && showNameInput && !guestName ? (
                    /* Input para nombre de invitado */
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 mb-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm text-white font-semibold mb-2">
                            ¿Cómo te llamas?
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="Tu nombre (opcional)"
                              className="flex-1 px-3 py-2 text-sm bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                              maxLength={30}
                            />
                            <button
                              onClick={() => {
                                if (!guestName.trim()) {
                                  setGuestName('visitante');
                                }
                                setShowNameInput(false);
                              }}
                              className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95"
                            >
                              ✓
                            </button>
                          </div>
                          <p className="text-xs text-slate-400 mt-2">
                            Opcional - presiona ✓ para continuar sin nombre
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}

                  {(isAuthenticated || guestName) && (
                    /* Mensaje motivacional personalizado */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-purple-600/20 via-fuchsia-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-purple-400/40 rounded-2xl p-4 sm:p-5 mb-4 shadow-xl"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg animate-pulse">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                            ¡Hola {displayName}! 👋
                          </h4>
                          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full mb-2"></div>
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                        Quisimos explorar el tema sobre los <strong className="text-purple-300">roles de género</strong> y lo más importante es que queremos compartirlo con la{' '}
                        <strong className="text-fuchsia-300">comunidad de la universidad</strong> y otras personas que quieran saber más del tema.
                      </p>
                      
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <p className="text-xs sm:text-sm text-white font-semibold mb-2 flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-purple-400" />
                          Con el código QR puedes:
                        </p>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Acceder desde tu celular fácilmente</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Compartir con tus amigos y familiares</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                            <span>Ayudar a difundir información importante</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <span className="inline-block w-1 h-1 rounded-full bg-purple-400"></span>
                        <span className="italic">¡No olvides compartir esta información con todas las personas que desees!</span>
                        <span className="inline-block w-1 h-1 rounded-full bg-purple-400"></span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* QR Code */}
                <div className="relative px-4 sm:px-6 pb-4 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-4 sm:p-5 rounded-2xl shadow-2xl ring-4 ring-purple-500/20"
                  >
                    <QRCode
                      id="qr-code-svg"
                      value={url}
                      size={180}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </motion.div>

                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="font-semibold text-sm">¿Cómo escanear?</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                      Abre la cámara de tu teléfono, enfoca el código QR y accede directamente a <span className="text-purple-400 font-semibold">Gender Quest</span>
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative p-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={downloadQR}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-sm font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar QR
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                  >
                    Cerrar
                  </button>
                </div>

                {/* URL Display */}
                <div className="relative px-4 pb-4">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-lg p-2.5">
                    <p className="text-[10px] text-slate-400 mb-0.5">URL del código QR:</p>
                    <p className="text-xs text-purple-400 font-mono break-all">
                      {url}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
