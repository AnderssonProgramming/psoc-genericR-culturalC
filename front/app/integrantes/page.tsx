'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Users } from 'lucide-react';

const integrantes = [
  {
    carrera: 'Profesora',
    icon: '👩‍🏫',
    color: 'from-amber-500 to-orange-500',
    miembros: ['María Ignacia Castañeda Garay'],
  },
  {
    carrera: 'Economía',
    icon: '📊',
    color: 'from-yellow-500 to-amber-500',
    miembros: [
      'Laura Alejandra Trujillo Bastidas',
      'Nicol Gabriela Moreno Lesmes',
      'Rafael Santiago Moreno Velásquez',
      'Santiago Galarza Rosas',
    ].sort(),
  },
  {
    carrera: 'Ingeniería Ambiental',
    icon: '🌿',
    color: 'from-green-500 to-emerald-500',
    miembros: [
      'Ingrid Alexandra García Ballesteros',
      'Laura Juanita Mesa Latorre',
      'Mariana Astrid Villamil Núñez',
    ].sort(),
  },
  {
    carrera: 'Ingeniería Civil',
    icon: '🏗️',
    color: 'from-blue-500 to-cyan-500',
    miembros: [
      'Andrés Felipe Garzón Tinjaca',
      'David Santiago Charry Reinoso',
      'Hector Styd Mejía Rodríguez',
      'Jhon Felipe Fajardo Mosquera',
      'Juan Diego Pineda Parra',
      'Laura Valentina Riveros Sequera',
      'Pedro Samuel Iglesias Serrano',
    ].sort(),
  },
  {
    carrera: 'Ingeniería de Sistemas',
    icon: '�',
    color: 'from-purple-500 to-fuchsia-500',
    miembros: [
      'Andersson David Sánchez Méndez',
      'Cristian Santiago Pedraza Rodríguez',
      'Javier Mauricio Romero Deaquiz',
      'Jose Miguel Vargas Gallego',
      'Juan David Parroquiano Roldán',
      'Julian Felipe Morales Zambrano',
      'Oscar Daniel López Cruz',
      'Pablo Andrés Gualdrón Lindo',
    ].sort(),
  },
  {
    carrera: 'Ingeniería Electrónica',
    icon: '🔌',
    color: 'from-indigo-500 to-blue-500',
    miembros: [
      'John Alejandro Martínez González',
      'Maikol Julian Pulido Bautista',
    ].sort(),
  },
  {
    carrera: 'Ingeniería Estadística',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    miembros: ['Ehtlin Valentina Caro Sánchez'],
  },
  {
    carrera: 'Ingeniería Industrial',
    icon: '🏭',
    color: 'from-orange-500 to-red-500',
    miembros: ['Hansel Yamit Carreño Valdés'],
  },
  {
    carrera: 'Ingeniería Mecánica',
    icon: '⚙️',
    color: 'from-slate-500 to-gray-600',
    miembros: [
      'Fabian Daniel Gutiérrez González',
      'Jorge Luis Saltaren Pérez',
      'Juan Ángel Ramírez Quinche',
      'Juan Nicolas Vásquez Ortiz',
      'María Alejandra Gómez Sandoval',
    ].sort(),
  },
];

export default function IntegrantesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pt-24 pb-16 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 mb-12 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Users className="w-14 h-14 text-purple-400 drop-shadow-lg" />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-2xl">
            Integrantes
          </h1>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-14 h-14 text-fuchsia-400 drop-shadow-lg" />
          </motion.div>
        </div>
        <p className="text-slate-300 text-xl max-w-3xl mx-auto font-medium">
          Equipo multidisciplinario comprometido con la <span className="text-purple-400 font-bold">equidad de género</span> y la{' '}
          <span className="text-fuchsia-400 font-bold">inclusión</span>
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <p className="text-sm text-slate-300">
            Universidad Escuela Colombiana De Ingeniería <span className="font-bold text-white">Julio Garavito</span>
          </p>
        </div>
      </motion.div>

      {/* Grid de Carreras */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrantes.map((grupo, index) => (
            <motion.div
              key={grupo.carrera}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group"
            >
              <div className="bg-slate-900/70 backdrop-blur-xl border-2 border-white/10 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 h-full relative overflow-hidden">
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Header del grupo */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grupo.color} flex items-center justify-center text-3xl shadow-2xl ring-4 ring-white/10`}
                  >
                    {grupo.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-1">{grupo.carrera}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${grupo.color} animate-pulse`}></div>
                      <p className="text-sm text-slate-400 font-medium">
                        {grupo.miembros.length} {grupo.miembros.length === 1 ? 'miembro' : 'miembros'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Línea divisoria con gradiente */}
                <div className={`h-1 bg-gradient-to-r ${grupo.color} rounded-full mb-6 shadow-lg`}></div>

                {/* Lista de miembros */}
                <div className="space-y-3 relative z-10">
                  {grupo.miembros.map((miembro) => (
                    <motion.div
                      key={miembro}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-slate-300 hover:text-white transition-all group/item bg-white/0 hover:bg-white/5 p-2 rounded-lg"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${grupo.color} mt-2 group-hover/item:scale-150 group-hover/item:shadow-lg transition-all`}
                      ></div>
                      <p className="text-sm leading-relaxed font-medium">{miembro}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Decoración de fondo */}
                <div
                  className={`absolute -top-2 -right-2 w-32 h-32 bg-gradient-to-br ${grupo.color} opacity-10 rounded-full blur-3xl group-hover:opacity-30 group-hover:scale-150 transition-all duration-500`}
                ></div>
                <div
                  className={`absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-tr ${grupo.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-10 bg-slate-900/70 backdrop-blur-xl border-2 border-white/20 rounded-3xl px-12 py-6 shadow-2xl shadow-purple-500/20">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <p className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {integrantes.reduce((acc, grupo) => acc + grupo.miembros.length, 0)}
              </p>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Total Integrantes</p>
            </motion.div>
            
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <p className="text-5xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                {integrantes.length - 1}
              </p>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Carreras</p>
            </motion.div>
            
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-12 h-12 text-amber-400 drop-shadow-lg" />
              </motion.div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Universidad Escuela</p>
                <p className="text-sm text-slate-300 font-medium">Colombiana De Ingeniería</p>
                <p className="text-xs text-purple-400 font-bold">Julio Garavito</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
