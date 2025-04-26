import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  healthy: '#FFFFFF',
  decay: '#EF4444',
  filling: '#3B82F6',
  crown: '#FBBF24',
  rootCanal: '#A855F7',
  missing: '#D1D5DB',
  implant: '#10B981',
  pending: '#EC4899',
};

const Tooth3D = ({ number, conditions = [], selected, onClick }) => {
  const getToothColor = () => {
    if (conditions.length === 0) return colorMap.healthy;
    return colorMap[conditions[0].type] || colorMap.healthy;
  };

  const variants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.1, rotateX: 5, rotateY: 5 },
    tap: { scale: 0.95 },
    selected: { scale: 1.2, rotateX: 10, rotateY: 10 }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Diente ${number}`}
      className={`
        relative w-16 h-20 cursor-pointer
        transform perspective-1000
        transition-all duration-300 ease-in-out
        ${selected ? 'z-50' : 'z-0'}
      `}
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={selected ? "selected" : "initial"}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: selected 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Número de referencia */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
        {number}
      </div>

      {/* Diente SVG */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          scale: selected ? 1.1 : 1,
          z: selected ? 20 : 0
        }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          style={{
            filter: selected ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none'
          }}
        >
          {/* Cara frontal del diente */}
          <motion.path
            d="M20,20 L80,20 L80,100 L20,100 Z"
            fill={getToothColor()}
            stroke="#E5E7EB"
            strokeWidth="2"
            animate={{
              fill: getToothColor(),
              opacity: selected ? 1 : 0.9
            }}
          />

          {/* Líneas de la superficie del diente */}
          <motion.path
            d="M30,30 L70,30 M30,50 L70,50 M30,70 L70,70"
            stroke="#E5E7EB"
            strokeWidth="1"
            animate={{
              opacity: selected ? 0.8 : 0.6
            }}
          />

          {/* Cara superior del diente */}
          <motion.path
            d="M20,20 L80,20 L80,30 L20,30 Z"
            fill="#F3F4F6"
            animate={{
              opacity: selected ? 0.7 : 0.5
            }}
          />

          {/* Cara lateral derecha */}
          <motion.path
            d="M80,20 L80,100 L90,90 L90,30 Z"
            fill="#E5E7EB"
            animate={{
              opacity: selected ? 0.7 : 0.5
            }}
          />
        </svg>
      </motion.div>

      {/* Indicador de condiciones */}
      {conditions.length > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white"
          animate={{
            scale: selected ? 1.2 : 1,
            opacity: selected ? 1 : 0.8
          }}
        />
      )}
    </motion.div>
  );
};

export default Tooth3D; 