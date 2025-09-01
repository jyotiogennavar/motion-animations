"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import type { RefObject } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useOnClickOutside } from "usehooks-ts";

export default function FeedbackPopover() {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);

    setTimeout(() => {
      setOpen(false);
    }, 3300);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Enter" &&
        open &&
        formState === "idle"
      ) {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className="h-[500px] flex justify-center items-center w-full">
      <motion.button
        layoutId="wrapper"
        onClick={() => {
          setOpen(true);
          setFormState("idle");
          setFeedback("");
        }}
        className="relative flex h-9 items-center rounded-md border border-gray-200 bg-white px-3 font-medium outline-none"
      >
        <motion.span layoutId="title" className="text-sm">
          Feedback
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="wrapper"
            ref={ref}
            className="absolute h-48 w-[364px] overflow-hidden rounded-xl bg-gray-100 p-1 shadow-md outline-none"
          >
            <motion.span
              layoutId="title"
              aria-hidden
              initial={{ opacity: 1 }}
              animate={{ opacity: feedback ? 0 : 1 }}
              transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="absolute text-sm text-gray-600 left-4 top-4 pointer-events-none select-none"
            >
              Feedback
            </motion.span>

            {formState === "success" ? (
              <div className="flex h-full flex-col items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                    fill="#2090FF"
                    fillOpacity="0.16"
                  />
                  <path
                    d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
                    stroke="#2090FF"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="mt-2 mb-1 text-sm font-medium text-gray-900">
                  Feedback received!
                </h3>
                <p className="text-sm text-gray-600">
                  Thanks for helping us improve.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!feedback) return;
                  submit();
                }}
                className="rounded-md border border-gray-200 bg-white"
              >
                <textarea
                  autoFocus
                  placeholder="Feedback"
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-32 resize-none rounded-t-md p-3 text-sm outline-none placeholder-transparent"
                  required
                />
                <div className="relative flex h-12 items-center px-3">
                  <div className="absolute left-0 right-0 top-0 border-t border-dashed border-gray-300"></div>
                  <button
                    type="submit"
                    className="ml-auto flex items-center justify-center rounded-md bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-1 text-xs font-semibold text-white shadow"
                  >
                    <span className="grid grid-cols-1 grid-rows-1 place-items-center">
                      <span
                        aria-hidden
                        className="col-start-1 row-start-1 invisible pointer-events-none select-none"
                      >
                        Send feedback
                      </span>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          className="col-start-1 row-start-1"
                          transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0,
                          }}
                          initial={{ opacity: 0, y: -25 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 25 }}
                          key={formState}
                        >
                          {formState === "loading" ? (
                            <Spinner
                              size={14}
                              color="rgba(255, 255, 255, 0.65)"
                            />
                          ) : (
                            <span>Send feedback</span>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

