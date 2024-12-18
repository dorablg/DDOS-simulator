import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DDoSVisualizationProps {
  attackIntensity: number;
  attackType: string;
  defenseEnabled: boolean;
}

const DDoSVisualization: React.FC<DDoSVisualizationProps> = ({
  attackIntensity,
  attackType,
  defenseEnabled
}) => {
  const [serverHealth, setServerHealth] = useState(100);
  const [packets, setPackets] = useState<Array<{ id: number; path: number; isBlocked?: boolean }>>([]);
  const [attackSources, setAttackSources] = useState<Array<{ id: number; position: number }>>([]);

  // Generate attack source positions
  useEffect(() => {
    const sourceCount = Math.min(5, Math.ceil(attackIntensity / 20));
    setAttackSources(
      Array.from({ length: sourceCount }, (_, i) => ({
        id: i,
        position: (i * 360) / sourceCount
      }))
    );
  }, [attackIntensity]);

  // Generate attack packets
  useEffect(() => {
    const interval = setInterval(() => {
      const newPackets = [];
      const packetCount = Math.floor(attackIntensity / 10);
      
      for (let i = 0; i < packetCount; i++) {
        const sourceIndex = Math.floor(Math.random() * attackSources.length);
        const isBlocked = defenseEnabled && Math.random() > 0.3; // 70% chance to block if defense is enabled
        
        newPackets.push({
          id: Date.now() + i,
          path: attackSources[sourceIndex]?.position || 0,
          isBlocked
        });
      }
      
      setPackets(prev => [...prev, ...newPackets]);
      
      // Clean up old packets
      setPackets(prev => prev.filter(p => Date.now() - p.id < 2000));
    }, 100);

    return () => clearInterval(interval);
  }, [attackIntensity, attackSources.length, defenseEnabled]);

  // Update server health
  useEffect(() => {
    const healthImpact = defenseEnabled ? attackIntensity * 0.3 : attackIntensity;
    setServerHealth(prev => {
      const newHealth = Math.max(0, 100 - healthImpact);
      return newHealth + (prev - newHealth) * 0.9; // Smooth transition
    });
  }, [attackIntensity, defenseEnabled]);

  const getPacketPath = (angle: number) => {
    const radius = 150;
    const startX = Math.cos((angle * Math.PI) / 180) * radius;
    const startY = Math.sin((angle * Math.PI) / 180) * radius;
    return `M ${startX} ${startY} L 0 0`;
  };

  return (
    <div className="relative w-full h-[500px] bg-gray-900 rounded-lg p-4 overflow-hidden">
      {/* Attack Flow Paths */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        {attackSources.map(source => (
          <path
            key={source.id}
            d={getPacketPath(source.position)}
            stroke="white"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            className="animate-dash"
          />
        ))}
      </svg>

      {/* Server Monitor */}
      <div className="absolute right-4 top-4 w-48 bg-gray-800/80 backdrop-blur p-3 rounded-lg">
        <div className="text-sm font-mono">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              serverHealth > 70 ? 'bg-green-500' : 
              serverHealth > 30 ? 'bg-yellow-500' : 'bg-red-500'
            } animate-pulse`} />
            <div>{serverHealth > 70 ? 'Normal' : serverHealth > 30 ? 'Warning' : 'Critical'}</div>
          </div>
          <div>Health: {serverHealth.toFixed(0)}%</div>
          <div>Attack: {attackType}</div>
        </div>
      </div>

      {/* Attack Sources */}
      {attackSources.map(source => (
        <motion.div
          key={source.id}
          className="absolute"
          style={{
            left: `${50 + Math.cos((source.position * Math.PI) / 180) * 45}%`,
            top: `${50 + Math.sin((source.position * Math.PI) / 180) * 45}%`
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur px-2 py-1 rounded">
            <span className="text-xl animate-pulse">👾</span>
            <div className="text-xs">Attacker</div>
          </div>
        </motion.div>
      ))}

      {/* Server */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: serverHealth > 30 ? [1, 1.05, 1] : [0.9, 0.95, 0.9],
          rotate: serverHealth > 30 ? 0 : [-5, 5, -5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          {/* Server glow effect */}
          <div className={`absolute inset-0 rounded-lg blur-lg ${
            serverHealth > 70 ? 'bg-green-500/30' :
            serverHealth > 30 ? 'bg-yellow-500/30' : 'bg-red-500/30'
          }`} />
          
          <div className="w-32 h-40 bg-gray-800 rounded-lg flex flex-col items-center justify-center relative z-10">
            <div className="text-2xl mb-2">🖥️</div>
            <div className="text-xs">Server</div>
            <div className="mt-2 flex gap-1">
              <div className={`w-2 h-2 rounded-full ${serverHealth > 70 ? 'bg-green-500' : 'bg-gray-600'}`} />
              <div className={`w-2 h-2 rounded-full ${serverHealth > 30 ? 'bg-yellow-500' : 'bg-gray-600'}`} />
              <div className={`w-2 h-2 rounded-full ${serverHealth <= 30 ? 'bg-red-500' : 'bg-gray-600'}`} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Attack Packets */}
      <AnimatePresence>
        {packets.map(packet => (
          <motion.div
            key={packet.id}
            className="absolute left-1/2 top-1/2"
            initial={{
              x: Math.cos((packet.path * Math.PI) / 180) * 250,
              y: Math.sin((packet.path * Math.PI) / 180) * 250,
              scale: 0
            }}
            animate={{
              x: packet.isBlocked ? Math.cos((packet.path * Math.PI) / 180) * 100 : 0,
              y: packet.isBlocked ? Math.sin((packet.path * Math.PI) / 180) * 100 : 0,
              scale: packet.isBlocked ? [1, 1.5, 0] : 1,
              opacity: packet.isBlocked ? [1, 0.5, 0] : 1
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className={`w-3 h-3 rounded-full ${
              packet.isBlocked ? 'bg-red-500' : 'bg-blue-500'
            } shadow-lg shadow-blue-500/50`} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Defense Shield */}
      {defenseEnabled && (
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="relative">
            {/* Shield glow effect */}
            <div className="absolute inset-0 rounded-full blur-lg bg-cyan-500/30" />
            
            <motion.div
              className="w-48 h-48 rounded-full border-4 border-cyan-500/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DDoSVisualization;
