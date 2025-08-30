import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { BottomNavStyles } from "./types";

export const bottomNavStyles = (t: Theme) =>
  StyleSheet.create<BottomNavStyles>({
    bottomNavWrapper: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 56,
      backgroundColor: t.colors.surface,
      borderTopWidth: 1,
      borderTopColor: t.colors.border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },

    bottomNavItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: t.spacing(2),
      borderRadius: t.radius.sm,
    },
    bottomNavItemActive: {},

    bottomNavIcon: { marginBottom: 2 },

    bottomNavText: { fontSize: 11, color: t.colors.subtext },
    bottomNavTextActive: { color: t.colors.text, fontWeight: "600" },

    bottomNavAvatar: {
      width: 24,
      height: 24,
      borderRadius: t.radius.full,
      backgroundColor: t.colors.surface2,
      alignItems: "center",
      justifyContent: "center",
    },
    bottomNavAvatarText: {
      fontSize: 12,
      color: t.colors.text,
      fontWeight: "600",
    },
  });
