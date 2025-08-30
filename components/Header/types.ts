import type { ViewStyle, ImageStyle, TextStyle } from "react-native";

export type HeaderBarProps = {
  search: string;
  setSearch: (t: string) => void;
  focused: boolean;
  setFocused: (v: boolean) => void;
  onSubmit?: () => void;
  onMicPress?: () => void;
  onSettingsPress?: () => void;
  onSignInPress?: () => void;
};

export type HeaderBarStyles = {
  header: ViewStyle;
  searchWrapper: ViewStyle;
  searchInner: ViewStyle;

  menu: ViewStyle;
  menuLeft: ViewStyle;
  menuIcon: ViewStyle;
  menuRight: ViewStyle;
  menuLogo: ImageStyle;

  searchView: ViewStyle;
  searchLeft: ViewStyle;
  searchLeftIcon: ViewStyle;
  searchInput: TextStyle;
  searchRight: ViewStyle;
  searchMic: ViewStyle;
  searchMicIcon: ViewStyle;

  searchViewMobile: ViewStyle;
  searchButtonMobile: ViewStyle;
  searchMobileBar: ViewStyle;
  mobileBack: ViewStyle;
  searchMobileBarInner: ViewStyle;

  profileWrapper: ViewStyle;
  profileInner: ViewStyle;
  profileSettings: ViewStyle;
  profileButton: ViewStyle;
  profileButtonHover: ViewStyle;
  profileButtonIcon: ViewStyle;
  profileButtonText: TextStyle;
};
