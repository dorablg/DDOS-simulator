'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import DefenseVisualization from '@/components/DefenseVisualization'

export default function HowToDefend() {
  const [selectedDefense, setSelectedDefense] = useState('rateLimit')
  const [defenseEnabled, setDefenseEnabled] = useState(true)
  const [attackIntensity, setAttackIntensity] = useState(50)

  const defenseStrategies = [
    {
      id: 'rateLimit',
      name: 'Rate Limiting',
      icon: '🚦',
      description: 'Limits the number of requests from a single source',
      effectiveness: 'High against single-source attacks',
      implementation: [
        'Configure maximum requests per IP',
        'Set time window for rate counting',
        'Define rate limit thresholds',
        'Implement request queuing'
      ],
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 'firewall',
      name: 'Web Application Firewall',
      icon: '🛡️',
      description: 'Filters and monitors HTTP traffic',
      effectiveness: 'Very high against known attack patterns',
      implementation: [
        'Deploy WAF solution',
        'Configure attack detection rules',
        'Set up traffic analysis',
        'Enable automatic blocking'
      ],
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 'loadBalancer',
      name: 'Load Balancer',
      icon: '⚖️',
      description: 'Distributes traffic across multiple servers',
      effectiveness: 'Excellent for handling high traffic',
      implementation: [
        'Set up multiple server instances',
        'Configure load distribution',
        'Implement health checks',
        'Enable automatic scaling'
      ],
      color: 'from-green-500 to-green-700'
    }
  ]

  const currentDefense = defenseStrategies.find(d => d.id === selectedDefense)

  return (
    <>
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">How to Defend Against DoS Attacks</h1>
            <p className="text-gray-400">
              Learn and visualize different strategies to protect your servers from DoS attacks
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Defense Controls */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Defense Strategies</h2>
                
                <div className="space-y-4">
                  {/* Defense Type Selection */}
                  <div className="grid grid-cols-3 gap-2">
                    {defenseStrategies.map((defense) => (
                      <motion.button
                        key={defense.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDefense(defense.id)}
                        className={`p-3 rounded-lg ${
                          selectedDefense === defense.id
                            ? `bg-gradient-to-r ${defense.color} text-white`
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-2xl mb-1">{defense.icon}</div>
                        <div className="text-xs">{defense.name}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Defense Details */}
                  {currentDefense && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{currentDefense.icon}</span>
                        <span className="font-semibold">{currentDefense.name}</span>
                      </div>
                      <p className="text-sm mb-3">{currentDefense.description}</p>
                      <p className="text-sm text-green-400 mb-3">
                        Effectiveness: {currentDefense.effectiveness}
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Implementation Steps:</p>
                        {currentDefense.implementation.map((step, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <span className="mr-2">•</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Attack Intensity Control */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Simulated Attack Intensity: {attackIntensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={attackIntensity}
                      onChange={(e) => setAttackIntensity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Defense Toggle */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDefenseEnabled(!defenseEnabled)}
                    className={`w-full py-3 rounded-lg font-semibold ${
                      defenseEnabled
                        ? 'bg-gradient-to-r from-green-600 to-green-700'
                        : 'bg-gradient-to-r from-red-600 to-red-700'
                    }`}
                  >
                    <span className="mr-2">{defenseEnabled ? '🛡️' : '🚫'}</span>
                    {defenseEnabled ? 'Disable Defense' : 'Enable Defense'}
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
                <h2 className="text-2xl font-bold mb-6">Defense Visualization</h2>
                <DefenseVisualization
                  defenseType={selectedDefense}
                  enabled={defenseEnabled}
                  attackIntensity={attackIntensity}
                />

                {/* Additional Information */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      <span className="mr-2">🎯</span>
                      Detection
                    </h3>
                    <p className="text-sm">
                      Identifies malicious traffic patterns and suspicious behavior
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      <span className="mr-2">🛑</span>
                      Mitigation
                    </h3>
                    <p className="text-sm">
                      Blocks or limits traffic from identified attack sources
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      <span className="mr-2">📈</span>
                      Recovery
                    </h3>
                    <p className="text-sm">
                      Maintains service availability during and after attacks
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="mr-2">1️⃣</span>
                  Monitor Traffic
                </h3>
                <p className="text-sm text-gray-300">
                  Implement continuous monitoring to detect unusual traffic patterns
                  and potential attacks early.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="mr-2">2️⃣</span>
                  Scale Resources
                </h3>
                <p className="text-sm text-gray-300">
                  Use auto-scaling and load balancing to handle traffic spikes
                  and maintain service availability.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="mr-2">3️⃣</span>
                  Filter Traffic
                </h3>
                <p className="text-sm text-gray-300">
                  Deploy firewalls and rate limiting to filter out malicious
                  traffic while allowing legitimate requests.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="mr-2">4️⃣</span>
                  Incident Response
                </h3>
                <p className="text-sm text-gray-300">
                  Have a well-documented incident response plan ready to
                  execute when attacks are detected.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
