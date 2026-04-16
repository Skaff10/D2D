import { useEffect, useState, useRef } from "react";

const heroLines = [
  "Paint Correction",
  "Ceramic Coating",
  "Headlight Restoration",
  "Engine Bay Detail",
  "Exterior & Interior Detail",
];

export function HeroTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = heroLines[lineIdx % heroLines.length];

    if (!isDeleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 65 + Math.random() * 25);
    } else if (!isDeleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setLineIdx((prev) => (prev + 1) % heroLines.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, lineIdx]);

  return (
    <>
      <style>{`
        @keyframes d2d-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .d2d-hero-h1 {
          /* Scales smoothly from mobile → desktop, never wraps */
          font-size: clamp(1.8rem, 6.5vw, 5rem);
          white-space: nowrap;
          overflow: hidden;
          /* Fixed height = tallest the line ever needs — stops section jumping */
          height: clamp(2.6rem, 8.5vw, 6.5rem);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0px 2px 12px rgba(10, 9, 9, 0.99);
        }
      `}</style>

      <h1 className="goldman-regular font-bold d2d-hero-h1">
        {displayed}
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "0.8em",
            background: "#e46904",
            marginLeft: "6px",
            verticalAlign: "middle",
            borderRadius: "2px",
            flexShrink: 0,
            animation: "d2d-blink 0.7s step-end infinite",
          }}
        />
      </h1>
    </>
  );
}