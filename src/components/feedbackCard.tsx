"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Frown,
  Meh,
  Smile,
  Laugh,
} from "lucide-react";

type FormState = "idle" | "loading" | "success";

type RatingOption = {
  id: number;
  label: string;
  Icon: (props: { className?: string }) => ReactElement;
};

// Small fixed set of rating choices shown as emoji-like icons.
// Keep this array tiny to maintain the compact layout in the header row.
const ratingOptions: RatingOption[] = [
  { id: 1, label: "Very bad", Icon: (p) => <Frown {...p} /> },
  { id: 2, label: "Bad", Icon: (p) => <Meh {...p} /> },
  { id: 3, label: "Okay", Icon: (p) => <Smile {...p} /> },
  { id: 4, label: "Good", Icon: (p) => <Laugh {...p} /> },

];

export default function FeedbackCard() {
  // UI state: selected emoji, expanded panel visibility, text value, and async state
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close the panel when clicking outside of the card.
  // Cast ref to HTMLElement to satisfy the library's generic typing.
  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    setOpen(false);
    setFormState("idle");
  });

  // Friendly label for the currently selected rating (used in helper text)
  const selectedLabel = useMemo(() => {
    if (!selectedRating) return undefined;
    return ratingOptions.find((o) => o.id === selectedRating)?.label;
  }, [selectedRating]);

  // When a rating is picked, expand the panel and reset submission state
  function handleSelect(rating: number) {
    setSelectedRating(rating);
    setOpen(true);
    setFormState("idle");
  }

  // Submit handler is memoized so keyboard listener dependencies stay stable.
  // This simulates a network request, shows success, then auto-collapses.
  const submit = useCallback(() => {
    if (!feedback.trim()) return;
    setFormState("loading");
    // Simulate a request
    setTimeout(() => {
      setFormState("success");
    }, 900);
    setTimeout(() => {
      setOpen(false);
      setFeedback("");
    }, 2400);
  }, [feedback]);

  // Keyboard shortcuts
  // - Esc closes the panel
  // - Ctrl/Cmd + Enter submits (when idle)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setFormState("idle");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && open && formState === "idle") {
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, formState, submit]);

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        ref={containerRef}
        layout
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={`relative ${open ? "w-[25rem]" : "w-[20rem]"} rounded-3xl border border-border/60 bg-background/95 
         backdrop-blur supports-[backdrop-filter]:bg-background/80`}
      >
        <div className="flex items-center gap-1 px-4 py-2.5">
          <span className="text-sm text-foreground/80">Was this helpful?</span>
          <div className="ml-auto flex items-center gap-2">
            {/* Emoji rating row; each button toggles selected styling and opens the panel */}
            {ratingOptions.map(({ id, label, Icon }) => {
              const isSelected = selectedRating === id;
              return (
                <button
                  key={id}
                  aria-label={label}
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(id)}
                  className={[
                    "size-8 rounded-full grid place-items-center transition-colors",
                    isSelected
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "hover:bg-accent text-foreground/80 hover:border-primary/30",
                  ].join(" ")}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-b-3xl border-t border-dashed border-border/60"
            >
              {formState === "success" ? (
                // Success confirmation state
                <div className="px-4 py-4 text-sm">
                  <div className="mb-1 font-medium">Feedback received. Thank you!</div>
                 
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  className="px-4 py-3"
                >
                  {/* Feedback text input */}
                  <Textarea
                    placeholder="Your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-xs text-muted-foreground">
                      {selectedLabel ? `Selected: ${selectedLabel}` : ""}
                    </div>
                    {/* Primary action; disabled when empty or while submitting */}
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!feedback.trim() || formState === "loading"}
                    >
                      {formState === "loading" ? (
                        <>
                          <Spinner size={14} color="currentColor" />
                          Sending...
                        </>
                      ) : (
                        <>Send</>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


