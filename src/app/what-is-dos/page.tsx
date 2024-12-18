'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import DDoSVisualization from '@/components/DDoSVisualization'

export default function WhatIsDoS() {
  const [attackIntensity, setAttackIntensity] = useState(50)
  const [selectedAttackType, setSelectedAttackType] = useState('syn')
  const [showDefense, setShowDefense] = useState(false)
  const [selectedAttackIndex, setSelectedAttackIndex] = useState(0)

  const attackTypes = [
    {
      id: 'syn',
      name: 'SYN Flood',
      icon: '🔄',  // Network connection cycling
      description: 'Overwhelms a server by sending a flood of incomplete connection requests.',
      impact: 'High',
      countermeasures: 'SYN cookies, connection timeouts, rate limiting'
    },
    {
      id: 'udp',
      name: 'UDP Flood',
      icon: '📡',  // Broadcasting/transmission
      description: 'Sends massive amounts of User Datagram Protocol packets to random ports.',
      impact: 'Medium',
      countermeasures: 'Traffic filtering, rate limiting per IP'
    },
    {
      id: 'http',
      name: 'HTTP Flood',
      icon: '🌐',  // Web/global network
      description: 'Mimics legitimate web traffic to overload web servers.',
      impact: 'High',
      countermeasures: 'Web application firewall, request rate limiting'
    },
    {
      id: 'pod',
      name: 'Ping of Death',
      icon: '⚡',  // System crash/power
      description: 'Sends oversized packets that crash the target system.',
      impact: 'Medium',
      countermeasures: 'Packet size validation, firewall rules'
    },
    {
      id: 'botnet',
      name: 'Botnet Attack',
      icon: '🔗',  // Connected network/chain
      description: 'Uses thousands of hijacked devices to launch coordinated attacks.',
      impact: 'Very High',
      countermeasures: 'DDoS mitigation services, traffic analysis'
    }
  ]

  const defenseTools = [
    {
      id: 'firewall',
      name: 'Firewall',
      icon: '🛡️',  // Shield for protection
      description: 'Filters and monitors incoming network traffic.',
      demonstration: (
        <div className="mt-2 p-2 bg-gray-900 rounded">
          <div className="flex items-center gap-2 text-sm">
            <span>🔵 Normal Traffic</span>
            <span className="text-green-500">✓ Allowed</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>🔴 Malicious Traffic</span>
            <span className="text-red-500">✕ Blocked</span>
          </div>
        </div>
      )
    },
    {
      id: 'ratelimit',
      name: 'Rate Limiting',
      icon: '🚫',  // Stop sign for limiting
      description: 'Restricts the number of requests from a single source.',
      demonstration: (
        <div className="mt-2 p-2 bg-gray-900 rounded">
          <div className="flex flex-col gap-1">
            <div className="text-xs">Requests per minute:</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-20 bg-green-500 rounded"></div>
              <span className="text-xs">Normal (✓)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-40 bg-red-500 rounded"></div>
              <span className="text-xs">Excessive (✕)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'loadbalancer',
      name: 'Load Balancer',
      icon: '⚖️',  // Balance scales
      description: 'Distributes traffic across multiple servers.',
      demonstration: (
        <div className="mt-2 p-2 bg-gray-900 rounded">
          <div className="flex justify-between items-center">
            <span>🌐</span>
            <div className="flex flex-col gap-1">
              <span>→ 🖥️ Server 1 (30%)</span>
              <span>→ 🖥️ Server 2 (35%)</span>
              <span>→ 🖥️ Server 3 (35%)</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'anomaly',
      name: 'Anomaly Detection',
      icon: '🔍',  // Magnifying glass for detection
      description: 'Identifies suspicious traffic patterns.',
      demonstration: (
        <div className="mt-2 p-2 bg-gray-900 rounded">
          <div className="text-xs mb-1">Traffic Pattern:</div>
          <div className="flex items-end h-12 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 ${
                  i < 5 ? 'bg-green-500 h-4' : 'bg-red-500 h-10'
                } rounded`}
              ></div>
            ))}
          </div>
          <div className="text-xs mt-1 text-red-500">⚠️ Anomaly Detected</div>
        </div>
      )
    },
    {
      id: 'cloud',
      name: 'Cloud Protection',
      icon: '☁️',  // Cloud for cloud services
      description: 'Provides scalable DDoS mitigation.',
      demonstration: (
        <div className="mt-2 p-2 bg-gray-900 rounded">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span>☁️</span>
              <span className="text-xs">Cloud Shield</span>
            </div>
            <div className="w-full h-1 bg-blue-500 rounded animate-pulse"></div>
            <div className="text-xs">Auto-scaling Protection</div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            What is a Distributed Denial-of-Service (DDoS) Attack?
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Learn how attackers overload servers and how defenses fight back!
          </p>
          <DDoSVisualization
            attackIntensity={30}
            attackType="mixed"
            showDefense={false}
          />
          <div className="mt-8 space-x-4">
            <Link
              href="#learn-more"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/simulation"
              className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Try the Simulation
            </Link>
          </div>
        </motion.div>

        {/* DDoS Basics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
          id="learn-more"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How Does a DDoS Attack Work?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <DDoSVisualization
                attackIntensity={attackIntensity}
                attackType={selectedAttackType}
                showDefense={showDefense}
              />
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Attack Intensity: {attackIntensity}%
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
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-300 mb-4">
                A DDoS attack uses a network of hijacked devices (called a botnet) to send an overwhelming 
                number of requests to a target server, making it unavailable for legitimate users.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Key Components:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Botnet (network of compromised devices)</li>
                    <li>Command & Control server</li>
                    <li>Target server or network</li>
                    <li>Legitimate users (denied service)</li>
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDefense(!showDefense)}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    showDefense 
                      ? 'bg-gradient-to-r from-green-600 to-green-700'
                      : 'bg-gradient-to-r from-red-600 to-red-700'
                  }`}
                >
                  {showDefense ? 'Disable Defense' : 'Enable Defense'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attack Types */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Types of DDoS Attacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {attackTypes.map((attack, index) => (
              <motion.div
                key={attack.id}
                whileHover={{ scale: 1.05 }}
                className={`bg-gray-800 p-6 rounded-lg cursor-pointer ${
                  selectedAttackIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedAttackIndex(index)
                  setSelectedAttackType(attack.id)
                }}
              >
                <div className="text-3xl mb-2">{attack.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{attack.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{attack.description}</p>
                <div className="text-sm">
                  <p className="text-red-400 mb-1">Impact: {attack.impact}</p>
                  <p className="text-green-400">Defense: {attack.countermeasures}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Effects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Why are DDoS Attacks Dangerous?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="text-3xl mb-4">📉</div>  {/* Downward trend chart */}
              <h3 className="text-xl font-semibold mb-2">Website Downtime</h3>
              <p className="text-gray-300 text-sm">
                Services become inaccessible to legitimate users, leading to lost business opportunities.
              </p>
              <p className="text-sm text-red-400 mt-2">
                Example: Gaming services during major releases
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="text-3xl mb-4">💸</div>  {/* Money flying away */}
              <h3 className="text-xl font-semibold mb-2">Financial Losses</h3>
              <p className="text-gray-300 text-sm">
                Direct revenue loss from service disruption and mitigation costs.
              </p>
              <p className="text-sm text-red-400 mt-2">
                Average cost: $20,000 - $40,000 per hour
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="text-3xl mb-4">⚠️</div>  {/* Warning sign */}
              <h3 className="text-xl font-semibold mb-2">Reputation Damage</h3>
              <p className="text-gray-300 text-sm">
                Loss of customer trust and potential long-term business impact.
              </p>
              <p className="text-sm text-red-400 mt-2">
                60% of small businesses close within 6 months of a cyber attack
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="text-3xl mb-4">🔓</div>  {/* Unlocked/vulnerable */}
              <h3 className="text-xl font-semibold mb-2">Security Risks</h3>
              <p className="text-gray-300 text-sm">
                DDoS attacks can mask other malicious activities.
              </p>
              <p className="text-sm text-red-400 mt-2">
                Often used as a smokescreen for data breaches
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Defense Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">How Can We Defend Against DDoS Attacks?</h2>
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Defense Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defenseTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{tool.icon}</div>
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  {tool.demonstration}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Try It Yourself Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Want to Try It Yourself?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience both sides of a DDoS attack in our interactive simulation
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/simulation"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Launch Attack Simulation
            </Link>
            <Link
              href="/how-to-defend"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              Try Defense Mode
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Learn More</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/learn" className="hover:text-blue-400">
                    Cybersecurity Basics
                  </Link>
                </li>
                <li>
                  <Link href="/game-modes" className="hover:text-blue-400">
                    Game Modes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    Cloudflare DDoS Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cisa.gov/topics/critical-infrastructure-security"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    CISA Security Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-300">
                This interactive learning platform is designed to help you understand
                DDoS attacks and defense mechanisms through hands-on experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
