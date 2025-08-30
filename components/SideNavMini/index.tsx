import React from "react";
import { Pressable, Text, View } from "react-native";
import { sideNavMiniStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import type { SideNavProps } from "./types";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import { primary } from "../../constants/menu";

export default function SideNavMini({
  activeKey = "home",
  onSelect,
  style,
}: SideNavProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(sideNavMiniStyles);

  const { between } = useTailwindBreakpoints();

  return (
    <View
      style={[
        styles.sideNavMiniWrapper,
        { display: between("md", "lg") ? "flex" : "none" },
        style,
      ]}
    >
      {primary.map(({ key, label, Icon }) => (
        <Pressable
          key={key}
          onPress={() => onSelect?.(key)}
          hitSlop={theme.spacing(2)}
          style={[
            styles.sideNavMiniItem,
            key === activeKey && styles.sideNavMiniItemActive,
          ]}
        >
          <Icon
            size={22}
            color={theme.colors.text}
            fill={key === activeKey ? theme.colors.text : ""}
            style={styles.sideNavMiniIcon}
          />
          <Text style={styles.sideNavMiniText} numberOfLines={1}>
            {label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
