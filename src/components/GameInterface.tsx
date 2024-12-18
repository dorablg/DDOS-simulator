'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const GameInterface = () => {
  const [attackStrength, setAttackStrength] = useState(50)
  const [activeDefenses, setActiveDefenses] = useState({
    firewall: false,
    loadBalancer: false,
    rateLimit: false
  })

  const defenseTypes = {
    firewall: {
      name: 'Firewall',
      icon: '🛡️',
      description: 'Blocks malicious traffic',
      effectiveness: 30
    },
    loadBalancer: {
      name: 'Load Balancer',
      icon: '⚖️',
      description: 'Distributes traffic load',
      effectiveness: 20
    },
    rateLimit: {
      name: 'Rate Limiter',
      icon: '🚦',
      description: 'Controls traffic flow',
      effectiveness: 25
    }
  }

  const calculateProtection = () => {
    return Object.entries(activeDefenses).reduce((total, [key, isActive]) => {
      return total + (isActive ? defenseTypes[key as keyof typeof defenseTypes].effectiveness : 0)
    }, 0)
  }

  const toggleDefense = (defense: keyof typeof activeDefenses) => {
    setActiveDefenses(prev => ({
      ...prev,
      [defense]: !prev[defense]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Attack Strength</h2>
              <input
                type="range"
                min="0"
                max="100"
                value={attackStrength}
                onChange={(e) => setAttackStrength(parseInt(e.target.value))}
                className="w-full mb-2"
              />
              <div className="text-right text-gray-400">
                {attackStrength}%
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Defense Mechanisms</h2>
              <div className="space-y-4">
                {Object.entries(defenseTypes).map(([key, defense]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleDefense(key as keyof typeof activeDefenses)}
                    className={`w-full p-4 rounded-lg flex items-center justify-between ${
                      activeDefenses[key as keyof typeof activeDefenses]
                        ? 'bg-blue-600'
                        : 'bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{defense.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold">{defense.name}</div>
                        <div className="text-sm text-gray-300">
                          {defense.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      +{defense.effectiveness}%
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visualization */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Server Status</h2>
              
              {/* Protection Level */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Protection Level</h3>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${calculateProtection()}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-400 mt-1">
                  {calculateProtection()}%
                </div>
              </div>

              {/* Server Load */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Server Load</h3>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: `${Math.max(0, Math.min(100, attackStrength - calculateProtection()))}%` 
                    }}
                  />
                </div>
                <div className="text-right text-sm text-gray-400 mt-1">
                  {Math.max(0, Math.min(100, attackStrength - calculateProtection()))}%
                </div>
              </div>

              {/* Status Message */}
              <div className="text-center p-4 rounded-lg bg-gray-700">
                {calculateProtection() >= attackStrength ? (
                  <div className="text-green-400">
                    Server is protected! 🎉
                  </div>
                ) : (
                  <div className="text-red-400">
                    Server is under stress! ⚠️
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameInterface
