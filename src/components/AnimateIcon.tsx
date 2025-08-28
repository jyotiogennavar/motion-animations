"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, CircleCheckBig, Copy, Share } from "lucide-react";
import { useState } from "react";

const AnimateIcon = () => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("code");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => {
      setShared(false);
    }, 2000);
  };

  return (
    <div
      className="flex items-center justify-center gap-2"
      aria-label="Copy code snippet"
    >
      {/* copy button */}
      <button
        className="flex items-center justify-center border-2 border-solid border-slate-500 w-12 h-12 rounded-sm"
        onClick={handleCopy}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key={"check"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Check />
            </motion.span>
          ) : (
            <motion.span
              key={"copy"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Copy />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* share button */}
      <button
        className="flex items-center justify-center border-2 border-solid border-blue-500 w-12 h-12 rounded-sm"
        onClick={handleShare}
      >
        <AnimatePresence mode="wait" initial={false}>
          {shared ? (
            <motion.span
              key={"check"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <CircleCheckBig />
            </motion.span>
          ) : (
            <motion.span
              key={"share"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Share />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default AnimateIcon;
