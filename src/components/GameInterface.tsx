'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GameInterfaceProps {
  mode: 'attack' | 'defense'
  onExit: () => void
}

const GameInterface = ({ mode, onExit }: GameInterfaceProps) => {
  const [serverHealth, setServerHealth] = useState(100)
  const [credits, setCredits] = useState(1000)
  const [activeTools, setActiveTools] = useState<string[]>([])
  const [logs, setLogs] = useState<string[]>([])

  const attackTools = [
    { id: 'syn-flood', name: 'SYN Flood', cost: 200, damage: 10 },
    { id: 'udp-flood', name: 'UDP Flood', cost: 300, damage: 15 },
    { id: 'http-flood', name: 'HTTP Flood', cost: 400, damage: 20 },
  ]

  const defenseTools = [
    { id: 'firewall', name: 'Firewall', cost: 200, protection: 10 },
    { id: 'rate-limiter', name: 'Rate Limiter', cost: 300, protection: 15 },
    { id: 'load-balancer', name: 'Load Balancer', cost: 400, protection: 20 },
  ]

  const addLog = (message: string) => {
    setLogs(prev => [message, ...prev].slice(0, 5))
  }

  const handleToolClick = (tool: any) => {
    if (credits >= tool.cost) {
      setCredits(prev => prev - tool.cost)
      setActiveTools(prev => [...prev, tool.id])
      
      if (mode === 'attack') {
        setServerHealth(prev => Math.max(0, prev - tool.damage))
        addLog(`Launched ${tool.name} attack! Server health decreased by ${tool.damage}%`)
      } else {
        setServerHealth(prev => Math.min(100, prev + tool.protection))
        addLog(`Deployed ${tool.name}! Server protection increased by ${tool.protection}%`)
      }
    }
  }

  return (
    <div className="min-h-screen pt-16 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Tools</h2>
          <div className="space-y-3">
            {(mode === 'attack' ? attackTools : defenseTools).map((tool) => (
              <motion.button
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToolClick(tool)}
                className={`w-full p-3 rounded-lg ${
                  credits >= tool.cost
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
                disabled={credits < tool.cost}
              >
                {tool.name} ({tool.cost} credits)
              </motion.button>
            ))}
          </div>
        </div>

        {/* Center Panel */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="mb-6">
            <h3 className="text-lg mb-2">Server Health</h3>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <motion.div
                className={`h-full rounded-full ${
                  serverHealth > 50 ? 'bg-green-500' : 'bg-red-500'
                }`}
                initial={{ width: '100%' }}
                animate={{ width: `${serverHealth}%` }}
              />
            </div>
            <p className="text-center mt-2">{serverHealth}%</p>
          </div>
          <div>
            <h3 className="text-lg mb-2">Credits</h3>
            <p className="text-2xl font-bold">{credits}</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Activity Log</h2>
          <div className="space-y-2">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-2 bg-gray-700 rounded"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onExit}
        className="fixed bottom-4 right-4 px-6 py-3 bg-red-600 rounded-lg"
      >
        Exit Game
      </motion.button>
    </div>
  )
}

export default GameInterface
