import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { Appearance, type ColorSchemeName, Platform } from "react-native";

// palettes
const lightColors = {
  bg: "#FFFFFF",
  surface: "#F9F9F9",
  surface2: "#FFFFFF",
  border: "#E5E5E5",
  text: "#0F0F0F",
  subtext: "#606060",
  placeholder: "#909090",
  focus: "#065FD4",
};

const darkColors = {
  bg: "#0F0F0F",
  surface: "#121212",
  surface2: "#222222",
  border: "#303030",
  text: "#FFFFFF",
  subtext: "#AAAAAA",
  placeholder: "#757575",
  focus: "#1C62B9",
};

export type ThemeMode = "light" | "dark" | "system";
export type Theme = {
  mode: ThemeMode;
  isDark: boolean;
  colors: typeof lightColors;
  radius: { sm: number; md: number; lg: number; full: number };
  spacing: (n: number) => number;
};

const radius = { sm: 12, md: 16, lg: 20, full: 9999 };
const spacing = (n: number) => 4 * n;

const STORAGE_KEY = "app-theme-mode";

function getStoredMode(): ThemeMode | null {
  try {
    if (Platform.OS === "web") {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw === "light" || raw === "dark" || raw === "system" ? raw : null;
    }
  } catch {}
  return null;
}

function storeMode(mode: ThemeMode) {
  try {
    if (Platform.OS === "web") {
      window.localStorage.setItem(STORAGE_KEY, mode);
    }
  } catch {}
}

const ThemeCtx = createContext<{
  theme: Theme;
  setMode: (m: ThemeMode) => void;
  toggle: () => void; // simple dark <-> light (ignores system)
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme: ColorSchemeName =
    Appearance?.getColorScheme?.() ?? "light";

  const [mode, setMode] = useState<ThemeMode>(
    () => getStoredMode() ?? "system"
  );
  const [system, setSystem] = useState<ColorSchemeName>(systemScheme);

  useEffect(() => {
    const sub = Appearance?.addChangeListener?.(({ colorScheme }) => {
      setSystem(colorScheme ?? "light");
    });
    return () => sub?.remove();
  }, []);

  useEffect(() => {
    storeMode(mode);
  }, [mode]);

  const resolved =
    mode === "system" ? (system === "dark" ? "dark" : "light") : mode;

  const value = useMemo(() => {
    const isDark = resolved === "dark";
    const colors = isDark ? darkColors : lightColors;

    const theme: Theme = {
      mode,
      isDark,
      colors,
      radius,
      spacing,
    };

    return {
      theme,
      setMode,
      toggle: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
    };
  }, [mode, resolved]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
