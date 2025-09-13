"use client";

import { motion, AnimatePresence } from "framer-motion";

export const ButtonToCard = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          className="bg-gradient-to-b from-[#8ba8c0] to-[#5d6f85] text-white rounded-[8px] font-medium text-[14px] h-10 w-[180px] overflow-hidden relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center justify-center w-full h-full text-white relative">
            <h1>Button to Card</h1>
          </span>
        </motion.button>
        <motion.div
          className="w-200 h-200 bg-white rounded-[8px] shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center justify-center w-full h-full text-white relative">
            <p>Button to Card</p>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
