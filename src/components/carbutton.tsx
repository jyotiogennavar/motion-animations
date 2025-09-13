"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";

type ButtonState = "idle" | "loading" | "success";

const DeliveryButton = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const handleClick = () => {
    setButtonState("loading");

    setTimeout(() => {
      setButtonState("success");
    }, 1800); // vehicle animation duration

    setTimeout(() => {
      setButtonState("idle");
    }, 4500); // reset to idle (slowed success by +1s)
  };

  return (
    <>
    <div className="flex items-center justify-center gap-2">
      <button
        className={`
          flex items-center justify-center
          rounded-[8px]
          font-medium
          text-[14px]
          h-10
          w-[180px]
          overflow-hidden
          transition-colors duration-500
          relative
          bg-gradient-to-b from-[#1994ff] to-[#157cff]
        `}
        disabled={buttonState !== "idle"}
        onClick={handleClick}
      >
        <span className="flex items-center justify-center w-full h-full text-white relative">
          <AnimatePresence mode="wait" initial={false}>
            {buttonState === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              >
                Confirm Delivery
              </motion.span>
            )}

            {buttonState === "loading" && (
              <motion.div
                key="loading"
                className="absolute left-0 flex items-center"
                initial={{ x: "-100%" }}
                animate={{ x: "800%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
              >
                <Image src="/reshot-icon-car-deliver.svg" alt="Delivery vehicle" width={24} height={24} className="h-6 w-6" />
              </motion.div>
            )}

            {buttonState === "success" && (
              <motion.span
                key="success"
                className="flex items-center gap-1"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              >
                <Check size={16} className="text-white" /> Delivered!
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
    </>
  );
};

export { DeliveryButton };

//    ${ buttonState === "success" ? "bg-green-500" : "bg-gradient-to-b from-[#1994ff] to-[#157cff]"}