import { useEffect, useRef } from "react";

const rims = [
  { x: 8, y: 15, size: 180, opacity: 0.06, speed: 0.3, direction: 1 },
  { x: 88, y: 60, size: 240, opacity: 0.05, speed: 0.2, direction: -1 },
  { x: 5, y: 70, size: 140, opacity: 0.04, speed: 0.4, direction: 1 },
  { x: 92, y: 20, size: 200, opacity: 0.05, speed: 0.25, direction: -1 },
  { x: 50, y: 85, size: 160, opacity: 0.03, speed: 0.35, direction: 1 },
];

export default function RimBackground() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rimsRef = useRef(
    rims.map((r) => ({ ...r, currentAngle: 0, floatOffset: Math.random() * Math.PI * 2 }))
  );
  const frameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = (timestamp) => {
      timeRef.current = timestamp;
      const container = containerRef.current;
      if (!container) return;

      const rimEls = container.querySelectorAll(".rim-el");
      rimEls.forEach((el, i) => {
        const r = rimsRef.current[i];
        r.currentAngle += r.speed * r.direction * 0.3;

        // Floating up/down
        const floatY = Math.sin(timestamp * 0.0005 * r.speed + r.floatOffset) * 18;
        // Mouse parallax
        const parallaxX = (mouseRef.current.x - 0.5) * 30 * (i % 2 === 0 ? 1 : -1);
        const parallaxY = (mouseRef.current.y - 0.5) * 20 * (i % 2 === 0 ? 1 : -1);

        el.style.transform = `
          translate(${parallaxX}px, ${floatY + parallaxY}px)
          rotate(${r.currentAngle}deg)
        `;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {rimsRef.current.map((r, i) => (
        <div
          key={i}
          className="rim-el absolute"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            width: r.size,
            height: r.size,
            opacity: r.opacity,
            willChange: "transform",
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="95" fill="none" stroke="#b45309" strokeWidth="6" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#b45309" strokeWidth="2" />
            {/* Spokes — 5 spoke rim */}
            {[0, 72, 144, 216, 288].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 20 * Math.cos(rad);
              const y1 = 100 + 20 * Math.sin(rad);
              const x2 = 100 + 78 * Math.cos(rad);
              const y2 = 100 + 78 * Math.sin(rad);
              const lx1 = 100 + 78 * Math.cos(rad - 0.18);
              const ly1 = 100 + 78 * Math.sin(rad - 0.18);
              const lx2 = 100 + 78 * Math.cos(rad + 0.18);
              const ly2 = 100 + 78 * Math.sin(rad + 0.18);
              return (
                <g key={j}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
                  <line x1={lx1} y1={ly1} x2={x2} y2={y2} stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                  <line x1={lx2} y1={ly2} x2={x2} y2={y2} stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                </g>
              );
            })}
            {/* Center hub */}
            <circle cx="100" cy="100" r="18" fill="none" stroke="#b45309" strokeWidth="4" />
            <circle cx="100" cy="100" r="8" fill="#b45309" opacity="0.6" />
            {/* Bolt holes */}
            {[0, 72, 144, 216, 288].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              const bx = 100 + 28 * Math.cos(rad);
              const by = 100 + 28 * Math.sin(rad);
              return <circle key={j} cx={bx} cy={by} r="3" fill="#b45309" opacity="0.8" />;
            })}
          </svg>
        </div>
      ))}

      {/* Ambient glow left */}
      <div className="fixed top-[20%] -left-32 w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
      {/* Ambient glow right */}
      <div className="fixed top-[55%] -right-32 w-[500px] h-[500px] rounded-full bg-amber-800/10 blur-[120px]" />
    </div>
  );
}
