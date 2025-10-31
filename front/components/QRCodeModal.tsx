'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Download, Smartphone } from 'lucide-react';
import QRCode from 'react-qr-code';

interface QRCodeModalProps {
  url?: string;
}

export default function QRCodeModal({ url = 'https://psoc-generic-r-cultural-c.vercel.app/' }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

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
                <div className="relative flex justify-between items-center p-4 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">
                      Escanea el código QR
                    </h3>
                    <p className="text-xs text-slate-400">
                      Accede desde tu móvil
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* QR Code */}
                <div className="relative p-6 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-4 rounded-xl shadow-xl"
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
                    <div className="flex items-center justify-center gap-2 text-purple-400 mb-1.5">
                      <Smartphone className="w-4 h-4" />
                      <span className="font-semibold text-sm">¿Cómo funciona?</span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Abre la cámara de tu teléfono, enfoca el código QR y accede directamente a Gender Quest
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
