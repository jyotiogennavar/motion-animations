import type { ReactNode } from "react";
import ClipPathImageReveal from "@/components/clippathimagereveal";
import StarCursor from "@/components/star-cursor";
import GooglyEyes from "@/components/googly-eyes";
import CoffeeCup from "@/components/coffee-types/CoffeeCup";
import SVGLineAnimation from "@/components/svglineanimation";
import SVGCupAnimation from "@/components/svgcupanimation";
import CursorInteraction from "@/components/CursorInteraction";
import FeedbackCard from "@/components/feedbackCard";
import SVG from "@/components/svg";
import { TransformAnimations } from "@/components/transform-animations";
import { ButtonToCard } from "@/components/apple-animations/button-to-card";
import { DeliveryButton } from "@/components/carbutton";
import { CustomCursor } from "@/components/CustomCursor";
import Orchestration from "@/components/navigation/navigation";
import Navigation from "@/components/Navigation";
import { TrashAnimation } from "@/components/TrashAnimation";
import MultiStepCards from "@/components/MultiStepCards";
import FeedbackPopover from "@/components/FeedbackPopover";
import TabsList from "@/components/TabsList";
import { Tabs } from "@/components/Tabs";
import { Box } from "@/components/Layout";
import { LinkShareButton } from "@/components/AnimateButton";
import AnimateIcon from "@/components/AnimateIcon";
import { FormCard } from "@/components/FormCard";

/**
 * Newest first. Add the next animation at the top of this list.
 */
const animations: { name: string; line: string; preview: ReactNode }[] = [
  {
    name: "Clip path image reveal",
    line: "Hover a photo and it wipes up into view.",
    preview: <ClipPathImageReveal />,
  },
  {
    name: "Star cursor",
    line: "A star follows the pointer across the frame.",
    preview: <StarCursor />,
  },
  {
    name: "Googly eyes",
    line: "Pupils slide inside each eye to follow the pointer.",
    preview: <GooglyEyes />,
  },
  {
    name: "Coffee cup",
    line: "Pick a drink and the cup fills with each ingredient layer.",
    preview: <CoffeeCup />,
  },
  {
    name: "SVG line",
    line: "Hover the button and the stroke draws itself along the path.",
    preview: <SVGLineAnimation />,
  },
  {
    name: "Star draw",
    line: "Hover the star and its outline draws on.",
    preview: <SVGCupAnimation />,
  },
  {
    name: "Cursor distance",
    line: "The portrait blurs and drops as the pointer moves away.",
    preview: <CursorInteraction />,
  },
  {
    name: "Feedback card",
    line: "Pick a rating and the card opens into a short form.",
    preview: <FeedbackCard />,
  },
  {
    name: "SVG shapes",
    line: "A set of basic SVG marks.",
    preview: <SVG />,
  },
  {
    name: "Transforms",
    line: "A tilted square, orbiting planets, and a staggered grid.",
    preview: <TransformAnimations />,
  },
  {
    name: "Button to card",
    line: "A button and a card share the same hover and press scale.",
    preview: <ButtonToCard />,
  },
  {
    name: "Delivery button",
    line: "Click to send a car across the button, then a check.",
    preview: <DeliveryButton />,
  },
  {
    name: "Custom cursor",
    line: "A label springs to the pointer inside each card.",
    preview: <CustomCursor />,
  },
  {
    name: "Menu orchestration",
    line: "Open a nav item and the panel scales in from the trigger.",
    preview: <Orchestration />,
  },
  {
    name: "Navigation menu",
    line: "Dropdown panels slide in from the side you came from.",
    preview: <Navigation />,
  },
  {
    name: "Trash",
    line: "Select photos, then send the chosen ones into the bin.",
    preview: <TrashAnimation />,
  },
  {
    name: "Multi-step card",
    line: "The card height animates as you move between steps.",
    preview: <MultiStepCards />,
  },
  {
    name: "Feedback popover",
    line: "The button grows into a form, then confirms it was sent.",
    preview: <FeedbackPopover />,
  },
  {
    name: "Game list",
    line: "Tap a row and it grows into a detail card.",
    preview: <TabsList />,
  },
  {
    name: "Tabs",
    line: "A highlight slides to the tab under the pointer.",
    preview: <Tabs />,
  },
  {
    name: "Expanding box",
    line: "Click the square and it grows to fill the screen.",
    preview: <Box />,
  },
  {
    name: "Login link",
    line: "The label swaps through loading and a sent confirmation.",
    preview: <LinkShareButton />,
  },
  {
    name: "Icon swap",
    line: "Copy and share icons crossfade into a check.",
    preview: <AnimateIcon />,
  },
  {
    name: "Form card",
    line: "Edit the card, save, and a success state fades in.",
    preview: <FormCard />,
  },
];

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
  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {animations.map((animation) => (
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
