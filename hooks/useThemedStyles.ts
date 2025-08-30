import { useMemo } from "react";
import { type Theme, useTheme } from "../theme";

// Usage: const styles = useThemedStyles((t) => StyleSheet.create({ ... }));
export function useThemedStyles<T extends Record<string, any>>(
  creator: (theme: Theme) => T
): T {
  const { theme } = useTheme();
  // Recompute only when the resolved palette changes
  return useMemo(() => creator(theme), [creator, theme.isDark]);
}
