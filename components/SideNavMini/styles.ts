import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { SideNavMiniStyles } from "./types";

export const sideNavMiniStyles = (t: Theme) =>
  StyleSheet.create<SideNavMiniStyles>({
    sideNavMiniWrapper: {},
    sideNavMiniItem: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: t.spacing(2),
      borderRadius: t.radius.sm,
      gap: t.spacing(1),
    },
    sideNavMiniItemActive: { backgroundColor: t.colors.surface2 },
    sideNavMiniIcon: { marginBottom: 2 },
    sideNavMiniText: { fontSize: 11, color: t.colors.subtext },
  });
