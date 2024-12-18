'use client'

import { motion } from 'framer-motion'

export default function WhatIsDDoS() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Content */}
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center mb-12"
            >
              What is a DDoS Attack?
            </motion.h1>

            <div className="space-y-12">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🎯</span>
                  Understanding DDoS
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  A Distributed Denial of Service (DDoS) attack is a malicious attempt to disrupt the normal 
                  traffic of a targeted server, service, or network by overwhelming it with a flood of Internet 
                  traffic from multiple sources. Unlike regular DoS attacks that use a single source, DDoS 
                  attacks use multiple compromised computer systems as sources of attack traffic.
                </p>
              </motion.div>

              {/* How it Works */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">⚙️</span>
                  How DDoS Attacks Work
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>DDoS attacks typically follow these steps:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Building a network of infected computers (botnet)</li>
                    <li>Overwhelming the target with traffic from multiple sources</li>
                    <li>Disrupting service for legitimate users</li>
                    <li>Potentially causing system crashes or service outages</li>
                  </ol>
                </div>
              </motion.div>

              {/* Types of Attacks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🔍</span>
                  Common Types of DDoS Attacks
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Volume Based</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>UDP floods</li>
                      <li>ICMP floods</li>
                      <li>Spoofed packet floods</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Protocol Attacks</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>SYN floods</li>
                      <li>Ping of Death</li>
                      <li>Smurf DDoS</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Defense Mechanisms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🛡️</span>
                  Defense Mechanisms
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>Common defense strategies include:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Traffic analysis and filtering</li>
                    <li>Rate limiting</li>
                    <li>Load balancing</li>
                    <li>Blackholing and sinkholing</li>
                    <li>Web application firewalls (WAF)</li>
                  </ul>
                </div>
              </motion.div>
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
      </div>
    </div>
  )
}
