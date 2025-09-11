"use client";
import { useSpring, motion } from "framer-motion";

export const CustomCursor = () => {
  // Spring config to make the element follow tightly
  const SPRING = {
    mass: 0.1,
  };

  // Card 1 springs
  const x1 = useSpring(0, SPRING);
  const y1 = useSpring(0, SPRING);
  const opacity1 = useSpring(0);

  // Card 2 springs
  const x2 = useSpring(0, SPRING);
  const y2 = useSpring(0, SPRING);
  const opacity2 = useSpring(0);

  return (
    <div className="container flex items-center justify-center gap-8">
      {/* card 1 - hello! */}
      <div
        className="w-[18rem] h-[24rem] rounded-lg border-2 border-slate-500"
        onPointerMove={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          x1.set(e.clientX - bounds.left - 16); // center horizontally
          y1.set(e.clientY - bounds.top - 16); // center vertically
        }}
        onPointerEnter={() => opacity1.set(1)}
        onPointerLeave={() => opacity1.set(0)}
      >
        <motion.div
          className="w-fit h-8 p-2 rounded-sm bg-slate-800 flex items-center justify-center"
          style={{ x: x1, y: y1, opacity: opacity1 }}
        >
          <span className="text-sm text-center text-white">Contact me</span>
        </motion.div>
      </div>

      {/* card 2 - about me */}
      <div
        className="w-[18rem] h-[24rem] rounded-lg border-2 border-slate-500"
        onPointerMove={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          x2.set(e.clientX - bounds.left - 20); // center horizontally (w-24)
          y2.set(e.clientY - bounds.top - 16); // center vertically
        }}
        onPointerEnter={() => opacity2.set(1)}
        onPointerLeave={() => opacity2.set(0)}
      >
        <motion.div
          className="w-fit h-8 p-2 rounded-sm bg-blue-800 flex items-center justify-center"
          style={{ x: x2, y: y2, opacity: opacity2 }}
        >
          <span className="text-sm text-center text-white">Schedule a call</span>
        </motion.div>
      </div>
    </div>
  );
};
