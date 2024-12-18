'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  onStartGame: (mode: 'attack' | 'defense') => void
}

const HeroSection = ({ onStartGame }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8"
        >
          DoS Attack Simulator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-12 text-gray-300"
        >
          Experience the thrill of cyber warfare in a safe environment
        </motion.p>
        <div className="flex space-x-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('attack')}
            className="px-8 py-4 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Attack Mode
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartGame('defense')}
            className="px-8 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Defense Mode
          </motion.button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/grid.svg")',
          backgroundSize: '50px 50px',
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}

export default HeroSection
