'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const LearnPage = () => {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const educationalContent = {
    articles: [
      {
        title: 'Understanding DoS Attacks',
        content: 'A Denial of Service (DoS) attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users...',
        difficulty: 'Beginner'
      },
      {
        title: 'Advanced Defense Strategies',
        content: 'Learn about rate limiting, traffic analysis, and implementing robust firewall rules...',
        difficulty: 'Advanced'
      }
    ],
    glossary: {
      'DoS': 'Denial of Service - A cyber attack that makes a service unavailable to its intended users',
      'DDoS': 'Distributed Denial of Service - A DoS attack from multiple sources',
      'Botnet': 'A network of compromised computers used to perform DDoS attacks',
      'SYN Flood': 'A type of DoS attack that exploits the TCP handshake protocol',
      'Rate Limiting': 'A defense strategy that controls the rate of incoming traffic',
      'Load Balancer': 'A device that distributes network traffic across multiple servers'
    },
    quizzes: [
      {
        question: 'What is the main purpose of a DoS attack?',
        options: [
          'To steal data',
          'To make services unavailable',
          'To gain admin access',
          'To mine cryptocurrency'
        ],
        correct: 1
      }
    ]
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Learn About DoS Attacks
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Educational Resources */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Educational Resources</h2>
            <div className="space-y-4">
              {educationalContent.articles.map((article, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold text-blue-400">{article.title}</h3>
                  <p className="text-gray-300 mt-2">{article.content}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {article.difficulty}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Glossary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Cybersecurity Glossary</h2>
            <div className="space-y-3">
              {Object.entries(educationalContent.glossary).map(([term, definition]) => (
                <motion.div
                  key={term}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedTerm(term)}
                  className="cursor-pointer border border-gray-700 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-green-400">{term}</h3>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: selectedTerm === term ? 'auto' : 0,
                      opacity: selectedTerm === term ? 1 : 0
                    }}
                    className="text-gray-300 mt-2"
                  >
                    {definition}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interactive Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Test Your Knowledge</h2>
          {educationalContent.quizzes.map((quiz, index) => (
            <div key={index} className="space-y-4">
              <p className="text-xl font-semibold">{quiz.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quiz.options.map((option, optionIndex) => (
                  <motion.button
                    key={optionIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border border-gray-700 text-left
                      ${optionIndex === quiz.correct ? 'hover:border-green-500' : 'hover:border-red-500'}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default LearnPage
