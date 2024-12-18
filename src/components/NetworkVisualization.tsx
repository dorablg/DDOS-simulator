'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface NetworkVisualizationProps {
  mode: string
  requestRate?: number
  attackers?: number
}

interface Packet {
  id: number
  x: number
  y: number
  type: 'normal' | 'attack' | 'defense'
  status: 'pending' | 'blocked' | 'success'
}

interface Attacker {
  id: number
  x: number
  y: number
  angle: number
  type: string
}

const NetworkVisualization = ({ mode, requestRate = 50, attackers = 10 }: NetworkVisualizationProps) => {
  const [packets, setPackets] = useState<Packet[]>([])
  const [attackerNodes, setAttackerNodes] = useState<Attacker[]>([])
  const [serverHealth, setServerHealth] = useState(100)
  const [explanationText, setExplanationText] = useState('')

  // Get attack type icon
  const getAttackIcon = (type: string) => {
    switch (type) {
      case 'syn':
        return '🌊'
      case 'udp':
        return '🌪️'
      case 'http':
        return '🌩️'
      default:
        return '👤'
    }
  }

  // Initialize attackers
  useEffect(() => {
    const newAttackers = Array.from({ length: attackers }, (_, i) => {
      const angle = (i * (360 / attackers)) * (Math.PI / 180)
      const radius = 45 // Distance from center
      return {
        id: i,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        angle,
        type: mode
      }
    })
    setAttackerNodes(newAttackers)
  }, [attackers, mode])

  // Generate packet from attacker
  const generatePacket = (attacker: Attacker): Packet => {
    const jitter = (Math.random() - 0.5) * 10 // Add some randomness to packet position
    return {
      id: Math.random(),
      x: attacker.x + jitter,
      y: attacker.y + jitter,
      type: mode === 'normal' ? 'normal' : 'attack',
      status: 'pending'
    }
  }

  useEffect(() => {
    // Update explanation based on mode
    switch (mode) {
      case 'syn':
        setExplanationText('SYN Flood Attack: Sending multiple TCP connection requests without completing the handshake')
        break
      case 'udp':
        setExplanationText('UDP Flood Attack: Overwhelming the server with UDP packets to random ports')
        break
      case 'http':
        setExplanationText('HTTP Flood Attack: Sending numerous HTTP requests to exhaust server resources')
        break
      case 'normal':
        setExplanationText('Normal Traffic: Regular server requests and responses')
        break
    }

    // Packet generation interval based on request rate
    const packetInterval = setInterval(() => {
      setPackets(prev => {
        const newPackets = [...prev]
        
        // Remove packets that reached the center
        const filtered = newPackets.filter(p => {
          const dx = 50 - p.x
          const dy = 50 - p.y
          return Math.sqrt(dx * dx + dy * dy) > 5
        })

        // Add new packets based on request rate and attackers
        const packetsPerInterval = Math.ceil(requestRate / 20) // Adjust packet generation rate
        
        if (mode !== 'normal') {
          // Generate packets from random attackers
          for (let i = 0; i < packetsPerInterval; i++) {
            const randomAttacker = attackerNodes[Math.floor(Math.random() * attackerNodes.length)]
            if (randomAttacker) {
              filtered.push(generatePacket(randomAttacker))
            }
          }
        } else {
          // Generate normal traffic
          filtered.push(generatePacket({
            id: Math.random(),
            x: 50 + Math.cos(Math.random() * Math.PI * 2) * 45,
            y: 50 + Math.sin(Math.random() * Math.PI * 2) * 45,
            angle: Math.random() * Math.PI * 2,
            type: 'normal'
          }))
        }

        // Update packet positions
        return filtered.map(packet => {
          const dx = 50 - packet.x
          const dy = 50 - packet.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 5) {
            const speed = requestRate / 50 // Speed based on request rate
            return {
              ...packet,
              x: packet.x + (dx / distance) * speed,
              y: packet.y + (dy / distance) * speed
            }
          }
          return packet
        })
      })

      // Update server health based on attack intensity
      if (mode !== 'normal') {
        setServerHealth(prev => Math.max(0, prev - (attackers * requestRate * 0.001)))
      } else {
        setServerHealth(prev => Math.min(100, prev + 0.5))
      }
    }, 50)

    return () => clearInterval(packetInterval)
  }, [mode, attackers, requestRate])

  return (
    <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
      {/* Explanation Text */}
      <div className="absolute top-4 left-4 right-4 bg-gray-700 p-3 rounded-lg z-10">
        <p className="text-sm text-gray-200">{explanationText}</p>
      </div>

      {/* Server Health Bar */}
      <div className="absolute top-16 left-4 right-4">
        <div className="text-sm text-gray-300 mb-1">Server Health: {Math.round(serverHealth)}%</div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              backgroundColor: serverHealth > 70 ? '#10B981' : serverHealth > 30 ? '#F59E0B' : '#EF4444',
              width: `${serverHealth}%`
            }}
            animate={{ width: `${serverHealth}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Network Visualization */}
      <div className="absolute inset-0 mt-24">
        {/* Server Icon */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          animate={{
            scale: [1, 1.1, 1],
            borderColor: serverHealth > 50 ? "#10B981" : "#EF4444"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>

        {/* Attackers */}
        <AnimatePresence>
          {attackerNodes.map((attacker) => (
            <motion.div
              key={attacker.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${attacker.x}%`,
                top: `${attacker.y}%`,
                zIndex: 10
              }}
            >
              <div className="text-2xl">
                {getAttackIcon(attacker.type)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Packets */}
        <AnimatePresence>
          {packets.map((packet) => (
            <motion.div
              key={packet.id}
              className={`absolute w-2 h-2 rounded-full ${
                packet.type === 'normal' 
                  ? 'bg-blue-500' 
                  : packet.type === 'attack'
                    ? 'bg-red-500'
                    : 'bg-green-500'
              }`}
              style={{
                left: `${packet.x}%`,
                top: `${packet.y}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: 1
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Attack Type Indicators */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
          <span className="text-sm text-gray-300">Normal Traffic</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span className="text-sm text-gray-300">Attack Packets</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="text-sm text-gray-300">Defense Measures</span>
        </div>
      </div>

      {/* Request Rate Indicator */}
      <div className="absolute top-4 right-4 bg-gray-700 px-3 py-1 rounded-full">
        <span className="text-sm text-gray-300">{requestRate} req/s</span>
      </div>
    </div>
  )
}

export default NetworkVisualization
