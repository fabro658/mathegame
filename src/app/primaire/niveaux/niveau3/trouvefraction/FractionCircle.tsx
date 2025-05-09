import React from "react";

interface FractionCircleProps {
  numerator: number;
  denominator: number;
  fillColors: string[];
  position: { x: number; y: number };
}

export const FractionCircle = ({ numerator, denominator, fillColors, position }: FractionCircleProps) => {
  const radius = 50;
  const paths = [];

  for (let i = 0; i < denominator; i++) {
    const startAngle = (2 * Math.PI * i) / denominator;
    const endAngle = (2 * Math.PI * (i + 1)) / denominator;

    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const pathData = `
      M ${position.x},${position.y}
      L ${position.x + x1},${position.y + y1}
      A ${radius},${radius} 0 ${largeArcFlag} 1 ${position.x + x2},${position.y + y2}
      Z
    `;

    paths.push(
      <path
        key={i}
        d={pathData}
        fill={i < numerator ? fillColors[i % fillColors.length] : "#fff"}
        stroke="#000"
        strokeWidth="1"
      />
    );
  }

  return (
    <svg width={radius * 2} height={radius * 2}>
      <g transform={`translate(${radius},${radius})`}>
        {paths}
      </g>
    </svg>
  );
};

// FRACTION ILLUSTRATIONS (garde tout dans ce fichier)
export const FractionIllustration_1_2 = () => (
  <FractionCircle numerator={1} denominator={2} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_3 = () => (
  <FractionCircle numerator={1} denominator={3} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_4 = () => (
  <FractionCircle numerator={1} denominator={4} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_5 = () => (
  <FractionCircle numerator={1} denominator={5} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_6 = () => (
  <FractionCircle numerator={1} denominator={6} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_7 = () => (
  <FractionCircle numerator={1} denominator={7} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_8 = () => (
  <FractionCircle numerator={1} denominator={8} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_9 = () => (
  <FractionCircle numerator={1} denominator={9} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_1_10 = () => (
  <FractionCircle numerator={1} denominator={10} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_2_3 = () => (
  <FractionCircle numerator={2} denominator={3} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_3_4 = () => (
  <FractionCircle numerator={3} denominator={4} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_4_5 = () => (
  <FractionCircle numerator={4} denominator={5} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_5_6 = () => (
  <FractionCircle numerator={5} denominator={6} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_7_8 = () => (
  <FractionCircle numerator={7} denominator={8} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);

export const FractionIllustration_9_10 = () => (
  <FractionCircle numerator={9} denominator={10} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
);
