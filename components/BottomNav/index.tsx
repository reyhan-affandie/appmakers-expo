import React from "react";
import { Pressable, Text, View } from "react-native";
import { bottomNavStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import type { BottomNavProps } from "./types";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import { primary } from "../../constants/menu";

export default function BottomNav({
  activeKey = "home",
  onSelect,
  style,
}: BottomNavProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(bottomNavStyles);
  const { belowThanEqual } = useTailwindBreakpoints();

  return (
    <View
      style={[
        styles.bottomNavWrapper,
        { display: belowThanEqual("md") ? "flex" : "none" },
        style,
      ]}
    >
      {primary.map(({ key, label, Icon }) => (
        <Pressable
          key={key}
          onPress={() => onSelect?.(key)}
          hitSlop={theme.spacing(2)}
          style={[
            styles.bottomNavItem,
            key === activeKey && styles.bottomNavItemActive,
          ]}
        >
          <Icon
            size={22}
            color={theme.colors.text}
            fill={key === activeKey ? theme.colors.text : ""}
            style={styles.bottomNavIcon}
          />
          <Text
            style={[
              styles.bottomNavText,
              key === activeKey && styles.bottomNavTextActive,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
