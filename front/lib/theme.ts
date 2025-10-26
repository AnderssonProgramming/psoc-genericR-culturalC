// Sistema de Diseño - Gender Quest
// Paleta de colores, tipografía, espaciado y animaciones

export const theme = {
  // Paleta de colores principal
  colors: {
    // Gradientes principales
    primary: {
      from: '#6366f1', // Indigo brillante
      via: '#8b5cf6',  // Violeta
      to: '#d946ef',   // Fucsia
      gradient: 'from-indigo-500 via-purple-500 to-fuchsia-500',
    },
    secondary: {
      from: '#14b8a6', // Teal
      via: '#06b6d4',  // Cyan
      to: '#3b82f6',   // Blue
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    },
    
    // Fondos oscuros con gradiente
    background: {
      dark: '#0f172a',      // Slate 900
      darker: '#020617',    // Slate 950
      card: '#1e293b',      // Slate 800
      cardHover: '#334155', // Slate 700
      gradient: 'from-slate-950 via-slate-900 to-slate-800',
    },
    
    // Textos con contraste
    text: {
      primary: '#f8fafc',   // Slate 50
      secondary: '#cbd5e1', // Slate 300
      muted: '#94a3b8',     // Slate 400
      accent: '#a78bfa',    // Violet 400
    },
    
    // Estados
    success: {
      main: '#10b981',  // Green 500
      light: '#34d399', // Green 400
      dark: '#059669',  // Green 600
    },
    error: {
      main: '#ef4444',  // Red 500
      light: '#f87171', // Red 400
      dark: '#dc2626',  // Red 600
    },
    warning: {
      main: '#f59e0b',  // Amber 500
      light: '#fbbf24', // Amber 400
      dark: '#d97706',  // Amber 600
    },
    
    // Glassmorphism
    glass: {
      bg: 'bg-white/5',
      border: 'border-white/10',
      hover: 'hover:bg-white/10',
      backdrop: 'backdrop-blur-xl',
    },
  },
  
  // Efectos de sombra
  shadows: {
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    glowHover: 'hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]',
    card: 'shadow-xl shadow-black/20',
    cardHover: 'hover:shadow-2xl hover:shadow-purple-500/20',
    inner: 'shadow-inner',
  },
  
  // Animaciones
  animations: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    scaleIn: 'animate-scale-in',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
  },
  
  // Transiciones
  transitions: {
    fast: 'transition-all duration-200 ease-out',
    normal: 'transition-all duration-300 ease-out',
    slow: 'transition-all duration-500 ease-out',
  },
  
  // Bordes redondeados
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full',
  },
  
  // Tipografía
  typography: {
    h1: 'text-5xl md:text-7xl font-black tracking-tight',
    h2: 'text-4xl md:text-5xl font-bold tracking-tight',
    h3: 'text-3xl md:text-4xl font-bold',
    h4: 'text-2xl md:text-3xl font-semibold',
    h5: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg',
    small: 'text-sm md:text-base',
  },
  
  // Espaciado
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
};

// Componentes de botones reutilizables
export const buttonStyles = {
  primary: `
    px-8 py-4 rounded-xl font-bold text-white
    bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500
    hover:from-indigo-600 hover:via-purple-600 hover:to-fuchsia-600
    shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50
    transform hover:scale-105 active:scale-95
    transition-all duration-300 ease-out
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%]
    hover:before:translate-x-[100%] before:transition-transform before:duration-700
  `,
  
  secondary: `
    px-8 py-4 rounded-xl font-bold
    bg-white/5 backdrop-blur-xl border border-white/10
    text-white hover:bg-white/10
    shadow-lg hover:shadow-xl
    transform hover:scale-105 active:scale-95
    transition-all duration-300 ease-out
  `,
  
  ghost: `
    px-6 py-3 rounded-lg font-semibold
    text-slate-300 hover:text-white
    hover:bg-white/5
    transition-all duration-200 ease-out
  `,
  
  icon: `
    p-3 rounded-lg
    bg-white/5 backdrop-blur-xl border border-white/10
    hover:bg-white/10 hover:border-white/20
    transform hover:scale-110 active:scale-95
    transition-all duration-200 ease-out
  `,
};

// Componentes de card reutilizables
export const cardStyles = {
  glass: `
    bg-white/5 backdrop-blur-xl border border-white/10
    rounded-2xl p-6
    shadow-xl shadow-black/20
    hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20
    transform hover:scale-105
    transition-all duration-300 ease-out
  `,
  
  solid: `
    bg-slate-800 border border-slate-700
    rounded-2xl p-6
    shadow-xl shadow-black/20
    hover:bg-slate-700 hover:border-slate-600
    transition-all duration-300 ease-out
  `,
  
  gradient: `
    bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10
    border border-white/10 backdrop-blur-xl
    rounded-2xl p-6
    shadow-xl shadow-purple-500/10
    hover:shadow-2xl hover:shadow-purple-500/20
    transition-all duration-300 ease-out
  `,
};

// Inputs estilizados
export const inputStyles = {
  base: `
    w-full px-4 py-3 rounded-xl
    bg-white/5 backdrop-blur-xl border border-white/10
    text-white placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
    hover:bg-white/10 hover:border-white/20
    transition-all duration-200 ease-out
  `,
  
  error: `
    border-red-500 focus:ring-red-500
  `,
  
  success: `
    border-green-500 focus:ring-green-500
  `,
};
