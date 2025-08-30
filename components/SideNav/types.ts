import type { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type SideNavProps = {
  activeKey?: string;
  onSelect?: (key: string) => void;
  style?: any;
};

export type SideNavStyles = {
  menu: ViewStyle;
  menuLeft: ViewStyle;
  menuIcon: ViewStyle;
  menuRight: ViewStyle;
  menuLogo: ImageStyle;

  sideNavWrapper: ViewStyle;
  sideNavScroll: ViewStyle;
  sideNavContent: ViewStyle;
  sideNavSection: ViewStyle;
  sideNavDivider: ViewStyle;

  sideNavHeader: TextStyle;

  sideNavItem: ViewStyle;
  sideNavItemHover: ViewStyle;
  sideNavItemActive: ViewStyle;

  sideNavItemTextActive: TextStyle;
  sideNavItemIcon: ViewStyle;
  sideNavItemText: TextStyle;

  sideNavSigninBox: ViewStyle;
  sideNavSigninText: TextStyle;
  sideNavSigninButton: ViewStyle;
  sideNavSigninButtonText: TextStyle;

  sideNavFooter: ViewStyle;
  sideNavFooterLink: TextStyle;
  sideNavFooterCopy: TextStyle;
};
