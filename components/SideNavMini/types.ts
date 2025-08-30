import type { ViewStyle, TextStyle } from "react-native";

export type SideNavProps = {
  activeKey?: string;
  onSelect?: (key: string) => void;
  style?: any;
};

export type SideNavMiniStyles = {
  sideNavMiniWrapper: ViewStyle;
  sideNavMiniItem: ViewStyle;
  sideNavMiniItemActive: ViewStyle;
  sideNavMiniIcon: ViewStyle;
  sideNavMiniText: TextStyle;
};
