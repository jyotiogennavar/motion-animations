import { Fragment, type CSSProperties } from "react";
import "./scroll-trigger-words.css";

const WORDS = [
  "Stay",
  "a",
  "while,",
  "and",
  "listen",
  "to",
  "the",
  "words.",
] as const;

export default function ScrollTriggerWords() {
  return (
    <div className="scroll-trigger-words">
      <div className="scroll-trigger-words__page">
        <div className="scroll-trigger-words__lead" aria-hidden />
        <h1>
          {WORDS.map((word, index) => (
            <Fragment key={word}>
              <span
                className="word"
                style={{ "--i": index + 1 } as CSSProperties}
              >
                {word}
              </span>
              {index < WORDS.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>
      </div>
    </div>
  );
}
