import React from "react";
import { Pressable } from "react-native";
import { Sun, Moon } from "lucide-react-native";
import { themeSwitcherStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";

export default function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  const styles = useThemedStyles(themeSwitcherStyles);
  const { moreThan } = useTailwindBreakpoints();

  return (
    <Pressable
      onPress={toggle}
      hitSlop={8}
      style={[
        styles.switcherView,
        { marginHorizontal: moreThan("md") ? theme.spacing(7) : 0 },
      ]}
      accessibilityLabel="Toggle theme"
    >
      {theme.isDark ? (
        <Sun size={24} color={theme.colors.text} fill={"#FFDF22"} />
      ) : (
        <Moon size={24} color={theme.colors.text} fill={"#B7CBD9"} />
      )}
    </Pressable>
  );
}
