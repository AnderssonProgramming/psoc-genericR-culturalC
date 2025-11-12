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
  const [tempName, setTempName] = useState(''); // Nombre temporal mientras escribe
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameConfirmed, setNameConfirmed] = useState(false); // Nuevo estado para controlar si confirmó
  const [showQR, setShowQR] = useState(false);
  const { user } = useAuth();

  // Determinar el nombre a mostrar
  const displayName = user?.username || guestName || 'visitante';
  const isAuthenticated = !!user;

  // Resetear estados al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      setGuestName('');
      setTempName('');
      setShowNameInput(false);
      setNameConfirmed(false);
      setShowQR(false);
    }
  }, [isOpen]);

  // Función para confirmar el nombre
  const confirmName = () => {
    if (tempName.trim()) {
      setGuestName(tempName.trim());
    } else {
      setGuestName('visitante');
    }
    setNameConfirmed(true);
    setShowNameInput(false);
  };

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
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 hover:scale-110 transition-all duration-300"
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        title="Escanear desde móvil"
      >
        <QrCode className="w-5 h-5 sm:w-6 sm:h-6" />
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
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 overflow-y-auto"
              onClick={() => setIsOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-purple-500/30 max-w-md w-full my-auto max-h-[95vh] overflow-y-auto"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />
                <div className="absolute -top-20 -right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl" />

                {/* Header */}
                <div className="relative flex justify-between items-center p-2.5 sm:p-3 md:p-4 border-b border-white/10">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 flex items-center gap-1.5 sm:gap-2">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
                      ¡Comparte Gender Quest!
                    </h3>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-400">
                      Escanea y comparte con tu comunidad
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Mensaje Motivacional Personalizado */}
                <div className="relative px-2.5 sm:px-3 md:px-4 pt-2.5 sm:pt-3 md:pt-4">
                  {!showQR ? (
                    <>
                      {!isAuthenticated && !nameConfirmed && !showNameInput ? (
                        /* Invitación a personalizar el mensaje */
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-2.5 sm:mb-3"
                        >
                          <div className="flex items-start gap-1.5 sm:gap-2">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] sm:text-xs text-white font-semibold mb-1">
                                💫 Personaliza tu mensaje
                              </p>
                              <p className="text-[9px] sm:text-[10px] text-slate-300 mb-1.5 sm:mb-2">
                                ¡Ingresa tu nombre para un saludo personalizado!
                              </p>
                              <button
                                onClick={() => setShowNameInput(true)}
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-semibold rounded-md sm:rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                              >
                                Agregar mi nombre
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}

                      {!isAuthenticated && showNameInput && !nameConfirmed ? (
                        /* Input para nombre de invitado */
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-2.5 sm:mb-3"
                        >
                          <div className="flex items-start gap-1.5 sm:gap-2">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <label className="block text-[11px] sm:text-xs text-white font-semibold mb-1 sm:mb-1.5">
                                ¿Cómo te llamas?
                              </label>
                              <div className="flex gap-1.5">
                                <input
                                  type="text"
                                  value={tempName}
                                  onChange={(e) => setTempName(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      confirmName();
                                    }
                                  }}
                                  placeholder="Tu nombre"
                                  className="flex-1 px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs bg-slate-800/50 border border-purple-500/30 rounded-md sm:rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all"
                                  maxLength={30}
                                  autoFocus
                                />
                                <button
                                  onClick={confirmName}
                                  className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-md sm:rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
                                >
                                  ✓
                                </button>
                              </div>
                              <p className="text-[8px] sm:text-[9px] text-slate-400 mt-0.5 sm:mt-1">
                                Presiona ✓ o Enter cuando termines
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}

                      {(isAuthenticated || nameConfirmed) && (
                        /* Mensaje motivacional personalizado */
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-gradient-to-br from-purple-600/20 via-fuchsia-600/20 to-pink-600/20 backdrop-blur-xl border-2 border-purple-400/40 rounded-lg sm:rounded-xl p-2.5 sm:p-3 mb-2.5 sm:mb-3 shadow-xl"
                        >
                          <div className="flex items-start gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg animate-pulse">
                              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5">
                                ¡Hola {displayName}! 👋
                              </h4>
                              <div className="h-0.5 w-10 sm:w-12 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full"></div>
                            </div>
                          </div>
                          
                          <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-200 leading-relaxed mb-1.5 sm:mb-2">
                            Quisimos explorar el tema sobre los <strong className="text-purple-300">roles de género</strong> y lo más importante es que queremos compartirlo con la{' '}
                            <strong className="text-fuchsia-300">comunidad de la universidad</strong> y otras personas que quieran saber más del tema.
                          </p>
                          
                          <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-white/20">
                            <p className="text-[9px] sm:text-[10px] md:text-xs text-white font-semibold mb-1 sm:mb-1.5 flex items-center gap-1 sm:gap-1.5">
                              <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                              Con el código QR puedes:
                            </p>
                            <ul className="space-y-0.5 sm:space-y-1 text-[9px] sm:text-[10px] text-slate-300">
                              <li className="flex items-start gap-1 sm:gap-1.5">
                                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                                <span>Acceder desde tu celular fácilmente</span>
                              </li>
                              <li className="flex items-start gap-1 sm:gap-1.5">
                                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                                <span>Compartir con tus amigos y familiares</span>
                              </li>
                              <li className="flex items-start gap-1 sm:gap-1.5">
                                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                                <span>Ayudar a difundir información importante</span>
                              </li>
                            </ul>
                          </div>

                          <div className="mt-1.5 sm:mt-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] text-slate-400">
                            <span className="inline-block w-1 h-1 rounded-full bg-purple-400"></span>
                            <span className="italic text-center">¡No olvides compartir esta información!</span>
                            <span className="inline-block w-1 h-1 rounded-full bg-purple-400"></span>
                          </div>
                        </motion.div>
                      )}

                      {/* Botón para ver QR - solo aparece después del mensaje */}
                      {(isAuthenticated || nameConfirmed) && (
                        <div className="pb-2.5 sm:pb-3 flex justify-center">
                          <button
                            onClick={() => setShowQR(true)}
                            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs sm:text-sm font-bold hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50 flex items-center gap-1.5 sm:gap-2"
                          >
                            <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                            Ver Código QR
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Mostrar QR después de leer el mensaje */
                    <>
                      {/* QR Code */}
                      <div className="relative pb-2.5 sm:pb-3 flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', duration: 0.5 }}
                          className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-2xl ring-2 ring-purple-500/20"
                        >
                          <QRCode
                            id="qr-code-svg"
                            value={url}
                            size={140}
                            level="H"
                            bgColor="#ffffff"
                            fgColor="#000000"
                            className="sm:w-[160px] sm:h-[160px]"
                          />
                        </motion.div>

                        <div className="mt-2.5 sm:mt-3 text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-1.5 text-purple-400 mb-0.5 sm:mb-1">
                            <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            <span className="font-semibold text-[11px] sm:text-xs">¿Cómo escanear?</span>
                          </div>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 max-w-xs leading-relaxed px-2">
                            Abre la cámara de tu teléfono y enfoca el código QR
                          </p>
                        </div>

                        {/* Botón para volver al mensaje */}
                        <button
                          onClick={() => setShowQR(false)}
                          className="mt-2.5 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[11px] sm:text-xs font-semibold hover:bg-white/10 transition-all"
                        >
                          ← Volver al mensaje
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Footer - solo visible cuando se muestra el QR */}
                {showQR && (
                  <>
                    <div className="relative p-2.5 sm:p-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={downloadQR}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-[11px] sm:text-xs font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all transform hover:scale-105 active:scale-95"
                      >
                        <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Descargar QR
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="flex-1 px-3 py-2 rounded-md sm:rounded-lg bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[11px] sm:text-xs font-semibold hover:bg-white/10 transition-all"
                      >
                        Cerrar
                      </button>
                    </div>

                    {/* URL Display */}
                    <div className="relative px-2.5 sm:px-3 pb-2.5 sm:pb-3">
                      <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-md sm:rounded-lg p-1.5 sm:p-2">
                        <p className="text-[8px] sm:text-[9px] text-slate-400 mb-0.5">URL del código QR:</p>
                        <p className="text-[9px] sm:text-[10px] text-purple-400 font-mono break-all">
                          {url}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
