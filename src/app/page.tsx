'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GameInterface from '@/components/GameInterface'

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

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'howToPlay' | 'game'>('home')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentView === 'home' && (
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center z-10">
            <AttackIcon />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-8"
            >
              DDoS Attack Simulator
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-12 text-gray-300"
            >
              Learn about distributed cyber attacks through simulation
            </motion.p>

            <div className="flex flex-col space-y-4 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('game')}
                className="px-8 py-4 w-64 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Simulation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('howToPlay')}
                className="px-8 py-4 w-64 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                How to Play
              </motion.button>
            </div>
          </div>

          {/* Grid Background */}
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
      )}

      {currentView === 'howToPlay' && (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full bg-gray-800 rounded-lg p-8 relative z-10"
          >
            <h2 className="text-3xl font-bold mb-6">How to Play</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  Objective
                </h3>
                <p className="text-gray-300">
                  Learn about DDoS attacks and defense mechanisms through an interactive simulation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="mr-2">🎮</span>
                  Controls
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Adjust attack strength using the slider</li>
                  <li>Toggle different defense mechanisms</li>
                  <li>Monitor server health and response times</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="mr-2">💡</span>
                  Tips
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Start with lower attack rates to understand the basics</li>
                  <li>Experiment with different defense combinations</li>
                  <li>Watch how each defense mechanism affects the attack</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('home')}
                className="px-8 py-4 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </motion.button>
            </div>
          </motion.div>

          {/* Grid Background */}
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
      )}

      {currentView === 'game' && (
        <div className="relative">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('home')}
            className="absolute top-4 right-4 px-6 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition-colors z-50"
          >
            Exit Simulation
          </motion.button>
          <GameInterface />
        </div>
      )}
    </div>
  )
}
