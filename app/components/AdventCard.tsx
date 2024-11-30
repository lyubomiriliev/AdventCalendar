"use client";

import { motion } from "framer-motion";
import { Gift } from "../types";

interface AdventCardProps {
  gift: Gift;
  isOpen: boolean; // Controlled by Home
  onClick: (gift: Gift) => void;
}

const cardVariants = {
  hover: {
    scale: 1.05,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.3,
    },
  },
};

export function AdventCard({ gift, isOpen, onClick }: AdventCardProps) {
  const getClipPath = (id: number) => {
    if (id % 3 === 0) {
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    }
    if (id % 2 === 0) {
      return "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)";
    }
    return "circle(50% at 50% 50%)";
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`cursor-pointer ${
        isOpen
          ? "bg-gradient-to-tr from-green-600 via-green-500 to-green-800"
          : "bg-gradient-to-tr from-red-600 via-red-500 to-red-800"
      } rounded-lg p-6 aspect-square flex items-center justify-center transform transition-colors duration-300 shadow-xl backdrop-blur-sm`}
      style={{
        clipPath: getClipPath(gift.id),
      }}
      onClick={() => onClick(gift)}
    >
      <span className="text-7xl font-bold text-white">{gift.id}</span>
    </motion.div>
  );
}
