import type { ViewStyle, TextStyle } from "react-native";

export type BottomNavProps = {
  activeKey?: string;
  onSelect?: (key: string) => void;
  style?: any;
};

export type BottomNavStyles = {
  bottomNavWrapper: ViewStyle;
  bottomNavItem: ViewStyle;
  bottomNavItemActive: ViewStyle;
  bottomNavIcon: ViewStyle;
  bottomNavText: TextStyle;
  bottomNavTextActive: TextStyle;
  bottomNavAvatar: ViewStyle;
  bottomNavAvatarText: TextStyle;
};