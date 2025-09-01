"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MultistepCards() {
  const [currentStep, setCurrentStep] = useState(0);

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="mb-2 font-semibold text-lg">This is step one</h2>
            <p className="text-gray-700">
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="bg-gray-200 h-4 rounded w-64 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-48 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-full animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-96 animate-pulse" />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-2 font-semibold text-lg">This is step two</h2>
            <p className="text-gray-700">
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="bg-gray-200 h-4 rounded w-64 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-48 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-96 animate-pulse" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-2 font-semibold text-lg">This is step three</h2>
            <p className="text-gray-700">
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <div className="bg-gray-200 h-4 rounded w-64 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-48 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-32 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-56 animate-pulse" />
              <div className="bg-gray-200 h-4 rounded w-96 animate-pulse" />
            </div>
          </>
        );
      default:
        return null;
    }
  }, [currentStep]);

  return (
    <div className="relative mx-auto my-24 w-[550px] overflow-hidden rounded-xl shadow-md border border-gray-200">
      <div className="p-6">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-110%", opacity: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
          >
            {content}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            className="h-8 w-20 rounded-full text-sm font-medium text-gray-600 shadow-sm border border-gray-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStep === 0}
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep((prev) => prev - 1);
              }
            }}
          >
            Back
          </button>
          <button
            className="h-8 w-28 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-blue-500 to-blue-600 shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStep === 2}
            onClick={() => {
              if (currentStep === 2) {
                setCurrentStep(0);
                return;
              }
              setCurrentStep((prev) => prev + 1);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
