import { FractionCircle } from "./FractionCircle"; 
// adapte ce chemin si besoin

export const FractionIllustration_1_2 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={1} denominator={2} fillColors={["#8BC34A"]} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_2_3 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={2} denominator={3} fillColors={["#8BC34A", "#8BC34A"]} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_3_4 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={3} denominator={4} fillColors={["#8BC34A", "#8BC34A", "#8BC34A"]} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_4_5 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={4} denominator={5} fillColors={["#8BC34A", "#8BC34A", "#8BC34A", "#8BC34A"]} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_5_6 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={5} denominator={6} fillColors={["#8BC34A", "#8BC34A", "#8BC34A", "#8BC34A", "#8BC34A"]} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_7_8 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={7} denominator={8} fillColors={Array(7).fill("#8BC34A")} position={{ x: 60, y: 60 }} />
  </svg>
);

export const FractionIllustration_9_10 = () => (
  <svg width="120" height="120">
    <FractionCircle numerator={9} denominator={10} fillColors={Array(9).fill("#8BC34A")} position={{ x: 60, y: 60 }} />
  </svg>
);
