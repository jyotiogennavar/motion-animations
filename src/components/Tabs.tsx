"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const tabs = [
  {
    label: "Home",
    value: 0,
  },

  {
    label: "About",
    value: 1,
  },

  {
    label: "Contact",
    value: 2,
  },
  {
    label: "Settings",
    value: 3,
  },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div className="">
      <ul className="flex flex-row gap-x-4 relative w-full ">
        {tabs.map((tab) => (
          <motion.li
            layout
            tabIndex={0}
            key={tab.value}
            onFocus={() => setActiveTab(tab.value)}
            onMouseOver={() => setActiveTab(tab.value)}
            onMouseLeave={() => setActiveTab(null)}
            className={clsx(
              "relative cursor-pointer px-2 py-1 text-sm outline-none transition-colors",
              activeTab === tab.value ? "text-gray-800" : "text-gray-700",
            )}
          >
            {activeTab === tab.value ? (
              <motion.div
                layoutId="highlight"
                className="absolute inset-0 rounded-lg bg-black/5"
              />
            ) : null}
            <span className="relative text-sm">{tab.label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export { Tabs };
