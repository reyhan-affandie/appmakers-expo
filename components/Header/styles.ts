import { StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { HeaderBarStyles } from "./types";

export const headerBarStyles = (t: Theme) =>
  StyleSheet.create<HeaderBarStyles>({
    header: {
      flexDirection: "row",
    },
    searchWrapper: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    searchInner: {
      height: t.spacing(9),
      alignItems: "center",
      flexDirection: "row",
    },
    menu: {
      height: t.spacing(12),
      paddingHorizontal: t.spacing(2),
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing(2),
    },
    menuLeft: {
      backgroundColor: "transparent",
      padding: t.spacing(1),
      borderRadius: t.radius.full,
    },
    menuIcon: {},

    menuRight: {
      flex: 1,
      height: 30,
      justifyContent: "center",
      marginLeft: t.spacing(1),
    },
    menuLogo: {
      width: 90,
      height: 30,
    },
    searchView: {
      flex: 1,
      flexDirection: "row",
    },
    searchLeft: {
      flex: 1,
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: t.radius.lg,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      paddingHorizontal: "3%",
      alignItems: "center",
      backgroundColor: t.colors.surface,
    },
    searchLeftIcon: {
      marginRight: t.spacing(1),
    },
    searchInput: {
      outlineStyle: "none",
      fontSize: t.spacing(4),
      lineHeight: t.spacing(5),
      flex: 1,
      color: t.colors.text,
    },
    searchRight: {
      borderWidth: 1,
      borderColor: t.colors.border,
      borderTopRightRadius: t.radius.lg,
      borderBottomRightRadius: t.radius.lg,
      justifyContent: "center",
      paddingHorizontal: "3%",
      backgroundColor: t.colors.border,
    },
    searchMic: {
      width: 36,
      height: 36,
      marginLeft: t.spacing(2),
    },
    searchMicIcon: {
      borderRadius: t.radius.lg,
      padding: t.spacing(2),
      backgroundColor: t.colors.border,
    },
    searchViewMobile: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    searchButtonMobile: {
      width: "100%",
      height: "100%",
      alignItems: "flex-end",
    },
    searchMobileBar: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
    },
    mobileBack: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      marginRight: t.spacing(3),
    },
    searchMobileBarInner: {
      flex: 1,
      flexDirection: "row",
      borderWidth: 1,
      borderRadius: t.radius.lg,
      paddingHorizontal: "3%",
      alignItems: "center",
      backgroundColor: t.colors.surface2,
      borderColor: t.colors.border,
    },
    profileWrapper: {
      alignItems: "center",
    },
    profileInner: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: t.spacing(1),
      width: "100%",
      height: "100%",
    },
    profileSettings: {
      marginRight: t.spacing(2),
    },
    profileButton: {
      height: 30,
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.isDark ? t.colors.text : t.colors.focus,
      flexDirection: "row",
      paddingHorizontal: t.spacing(2),
      alignItems: "center",
    },
    profileButtonHover: {
      backgroundColor: t.isDark ? t.colors.border : "#dff1ff",
    },
    profileButtonIcon: {
      marginRight: t.spacing(1),
    },
    profileButtonText: {
      color: t.isDark ? t.colors.text : t.colors.focus,
      fontSize: 18,
      lineHeight: 22,
    },
  });
