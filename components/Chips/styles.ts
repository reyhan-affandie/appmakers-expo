import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { ChipsStyles } from "./types";

export const chipsStyles = (t: Theme) =>
  StyleSheet.create<ChipsStyles>({
    chipWrapper: {
      position: "relative",
      marginBottom: t.spacing(6),
    },
    chipScroll: {
      paddingHorizontal: t.spacing(2),
    },
    chipRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing(1.5),
    },
    chipMenu: {
      width: 36,
      height: 36,
      backgroundColor: t.colors.surface2,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: t.spacing(1),
    },
    chip: {
      height: 32,
      paddingHorizontal: t.spacing(3),
      borderRadius: t.radius.sm,
      backgroundColor: t.colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    chipActive: {
      backgroundColor: t.colors.text,
    },
    chipText: {
      color: t.colors.text,
      fontSize: 14,
    },
    chipTextActive: {
      color: t.colors.bg,
    },
    chipArrow: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 36,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "none",
    },
    chipLeft: { left: 0 },
    chipRight: { right: 0 },
    chipArrowInner: {
      width: 32,
      height: 32,
      borderRadius: t.radius.sm,
      borderWidth: 1,
      borderColor: t.colors.bg,
      backgroundColor: t.colors.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    chipArrowHidden: { opacity: 0, pointerEvents: "none" },
  });
