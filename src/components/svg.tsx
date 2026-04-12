import SparkLine from "@/components/SparkLine";


const SVG_SIZE = 120;
const VIEW_BOX = "0 0 200 200";
const STROKE_PROPS = { stroke: "black", strokeWidth: 5, fill: "none" as const };

const svgItems = [
  {
    title: "Line",
    content: <line x1="20" y1="20" x2="180" y2="180" strokeLinecap="round"  {...STROKE_PROPS} />,
  },
  {
    title: "Circle",
    content: <circle cx="100" cy="100" r="50" {...STROKE_PROPS} />,
  },
  {
    title: "Rectangle",
    content: (
      <rect
        x="20"
        y="20"
        width="120"
        height="120"
        rx="10"
        ry="10"
        {...STROKE_PROPS}
      />
    ),
  },
  {
    title: "Triangle",
    content: (
      <polygon points="100,10 40,190 190,78" {...STROKE_PROPS} />
    ),
  },
  {
    title: "Ellipse",
    content: (
      <ellipse cx="100" cy="100" rx="50" ry="30" {...STROKE_PROPS} />
    ),
  },
  {
    title: "Polygon",
    content: (
      <polygon points="100,10 40,198 190,78 10,78" {...STROKE_PROPS} />
    ),
  },
  {
    title: "Path",
    content: (
      <path d="M100 10 L200 100 L10 100 Z" {...STROKE_PROPS} />
    ),
  },
  {
    title: "Polyline",
    content: (
      <polyline points="100,10 40,198 190,78 10,78" {...STROKE_PROPS} />
    ),
  },
] as const;

const gridItemClass =
  "w-[150px] h-[150px] border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center";

const SVGShapes = ()  => {
  return (
      <div className="grid grid-cols-4 gap-4">
        {svgItems.map(({ title, content }) => (
          <div key={title} className={gridItemClass}>
            <h2 className="text-lg font-medium">{title}</h2>
            <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={VIEW_BOX} >
              {content}
            </svg>
          </div>
        ))}
      </div>
  );
};




const SVG = () => {
  const DATA = [0, 5, 12, 11, 18, 5, 2, 13, 13, 19, 20, 10, 15, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-xl font-medium mb-8">SVG</h1>
      <SVGShapes />
      <div className="mt-8 flex flex-col items-center">
      <h2 className="text-lg font-medium mb-8">SparkLine</h2>
      <SparkLine data={DATA} />
      </div>
    
    </div>
  );
};



export default SVG;
