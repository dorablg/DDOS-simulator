'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface DefenseVisualizationProps {
  defenseType: string
  enabled: boolean
  attackIntensity: number
}

interface Packet {
  id: number
  x: number
  y: number
  type: 'normal' | 'attack' | 'blocked'
}

const DefenseVisualization = ({ defenseType, enabled, attackIntensity }: DefenseVisualizationProps) => {
  const [packets, setPackets] = useState<Packet[]>([])
  const [defenseEffectiveness, setDefenseEffectiveness] = useState(100)
  const [blockedCount, setBlockedCount] = useState(0)

  // Calculate defense effectiveness based on type and attack intensity
  const calculateEffectiveness = () => {
    if (!enabled) return 0
    
    switch (defenseType) {
      case 'rateLimit':
        return Math.max(0, 100 - (attackIntensity * 0.5))
      case 'firewall':
        return Math.max(0, 90 - (attackIntensity * 0.3))
      case 'loadBalancer':
        return Math.max(0, 95 - (attackIntensity * 0.2))
      default:
        return 0
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPackets(prev => {
        const newPackets = [...prev]
        
        // Remove old packets
        const filtered = newPackets.filter(p => {
          const dx = 50 - p.x
          const dy = 50 - p.y
          return Math.sqrt(dx * dx + dy * dy) > 5
        })

        // Add new attack packets
        const effectiveness = calculateEffectiveness()
        const newPacketCount = Math.ceil(attackIntensity / 10)
        
        for (let i = 0; i < newPacketCount; i++) {
          const angle = Math.random() * Math.PI * 2
          const isBlocked = Math.random() * 100 < effectiveness
          
          if (isBlocked) {
            setBlockedCount(prev => prev + 1)
          }

          filtered.push({
            id: Math.random(),
            x: 50 + Math.cos(angle) * 45,
            y: 50 + Math.sin(angle) * 45,
            type: isBlocked ? 'blocked' : 'attack'
          })
        }

        // Update packet positions
        return filtered.map(packet => {
          if (packet.type === 'blocked') return packet

          const dx = 50 - packet.x
          const dy = 50 - packet.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 5) {
            const speed = 2
            return {
              ...packet,
              x: packet.x + (dx / distance) * speed,
              y: packet.y + (dy / distance) * speed
            }
          }
          return packet
        })
      })

      setDefenseEffectiveness(calculateEffectiveness())
    }, 50)

    return () => clearInterval(interval)
  }, [defenseType, enabled, attackIntensity])

  // Get defense mechanism icon
  const getDefenseIcon = () => {
    switch (defenseType) {
      case 'rateLimit':
        return '🚦'
      case 'firewall':
        return '🛡️'
      case 'loadBalancer':
        return '⚖️'
      default:
        return '🔒'
    }
  }

  return (
    <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
      {/* Defense Status */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getDefenseIcon()}</span>
          <span className="text-sm font-medium">
            {enabled ? 'Defense Active' : 'Defense Disabled'}
          </span>
        </div>
        <div className="bg-gray-700 px-3 py-1 rounded-full">
          <span className="text-sm">
            Effectiveness: {Math.round(defenseEffectiveness)}%
          </span>
        </div>
      </div>

      {/* Defense Visualization */}
      <div className="absolute inset-0 mt-16">
        {/* Defense Shield */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: enabled ? [1, 1.1, 1] : 1,
            opacity: enabled ? 1 : 0.3
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-32 h-32 rounded-full border-4 ${
            enabled ? 'border-blue-500' : 'border-gray-600'
          }`} />
        </motion.div>

        {/* Server */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🖥️</span>
          </div>
        </motion.div>

        {/* Packets */}
        <AnimatePresence>
          {packets.map((packet) => (
            <motion.div
              key={packet.id}
              className={`absolute w-3 h-3 rounded-full ${
                packet.type === 'normal' 
                  ? 'bg-blue-500' 
                  : packet.type === 'blocked'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
              style={{
                left: `${packet.x}%`,
                top: `${packet.y}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: packet.type === 'blocked' ? [1, 0] : [0.4, 1, 0.4],
                scale: packet.type === 'blocked' ? [1, 1.5, 0] : 1,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
        <div>Blocked Attacks: {blockedCount}</div>
        <div>Attack Intensity: {attackIntensity}%</div>
      </div>
    </div>
  )
}

export default DefenseVisualization
