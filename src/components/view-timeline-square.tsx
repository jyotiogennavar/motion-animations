import "./view-timeline-square.css";

export default function ViewTimelineSquare() {
  return (
    <div className="view-timeline-square">
      <main>
        <div className="left col">
          <div className="square" aria-hidden />
        </div>
        <div className="right col">
          <p className="line">Animate based on me!</p>
        </div>
      </main>
    </div>
  );
}
