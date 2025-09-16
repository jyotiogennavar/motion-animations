import "./styles.css";

const LENGTH = 3;

export const TransformAnimations = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        <div className="w-[300px] h-[300px] border border-dashed border-gray-500 rounded-[5px] flex items-center justify-center relative">
          {/* box 1 */}
          <div className="w-[100px] h-[100px] bg-amber-500 rounded-sm rotate-45 origin-left relative">
            {/* <div className="w-[10px] h-[10px] bg-amber-200 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 z-10"/> */}
          </div>
        </div>
        {/* box 2 */}
        <div className="w-[300px] h-[300px] border border-dashed border-gray-500 rounded-[5px] flex items-center justify-center">
          <div className="orbits">
            <div className="orbit-ring orbit-ring-1"></div>
            <div className="orbit-ring orbit-ring-2"></div>
            <div className="orbit-ring orbit-ring-3"></div>
            {/* <div className="orbit-ring orbit-ring-4"></div> */}

            {/* <div className="sun"></div> */}

            {/* Planets on different orbits */}
            <div className="orbit orbit-1">
              <div className="planet planet-sm bg-slate-400"></div>
            </div>
            <div className="orbit orbit-2">
              <div className="planet planet-md bg-slate-500"></div>
            </div>
            <div className="orbit orbit-4">
              <div className="planet planet-lg bg-slate-600"></div>
            </div>
          </div>
        </div>
        <div className="w-[300px] h-[300px] border border-dashed border-gray-500 rounded-[5px] flex items-center justify-center">
          <div className="grid">
            {new Array(LENGTH).fill(0).map((_, i) => (
              <div
                className="card"
                key={i}
                style={{ "--index": LENGTH - 1 - i }}
              />
            ))}
          </div>
        </div>
        <div className="w-[300px] h-[300px] border border-dashed border-gray-500 rounded-[5px] flex items-center justify-center"></div>
      </div>
    </div>
  );
};
