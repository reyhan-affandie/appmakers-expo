import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";

export const homeStyles = (t: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.bg,
      flexDirection: "row",
      minWidth: 0, // helps RNW in row flex
    },
    main: {
      flex: 1,
      flexDirection: "column",
    },
    contentWrapper: {
      flex: 1,
      flexDirection: "row",
      marginTop: t.spacing(3),
    },
    contentInner: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    contentGridContent: {
      gap: t.spacing(1),
      rowGap: t.spacing(1),
    },
    contentGridColumn: {
      gap: t.spacing(1),
      columnGap: t.spacing(1),
    },
    contentGridCell: {
      flex: 1,
      minWidth: 0, // important on RN Web to allow shrinking
    },
    cardWrap: { flex: 1, minWidth: 0 },
    thumb: { width: "100%", aspectRatio: 16 / 9 },
  });
