import { Platform, StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { SideNavStyles } from "./types";

export const sideNavStyles = (t: Theme) =>
  StyleSheet.create<SideNavStyles>({
    menu: {
      height: 48,
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
    },
    menuLogo: {
      width: 90,
      height: 30,
    },
    sideNavWrapper: {
      backgroundColor: t.colors.bg,
      width: 240,
    },
    sideNavScroll: {
      width: 240, // your fixed nav width
      height: Platform.OS === "web" ? ("100vh" as any) : "100%",
      maxHeight: Platform.OS === "web" ? ("100vh" as any) : undefined,
      ...(Platform.OS === "web" ? { paddingRight: 24 } : {}), // same as --sb-reserve
    },
    sideNavContent: { paddingBottom: 24 },
    sideNavSection: {
      paddingVertical: t.spacing(1),
    },
    sideNavDivider: {
      height: 1,
      backgroundColor: t.colors.border,
      marginVertical: t.spacing(1.5),
    },
    sideNavHeader: {
      color: t.colors.subtext,
      fontSize: 12,
      fontWeight: "600",
      paddingHorizontal: t.spacing(3),
      paddingVertical: t.spacing(1),
      textTransform: "uppercase",
    },

    sideNavItem: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      marginHorizontal: t.spacing(1),
      paddingHorizontal: t.spacing(2),
      borderRadius: t.radius.sm,
      gap: t.spacing(2),
    },
    sideNavItemHover: {
      backgroundColor: t.colors.border,
    },
    sideNavItemActive: {
      backgroundColor: t.colors.border,
    },

    sideNavItemTextActive: {
      color: t.colors.text,
      fontWeight: "600",
    },
    sideNavItemIcon: {
      // keep for future tweaks
    },
    sideNavItemText: {
      color: t.colors.text,
      fontSize: 14,
    },

    sideNavSigninBox: {
      marginHorizontal: t.spacing(3),
      marginVertical: t.spacing(2),
      gap: t.spacing(1),
    },
    sideNavSigninText: {
      color: t.colors.subtext,
      fontSize: 12,
      lineHeight: 18,
    },
    sideNavSigninButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing(1),
      height: 32,
      paddingHorizontal: t.spacing(3),
      borderRadius: t.radius.sm,
      borderWidth: 1,
      borderColor: t.colors.border,
      backgroundColor: t.colors.surface2,
    },
    sideNavSigninButtonText: {
      color: t.colors.text,
      fontWeight: "600",
      fontSize: 13,
    },

    sideNavFooter: {
      marginTop: t.spacing(2),
      paddingHorizontal: t.spacing(3),
      flexWrap: "wrap",
      rowGap: t.spacing(1),
      columnGap: t.spacing(2),
      flexDirection: "row",
    },
    sideNavFooterLink: {
      color: t.colors.subtext,
      fontSize: 12,
    },
    sideNavFooterCopy: {
      color: t.colors.subtext,
      fontSize: 12,
      paddingHorizontal: t.spacing(3),
      paddingVertical: t.spacing(2),
    },
  });
