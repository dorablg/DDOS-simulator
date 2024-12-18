'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import NetworkVisualization from './NetworkVisualization'
import Footer from './Footer'

interface Level {
  name: string
  description: string
  difficulty: string
  objective: string
}

interface MultiplayerMode {
  name: string
  description: string
  players: string
}

interface Challenge {
  name: string
  description: string
  reward: string
}

interface GameModes {
  singlePlayer: {
    title: string
    levels: Level[]
  }
  multiplayer: {
    title: string
    modes: MultiplayerMode[]
  }
  challenges: {
    title: string
    events: Challenge[]
  }
}

const GameModesPage = () => {
  const [selectedMode, setSelectedMode] = useState<keyof GameModes | null>(null)

  const gameModes: GameModes = {
    singlePlayer: {
      title: 'Single Player',
      levels: [
        {
          name: 'Basic Training',
          description: 'Learn the basics of DoS attacks and defense mechanisms',
          difficulty: 'Easy',
          objective: 'Complete the tutorial and defend against basic attacks'
        },
        {
          name: 'Advanced Tactics',
          description: 'Face more sophisticated attack patterns',
          difficulty: 'Medium',
          objective: 'Maintain server health above 70% for 5 minutes'
        },
        {
          name: 'Expert Challenge',
          description: 'Master complex attack combinations and defense strategies',
          difficulty: 'Hard',
          objective: 'Survive a multi-vector attack scenario'
        }
      ]
    },
    multiplayer: {
      title: 'Multiplayer',
      modes: [
        {
          name: 'Team Defense',
          description: 'Work together to protect critical infrastructure',
          players: '2-4 players'
        },
        {
          name: 'Attack vs Defense',
          description: 'Compete in real-time - one team attacks, the other defends',
          players: '2-6 players'
        }
      ]
    },
    challenges: {
      title: 'Special Challenges',
      events: [
        {
          name: 'Weekly Tournament',
          description: 'Compete for the top spot on the leaderboard',
          reward: '1000 bonus credits'
        },
        {
          name: 'Speed Defense',
          description: 'How long can you survive against increasingly powerful attacks?',
          reward: 'Unique defender badge'
        }
      ]
    }
  }

  const renderContent = (key: keyof GameModes) => {
    const mode = gameModes[key]

    switch (key) {
      case 'singlePlayer':
        return (
          <div className="space-y-4">
            {mode.levels.map((level, index) => (
              <div key={index} className="border border-gray-700 rounded p-3">
                <h3 className="font-semibold text-green-400">{level.name}</h3>
                <p className="text-sm text-gray-300">{level.description}</p>
                <div className="mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {level.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'multiplayer':
        return (
          <div className="space-y-4">
            {mode.modes.map((mode, index) => (
              <div key={index} className="border border-gray-700 rounded p-3">
                <h3 className="font-semibold text-blue-400">{mode.name}</h3>
                <p className="text-sm text-gray-300">{mode.description}</p>
                <div className="mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {mode.players}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'challenges':
        return (
          <div className="space-y-4">
            {mode.events.map((event, index) => (
              <div key={index} className="border border-gray-700 rounded p-3">
                <h3 className="font-semibold text-purple-400">{event.name}</h3>
                <p className="text-sm text-gray-300">{event.description}</p>
                <div className="mt-2">
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                    Reward: {event.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Game Modes
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {(Object.entries(gameModes) as [keyof GameModes, any][]).map(([key, mode]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer"
              onClick={() => setSelectedMode(key)}
            >
              <h2 className="text-2xl font-bold mb-4">{mode.title}</h2>
              {renderContent(key)}
            </motion.div>
          ))}
        </div>

        {selectedMode && (
          <div className="mt-12">
            <NetworkVisualization mode={selectedMode} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default GameModesPage
