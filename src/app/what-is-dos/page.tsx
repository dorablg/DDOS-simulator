'use client'

import { motion } from 'framer-motion'
import NetworkVisualization from '@/components/NetworkVisualization'

export default function WhatIsDoS() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          What is a DoS Attack?
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Definition</h2>
              <p className="text-gray-300">
                A Denial of Service (DoS) attack is a cyber attack that makes a service 
                unavailable to its intended users by overwhelming it with traffic from 
                a single source.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Types of DoS Attacks</h2>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <span className="font-semibold text-blue-400">SYN Flood:</span>
                  <p>Exploits TCP handshake by sending many SYN requests without completing the handshake.</p>
                </li>
                <li>
                  <span className="font-semibold text-blue-400">UDP Flood:</span>
                  <p>Sends large numbers of UDP packets to random ports on a target system.</p>
                </li>
                <li>
                  <span className="font-semibold text-blue-400">HTTP Flood:</span>
                  <p>Overwhelms a web server with numerous HTTP requests.</p>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Live Demonstration</h2>
              <NetworkVisualization mode="educational" />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Impact</h2>
              <ul className="space-y-4 text-gray-300">
                <li>• Service disruption for legitimate users</li>
                <li>• Financial losses for businesses</li>
                <li>• Reputation damage</li>
                <li>• Resource exhaustion</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
