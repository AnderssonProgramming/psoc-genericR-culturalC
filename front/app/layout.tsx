import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import FloatingChatbot from '@/components/FloatingChatbot';

export const metadata: Metadata = {
  title: 'Gender Quest - Plataforma Educativa sobre Roles de Género',
  description: 'Juego educativo interactivo y plataforma web para aprender sobre roles de género, estereotipos y equidad.',
  keywords: 'educación, género, roles, equidad, juego educativo',
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
        </AuthProvider>
      </body>
    </html>
  );
}
