import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";

export const themeSwitcherStyles = (t: Theme) =>
  StyleSheet.create({
    switcherView: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
