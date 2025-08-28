"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Box = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        layout
        onClick={() => setIsOpen((o) => !o)}
        className="w-10 h-10 bg-yellow-500 rounded-2xl"
        style={{
          ...(isOpen
            ? {
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }
            : { height: "100px", width: "100px" })  ,
        }}
      ></motion.div>
    </div>
  );
};

export { Box };