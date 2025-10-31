import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import FloatingChatbot from '@/components/FloatingChatbot';
import BackgroundMusic from '@/components/BackgroundMusic';
import QRCodeModal from '@/components/QRCodeModal';

export const metadata: Metadata = {
  title: 'Gender Quest - Plataforma Educativa sobre Roles de Género',
  description: 'Juego educativo interactivo y plataforma web para aprender sobre roles de género, estereotipos y equidad.',
  keywords: 'educación, género, roles, equidad, juego educativo',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#7c3aed',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <AuthProvider>
          <NavBar />
          
          {/* Main Content with padding for fixed navbar */}
          <main className="pt-20">
            {children}
          </main>

          {/* Floating Chatbot - Available globally */}
          <FloatingChatbot />
          
          {/* Background Music */}
          <BackgroundMusic />

          {/* QR Code Modal - Available globally */}
          <QRCodeModal />
        </AuthProvider>
      </body>
    </html>
  );
}
