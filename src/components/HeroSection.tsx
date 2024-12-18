'use client'

import { motion } from 'framer-motion'

interface HeroSectionProps {
  onStartGame: (mode: 'attack' | 'defense') => void
}

const AttackIcon = () => {
  const particleCount = 8
  const particles = Array.from({ length: particleCount })

  return (
    <motion.div
      className="relative w-24 h-24 mx-auto mb-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Shield */}
      <motion.div
        className="absolute inset-0 bg-blue-500 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.4)',
            '0 0 0 20px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-4xl">🛡️</span>
      </motion.div>

      {/* Attack Particles */}
      {particles.map((_, index) => {
        const angle = (index / particleCount) * Math.PI * 2
        return (
          <motion.div
            key={index}
            className="absolute w-3 h-3 bg-red-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [
                0,
                Math.cos(angle) * 60,
                Math.cos(angle) * 30,
              ],
              y: [
                0,
                Math.sin(angle) * 60,
                Math.sin(angle) * 30,
              ],
              scale: [1, 0.8, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: index * 0.1,
            }}
          />
        )
      })}
    </motion.div>
  )
}

const HeroSection = ({ onStartGame }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center">
        <AttackIcon />
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
