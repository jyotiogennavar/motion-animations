"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clampedNormalize } from "@/lib/normalize";
import {
  coffees,
  getIngredientsByLayer,
  type Coffee,
} from "./coffee-data";
import "./coffee-cup.css";

/**
 * Geometry from public/round-coffee-cup.svg (viewBox 0 0 492.264 492.264).
 * The interior subpath is the hollow of the bowl. SVG Y grows downward,
 * so a full cup maps progress 0 → floor (403.944) and progress 1 → lip (74.6).
 */
const VIEWBOX_SIZE = 492.264;

const CUP_PATH =
  "M483.827,142.896c-10.058-17.654-23.346-28.058-39.51-30.913c-16.118-2.821-31.477,2.705-42.24,8.401c-1.42-14.844-3.558-29.507-6.462-43.863l-1.606-7.894H10.096L8.5,76.521C2.865,104.435,0,133.406,0,162.656c0,95.734,31.317,185.501,82.833,241.288H33.365v6h69.962h197.462h69.962v-6h-49.468c22.864-24.76,41.802-56.123,55.721-91.847c44.243-20.662,95.611-64.54,110.891-110.894C494.875,180.002,493.471,159.848,483.827,142.896z M313,403.944H91C35,353.81,6,261.8,6,162.656c0-29.8,2.4-59,8-88.056h374c5.5,29.5,7,59,7,88.056C395,261.8,360,353.81,313,403.944z M476.25,192.71C462.75,233.64,419.7,274.21,378.41,298.75C391.98,254,399.46,204.98,399.46,154.49C399.46,146.51,399.23,138.56,398.87,130.63C407.13,124.97,425.38,114.42,442.93,117.6C454.84,119.73,465.06,128.17,473.32,142.68C481.48,157.01,482.47,173.84,476.25,192.71z";

const INTERIOR_PATH =
  "M313,403.944H91C35,353.81,6,261.8,6,162.656c0-29.8,2.4-59,8-88.056h374c5.5,29.5,7,59,7,88.056C395,261.8,360,353.81,313,403.944z";

const INTERIOR_TOP = 74.6;
const INTERIOR_BOTTOM = 403.944;
const INTERIOR_HEIGHT = INTERIOR_BOTTOM - INTERIOR_TOP;
const CUP_CENTER = 200.5;

const FILL_SPRING = { type: "spring" as const, duration: 0.45, bounce: 0 };

/** Dark fills get light type; light fills get dark type. */
const inkFor = (hex: string) => {
  const value = hex.replace("#", "");
  const channel = (start: number) => parseInt(value.slice(start, start + 2), 16);
  const luminance =
    (0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4)) / 255;
  return luminance > 0.62 ? "#5c534c" : "#f6f3ee";
};

const nameSizeFor = (name: string) =>
  name.length > 14 ? 18 : name.length > 9 ? 22 : 28;

const interiorY = (progress: number) =>
  clampedNormalize(progress, 0, 1, INTERIOR_BOTTOM, INTERIOR_TOP);

const CoffeeCup = () => {
  const [drink, setDrink] = useState<Coffee>(coffees[0]);
  const reduceMotion = useReducedMotion() ?? false;
  const maskId = `cup-interior-${useId().replace(/:/g, "")}`;
  const transition = reduceMotion ? { duration: 0 } : FILL_SPRING;

  let cursor = 0;
  const layers = getIngredientsByLayer(drink).map((ingredient) => {
    const amount = ingredient.percentage;
    const start = cursor;
    const end = cursor + amount / 100;
    cursor = end;

    const y = interiorY(end);
    const bottom = interiorY(start);
    const height = Math.max(0, bottom - y);
    const overlap = start > 0 && height > 0 ? INTERIOR_HEIGHT * 0.015 : 0;

    return {
      id: ingredient.id,
      label: ingredient.name,
      color: ingredient.color,
      text: inkFor(ingredient.color),
      fillOpacity: ingredient.opacity ?? 1,
      nameSize: nameSizeFor(ingredient.name),
      amount,
      y: y - overlap,
      height: height + overlap,
      center: y + height / 2,
      labelOpacity:
        amount === 0
          ? 0
          : clampedNormalize(height, INTERIOR_HEIGHT * 0.25, INTERIOR_HEIGHT * 0.32, 0, 1),
      percentOpacity:
        amount === 0
          ? 0
          : clampedNormalize(height, INTERIOR_HEIGHT * 0.12, INTERIOR_HEIGHT * 0.18, 0, 1),
    };
  });

  return (
    <div className="coffee-cup">
      <div className="coffee-cup__menu" role="group" aria-label="Drinks">
        {coffees.map((item) => {
          const selected = item.id === drink.id;
          return (
            <button
              key={item.id}
              type="button"
              className="coffee-cup__option"
              aria-pressed={selected}
              onClick={() => setDrink(item)}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="coffee-cup__stage">
        <h1 className="coffee-cup__title">{drink.name}</h1>
        <svg
          className="coffee-cup__svg"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              maskContentUnits="userSpaceOnUse"
            >
              <path d={INTERIOR_PATH} fill="white" />
            </mask>
          </defs>

          <g mask={`url(#${maskId})`}>
            <rect x="0" y="0" width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill="#e5d0bc" />
            {layers.map((layer) => (
              <motion.rect
                key={layer.id}
                x="0"
                width={VIEWBOX_SIZE}
                fill={layer.color}
                initial={false}
                animate={{
                  y: layer.y,
                  height: layer.height,
                  opacity: layer.amount > 0 ? layer.fillOpacity : 0,
                }}
                transition={{
                  y: transition,
                  height: transition,
                  opacity: reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
              />
            ))}
            {layers.map((layer) => (
              <g key={`${layer.id}-label`}>
                <motion.text
                  x={CUP_CENTER}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={layer.text}
                  fontSize={layer.nameSize}
                  fontWeight="600"
                  initial={false}
                  animate={{
                    y:
                      layer.percentOpacity > 0
                        ? layer.center - INTERIOR_HEIGHT * 0.055
                        : layer.center,
                    opacity: layer.labelOpacity,
                  }}
                  transition={transition}
                >
                  {layer.label}
                </motion.text>
                <motion.text
                  x={CUP_CENTER}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={layer.text}
                  fontSize="24"
                  fontWeight="600"
                  initial={false}
                  animate={{
                    y:
                      layer.labelOpacity > 0
                        ? layer.center + INTERIOR_HEIGHT * 0.065
                        : layer.center,
                    opacity: layer.percentOpacity,
                  }}
                  transition={transition}
                >
                  {layer.amount}%
                </motion.text>
              </g>
            ))}
          </g>

          <path d={CUP_PATH} fill="#3a3a3a" />
        </svg>

        <ul className="coffee-cup__mix" aria-live="polite" aria-label="Ingredient mix">
          {layers.map((layer) => (
            <li
              key={layer.id}
              className="coffee-cup__stat"
              data-empty={layer.amount === 0}
            >
              <span
                className="coffee-cup__swatch"
                style={{ backgroundColor: layer.color }}
              />
              <span>{layer.label}</span>
              <strong>{layer.amount}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoffeeCup;
