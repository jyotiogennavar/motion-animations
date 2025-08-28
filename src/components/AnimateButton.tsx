"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "./ui/spinner";

type ButtonState = "idle" | "loading" | "success" | "error";

const buttonCopy: Record<ButtonState, ReactNode> = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
  error: "Something went wrong",
};

const LinkShareButton = () => {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="
          flex items-center justify-center
          rounded-[8px]
          font-medium
          text-[13px]
          h-8
          w-[148px]
          overflow-hidden
          bg-gradient-to-b from-[#1994ff] to-[#157cff]
          shadow-[0_0_1px_1px_rgba(255,255,255,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff]
          border-none
          relative
        "

        disabled={buttonState !== "idle"}
        onClick={() => {
          setButtonState("loading");
          
          setTimeout(() => {
            setButtonState("success");
          }, 1750);

          setTimeout(() => {
            setButtonState("idle");
          }, 3000);
        }}
      >
        <span className="flex items-center justify-center w-full h-full text-white">
         <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          >
            {buttonCopy[buttonState]}
          </motion.span>
         </AnimatePresence>
        </span>
      </button>
    </div>
  );
};





export { LinkShareButton };