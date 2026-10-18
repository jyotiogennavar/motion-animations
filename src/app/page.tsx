"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import ClipPathImageReveal from "@/components/clippathimagereveal";
import StarCursor from "@/components/star-cursor";
import GooglyEyes from "@/components/googly-eyes";
import CoffeeCup from "@/components/coffee-types/CoffeeCup";
import SVGLineAnimation from "@/components/svglineanimation";
import SVGCupAnimation from "@/components/svgcupanimation";
import CursorInteraction from "@/components/CursorInteraction";
import FeedbackCard from "@/components/feedbackCard";
import SVG from "@/components/svg";
import { DeliveryButton } from "@/components/carbutton";
import { CustomCursor } from "@/components/CustomCursor";
import Orchestration from "@/components/navigation/navigation";
import { TrashAnimation } from "@/components/TrashAnimation";
import MultiStepCards from "@/components/MultiStepCards";
import FeedbackPopover from "@/components/FeedbackPopover";
import TabsList from "@/components/TabsList";
import { Tabs } from "@/components/Tabs";
import { Box } from "@/components/Layout";
import { LinkShareButton } from "@/components/AnimateButton";
import AnimateIcon from "@/components/AnimateIcon";
import { FormCard } from "@/components/FormCard";
import GraphFollow from "@/components/graph-follow";

const categories = ["Pointer", "Draw", "Buttons", "Menus", "Cards"] as const;

type Category = (typeof categories)[number];
type Filter = "All" | Category;

const filters: Filter[] = ["All", ...categories];

/**
 * Newest first. Add the next animation at the top of this list.
 */
const animations: {
  name: string;
  line: string;
  category: Category;
  preview: ReactNode;
}[] = [
  {
    name: "Graph follow",
    line: "Move across the chart and the line draws out to the pointer.",
    category: "Pointer",
    preview: <GraphFollow />,
  },
  {
    name: "Clip path image reveal",
    line: "Hover a photo and it wipes up into view.",
    category: "Draw",
    preview: <ClipPathImageReveal />,
  },
  {
    name: "Star cursor",
    line: "A star follows the pointer across the frame.",
    category: "Pointer",
    preview: <StarCursor />,
  },
  {
    name: "Googly eyes",
    line: "Pupils slide inside each eye to follow the pointer.",
    category: "Pointer",
    preview: <GooglyEyes />,
  },
  {
    name: "Coffee cup",
    line: "Pick a drink and the cup fills with each ingredient layer.",
    category: "Cards",
    preview: <CoffeeCup />,
  },
  {
    name: "SVG line",
    line: "Hover the button and the stroke draws itself along the path.",
    category: "Draw",
    preview: <SVGLineAnimation />,
  },
  {
    name: "Star draw",
    line: "Hover the star and its outline draws on.",
    category: "Draw",
    preview: <SVGCupAnimation />,
  },
  {
    name: "Cursor distance",
    line: "The portrait blurs and drops as the pointer moves away.",
    category: "Pointer",
    preview: <CursorInteraction />,
  },
  {
    name: "Feedback card",
    line: "Pick a rating and the card opens into a short form.",
    category: "Cards",
    preview: <FeedbackCard />,
  },
  {
    name: "SVG shapes",
    line: "A set of basic SVG marks.",
    category: "Draw",
    preview: <SVG />,
  },
  {
    name: "Delivery button",
    line: "Click to send a car across the button, then a check.",
    category: "Buttons",
    preview: <DeliveryButton />,
  },
  {
    name: "Custom cursor",
    line: "A label springs to the pointer inside each card.",
    category: "Pointer",
    preview: <CustomCursor />,
  },
  {
    name: "Menu orchestration",
    line: "Open a nav item and the panel scales in from the trigger.",
    category: "Menus",
    preview: <Orchestration />,
  },
  {
    name: "Trash",
    line: "Select photos, then send the chosen ones into the bin.",
    category: "Cards",
    preview: <TrashAnimation />,
  },
  {
    name: "Multi-step card",
    line: "The card height animates as you move between steps.",
    category: "Cards",
    preview: <MultiStepCards />,
  },
  {
    name: "Feedback popover",
    line: "The button grows into a form, then confirms it was sent.",
    category: "Cards",
    preview: <FeedbackPopover />,
  },
  {
    name: "Game list",
    line: "Tap a row and it grows into a detail card.",
    category: "Cards",
    preview: <TabsList />,
  },
  {
    name: "Tabs",
    line: "A highlight slides to the tab under the pointer.",
    category: "Menus",
    preview: <Tabs />,
  },
  {
    name: "Expanding box",
    line: "Click the square and it grows to fill the screen.",
    category: "Cards",
    preview: <Box />,
  },
  {
    name: "Login link",
    line: "The label swaps through loading and a sent confirmation.",
    category: "Buttons",
    preview: <LinkShareButton />,
  },
  {
    name: "Icon swap",
    line: "Copy and share icons crossfade into a check.",
    category: "Buttons",
    preview: <AnimateIcon />,
  },
  {
    name: "Form card",
    line: "Edit the card, save, and a success state fades in.",
    category: "Cards",
    preview: <FormCard />,
  },
];

function countFor(filter: Filter) {
  if (filter === "All") return animations.length;
  return animations.filter((animation) => animation.category === filter).length;
}

const stageClassName = [
  "flex h-[32rem] w-full overflow-auto rounded-md border border-neutral-800 bg-white",
  "[&>*]:m-auto [&>*]:max-w-full",
  "[&>.h-screen]:!m-0 [&>.h-screen]:!h-full [&>.h-screen]:!min-h-full [&>.h-screen]:!w-full [&>.h-screen]:!max-w-none [&>.h-screen]:!self-stretch",
  "[&>.min-h-screen]:!h-auto [&>.min-h-screen]:!min-h-0",
  "[&>.clip-path-image-reveal]:!m-0 [&>.clip-path-image-reveal]:!h-full [&>.clip-path-image-reveal]:!min-h-full [&>.clip-path-image-reveal]:!w-full [&>.clip-path-image-reveal]:!max-w-none [&>.clip-path-image-reveal]:!self-stretch",
  "[&>.coffee-cup]:!h-auto [&>.coffee-cup]:!min-h-0",
  "[&>.root]:!w-full [&>.root]:!max-w-full",
].join(" ");

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();
  const visible =
    filter === "All"
      ? animations
      : animations.filter((animation) => animation.category === filter);

  function selectFilter(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 border-b border-black/[0.08] bg-white/80 backdrop-blur-md">
        <div
          role="group"
          aria-label="Animation categories"
          className="mx-auto flex max-w-5xl flex-wrap gap-1.5 px-4 py-3 sm:px-8"
        >
          {filters.map((item) => {
            const selected = item === filter;
            const count = countFor(item);

            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => selectFilter(item)}
                className={clsx(
                  "relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-sm font-medium",
                  "transition-[color,transform] duration-200 ease-[ease]",
                  "active:scale-[0.96] motion-reduce:active:scale-100",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
                  selected
                    ? "text-white"
                    : "text-neutral-600 [@media(hover:hover)_and_(pointer:fine)]:hover:text-neutral-900",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="category-pill"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-neutral-900"
                    style={{ borderRadius: 999 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", duration: 0.25, bounce: 0 }
                    }
                  />
                ) : null}
                <span className="relative">{item}</span>
                <span
                  className={clsx(
                    "relative tabular-nums",
                    selected ? "text-white/70" : "text-neutral-400",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length}{" "}
        {filter === "All" ? "animations" : `${filter} animations`}
      </p>

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-8">
        {visible.map((animation) => (
          <section key={animation.name}>
            <h2 className="mb-3 text-sm text-neutral-900">
              <span className="font-medium">{animation.name}</span>
              <span className="text-neutral-500"> — {animation.line}</span>
            </h2>
            <div className={stageClassName}>{animation.preview}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
