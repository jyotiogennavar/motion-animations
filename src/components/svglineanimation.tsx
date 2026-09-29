import "./svglineanimation.css";

const LINE_PATH =
  "M 1,75 C 1,75 29,-2 67,2 C 95,4 94,41 122,49 C 152,56 168,21 199,28 C 231,35 229,84 263,85 C 292,85 326,41 326,41";

const SVGLineAnimation = () => {
  return (
    <div className="svg-line-animation">
      <button type="button" className="svg-line-animation__button">
        <svg
          className="svg-line-animation__svg"
          viewBox="0 0 326 85"
          fill="none"
          aria-hidden="true"
        >
          <path className="svg-line-animation__background" d={LINE_PATH} />
          <path
            className="svg-line-animation__foreground"
            pathLength={100}
            d={LINE_PATH}
          />
        </svg>
        <span className="sr-only">Draw the path</span>
      </button>
    </div>
  );
};

export default SVGLineAnimation;
