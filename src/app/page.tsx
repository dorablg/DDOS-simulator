'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GameInterface from '@/components/GameInterface'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState<'attack' | 'defense' | null>(null)

  return (
    <div className="min-h-screen bg-gray-900">
      {!gameStarted ? (
        <HeroSection onStartGame={(mode) => {
          setGameMode(mode)
          setGameStarted(true)
        }} />
      ) : (
        <GameInterface mode={gameMode!} onBack={() => {
          setGameStarted(false)
          setGameMode(null)
        }} />
      )}
    </div>
  )
}
