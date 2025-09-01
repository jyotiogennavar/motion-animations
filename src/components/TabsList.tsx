"use client";

import { useEffect, useState, useRef, type RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

export default function TabsList() {
  const [activeGame, setActiveGame] = useState<(typeof GAMES)[number] | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);

  // Close the modal when clicking outside
  useOnClickOutside(ref as unknown as RefObject<HTMLElement>, () =>
    setActiveGame(null)
  );

  // Close the modal when pressing the escape key
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGame(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
    <AnimatePresence>
      {activeGame && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="fixed inset-0 bg-black/20 z-10" />
      )}
    </AnimatePresence>
      <AnimatePresence>
      {activeGame && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 z-10" />
          
          <div className="fixed inset-0 grid place-items-center z-20">
            <motion.div
              layoutId={`game-${activeGame.title}`}
              ref={ref}
              className="flex flex-col gap-4 w-[500px] bg-white rounded-lg p-4 cursor-pointer"
              // initial={{ opacity: 0, scale: 0.9 }}
              // animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 w-full">
                <motion.img
                  layoutId={`game-${activeGame.title}-image`}
                  height={56}
                  width={56}
                  alt=""
                  src={activeGame.image}
                  className="rounded-lg"
                />
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex flex-col">
                    <motion.h2
                      layoutId={`game-${activeGame.title}-title`}
                      className="text-sm font-medium"
                    >
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`game-${activeGame.title}-description`}
                      className="text-sm text-gray-500"
                    >
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`game-${activeGame.title}-button`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-600"
                  >
                    Get
                  </motion.button>
                </div>
              </div>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 , transition: { duration: 0.05 }}}
                className="text-sm text-gray-500"
              >
                {activeGame.longDescription}
              </motion.p>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <ul className="flex flex-col items-center w-full my-12 space-y-4">
        {GAMES.map((game) => (
          <motion.li
            layoutId={`game-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="flex w-[386px] items-center gap-4 rounded-md cursor-pointer"
          >
            <motion.img
              layoutId={`game-${game.title}-image`}
              height={56}
              width={56}
              alt=""
              src={game.image}
              className="rounded-lg"
            />
            <div className="flex flex-grow items-center justify-between border-b border-gray-300/40 last:border-0">
              <div className="flex flex-col py-4">
                <motion.h2
                  layoutId={`game-${game.title}-title`}
                  className="text-sm font-medium"
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`game-${game.title}-description`}
                  className="text-sm text-gray-500"
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`game-${game.title}-button`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-blue-600"
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: "The Oddysey",
    description: "Explore unknown galaxies.",
    longDescription:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png",
  },
  {
    title: "Angry Rabbits",
    description: "They are coming for you.",
    longDescription:
      "The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png",
  },
  {
    title: "Ghost town",
    description: "Find the ghosts.",
    longDescription:
      "You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp",
  },
  {
    title: "Pirates in the jungle",
    description: "Find the treasure.",
    longDescription:
      "You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png",
  },

  {
    title: "Lost in the mountains",
    description: "Find your way home.",
    longDescription:
      "You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
  },
];
