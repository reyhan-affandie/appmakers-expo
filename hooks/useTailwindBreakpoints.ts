import { useWindowDimensions } from "react-native";

export const tailwindSize = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1366,
} as const;

export type Bp = keyof typeof tailwindSize;
export type BaseOrBp = "base" | Bp;

export function useTailwindBreakpoints() {
  const { width } = useWindowDimensions();
  const moreThan = (bp: Bp) => width > tailwindSize[bp];
  const moreThanEqual = (bp: Bp) => width >= tailwindSize[bp];
  const belowThan = (bp: Bp) => width < tailwindSize[bp];
  const belowThanEqual = (bp: Bp) => width <= tailwindSize[bp];
  const between = (min: Bp, max: Bp) =>
    width > tailwindSize[min] && width < tailwindSize[max];

  const sm = moreThanEqual("sm");
  const md = moreThanEqual("md");
  const lg = moreThanEqual("lg");
  const xl = moreThanEqual("xl");
  const _2xl = moreThanEqual("2xl");

  function tailwind<T extends object>(map: Partial<Record<BaseOrBp, T>>): T[] {
    const out: T[] = [];
    if (map.base) out.push(map.base);
    if (sm && map.sm) out.push(map.sm);
    if (md && map.md) out.push(map.md);
    if (lg && map.lg) out.push(map.lg);
    if (xl && map.xl) out.push(map.xl);
    if (_2xl && map["2xl"]) out.push(map["2xl"] as T);
    return out;
  }

  return {
    width,
    sm,
    md,
    lg,
    xl,
    _2xl,
    moreThan,
    moreThanEqual,
    belowThan,
    belowThanEqual,
    between,
    tailwind,
  };
}

export function tailwindYtCols(width: number) {
  if (width >= tailwindSize.lg) return 3; // ≥1024
  if (width >= tailwindSize.sm) return 2; // ≥768
  return 1; // <768
}
