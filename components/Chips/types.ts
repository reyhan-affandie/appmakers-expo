import type { ViewStyle, TextStyle } from "react-native";

export type ChipsProps = {
  items: string[];
  activeIndex: number;
  onChange: (i: number) => void;
  style?: any;
};

export type ChipsStyles = {
  chipWrapper: ViewStyle;
  chipScroll: ViewStyle;
  chipRow: ViewStyle;
  chipMenu: ViewStyle;
  chip: ViewStyle;
  chipActive: ViewStyle;
  chipText: TextStyle;
  chipTextActive: TextStyle;
  chipArrow: ViewStyle;
  chipLeft: ViewStyle;
  chipRight: ViewStyle;
  chipArrowInner: ViewStyle;
  chipArrowHidden: ViewStyle; // only opacity here (pointerEvents is a prop)
};
