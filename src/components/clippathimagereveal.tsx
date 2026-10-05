import "./clippathimagereveal.css";

const IMAGES = [
  {
    src: "/images/pic1.jpg",
    label: "Chapel",
    alt: "A white wooden chapel with a rusted steeple and red trim, set against green hills.",
  },
  {
    src: "/images/pic2.jpg",
    label: "Church",
    alt: "A stone church with a conical roof, arched windows, and a staircase, set against a blue sky.",
  },
] as const;

const ClipPathImageReveal = () => {
  return (
    <div className="clip-path-image-reveal">
      {IMAGES.map((image) => (
        <button
          key={image.src}
          type="button"
          className="clip-path-image-reveal__button"
        >
          <img
            className="clip-path-image-reveal__image"
            src={image.src}
            alt={image.alt}
          />
          <span className="clip-path-image-reveal__label">{image.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ClipPathImageReveal;
