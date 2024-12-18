'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import NetworkVisualization from '@/components/NetworkVisualization'

export default function Simulation() {
  const [attackType, setAttackType] = useState<string>('syn')
  const [requestRate, setRequestRate] = useState<number>(50)
  const [attackers, setAttackers] = useState<number>(10)
  const [isAttacking, setIsAttacking] = useState<boolean>(false)

  const attackTypes = [
    { 
      id: 'syn', 
      name: 'SYN Flood',
      icon: '🌊',
      description: 'Exploits TCP handshake by sending many SYN requests without completing the connection',
      impact: 'Exhausts server connection pool, preventing legitimate connections',
      defense: 'SYN cookies, connection timeouts, rate limiting',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      id: 'udp', 
      name: 'UDP Flood',
      icon: '🌪️',
      description: 'Sends large numbers of UDP packets to random ports',
      impact: 'Consumes bandwidth and processing power',
      defense: 'Traffic filtering, rate limiting per IP',
      color: 'from-purple-500 to-purple-700'
    },
    { 
      id: 'http', 
      name: 'HTTP Flood',
      icon: '🌩️',
      description: 'Overwhelms web server with numerous HTTP requests',
      impact: 'Server becomes unresponsive to legitimate requests',
      defense: 'Web application firewall, request rate limiting',
      color: 'from-red-500 to-red-700'
    },
  ]

  const currentAttack = attackTypes.find(a => a.id === attackType)

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          DoS Attack Simulation
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Attack Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Attack Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {attackTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAttackType(type.id)}
                        className={`p-3 rounded-lg ${
                          attackType === type.id
                            ? `bg-gradient-to-r ${type.color} text-white`
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-xs">{type.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {currentAttack && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-700 p-4 rounded-lg text-sm"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{currentAttack.icon}</span>
                      <span className="font-semibold">{currentAttack.name}</span>
                    </div>
                    <p className="mb-2">{currentAttack.description}</p>
                    <p className="text-red-400 mb-2">
                      <span className="font-semibold">Impact:</span> {currentAttack.impact}
                    </p>
                    <p className="text-green-400">
                      <span className="font-semibold">Defense:</span> {currentAttack.defense}
                    </p>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Request Rate: {requestRate} req/s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={requestRate}
                    onChange={(e) => setRequestRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Higher request rates increase server load faster
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Attackers: {attackers}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={attackers}
                    onChange={(e) => setAttackers(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    More attackers make the attack harder to mitigate
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAttacking(!isAttacking)}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    isAttacking 
                      ? 'bg-gradient-to-r from-red-600 to-red-700' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700'
                  }`}
                >
                  <span className="mr-2">{isAttacking ? '🛑' : '▶️'}</span>
                  {isAttacking ? 'Stop Attack' : 'Start Attack'}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Visualization */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <NetworkVisualization 
                mode={isAttacking ? attackType : 'normal'}
                requestRate={requestRate}
                attackers={attackers}
              />
            </motion.div>
          </div>
        </div>

        {/* Metrics Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              <span className="mr-2">📊</span>
              Server Load
            </h3>
            <div className="text-3xl font-bold text-red-400">
              {isAttacking ? `${Math.min(99, Math.round(attackers * requestRate / 100))}%` : '23%'}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Percentage of server resources being used
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              <span className="mr-2">⏱️</span>
              Response Time
            </h3>
            <div className="text-3xl font-bold text-yellow-400">
              {isAttacking ? `${((attackers * requestRate) / 1000 + 0.1).toFixed(1)}s` : '0.1s'}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Time taken to respond to requests
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              <span className="mr-2">❌</span>
              Failed Requests
            </h3>
            <div className="text-3xl font-bold text-green-400">
              {isAttacking ? `${Math.min(99, Math.round(attackers * requestRate / 150))}%` : '0%'}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Percentage of requests that failed
            </p>
          </div>
        </motion.div>

        {/* Attack Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="mr-2">1️⃣</span>
                Attack Initiation
              </h3>
              <p className="text-gray-300 text-sm">
                Multiple attackers send requests simultaneously to overwhelm the server.
                The red dots represent malicious requests.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="mr-2">2️⃣</span>
                Server Impact
              </h3>
              <p className="text-gray-300 text-sm">
                As requests accumulate, server resources are consumed, leading to slower
                response times and failed legitimate requests.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="mr-2">3️⃣</span>
                Defense Measures
              </h3>
              <p className="text-gray-300 text-sm">
                The server attempts to filter and block suspicious traffic patterns.
                Green dots represent defensive measures being activated.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
