import { Platform, StyleSheet } from "react-native";
import type { Theme } from "../../theme";
import type { YtVideoStyles } from "./types";

export const ytVideoStyles = (t: Theme) =>
  StyleSheet.create<YtVideoStyles>({
    ytVideoCard: {
      backgroundColor: "transparent",
      borderRadius: t.radius.sm,
      borderColor: t.colors.border,
    },
    ytVideoCardHover: {
      padding: 0,
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.colors.surface,
      shadowColor: t.colors.text,
      shadowOpacity: 0.2,
      shadowOffset: { width: t.spacing(1), height: t.spacing(1) },
      shadowRadius: t.spacing(2),
      zIndex: t.spacing(2),
      elevation: t.spacing(2),
    },
    ytVideoThumbWrapper: {
      width: "100%",
      aspectRatio: 16 / 9,
      gap: t.spacing(3),
    },
    ytVideoThumb: { width: "100%", height: "100%" },
    ytVideoHint: {
      position: "absolute",
      bottom: t.spacing(1),
      right: t.spacing(1),
      alignSelf: "flex-end",
      paddingHorizontal: t.spacing(2),
      height: t.spacing(6),
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    ytVideoHintText: {
      fontSize: t.spacing(2.5),
      color: "white",
      fontWeight: "600",
    },
    ytVideoMetaWrapper: { padding: t.spacing(3) },
    ytVideoMetaInner: {
      flex: 1,
      flexDirection: "row",
    },
    ytVideoMetaContent: {
      flex: 1,
    },
    ytVideoEllipsisMenu: {
      width: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    ytVideoContextMenu: {
      position: "absolute",
      top: -t.spacing(3),
      right: t.spacing(9),
      width: 150,
      zIndex: t.spacing(2),
      borderRadius: t.radius.sm,
      elevation: t.spacing(2),
      backgroundColor: t.colors.border,
    },
    ytVideoContextMenuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: t.spacing(2),
      paddingHorizontal: t.spacing(3),
      gap: t.spacing(2),
      zIndex: 8,
      elevation: 8,
      borderRadius: t.radius.sm,
    },
    ytVideoContextMenuItemHover: {
      backgroundColor: t.colors.surface2,
    },
    ytVideoTitle: {
      fontSize: t.spacing(4),
      fontWeight: "600",
      color: t.colors.text,
      lineHeight: t.spacing(5),
    },
    ytVideoChannel: {
      fontSize: t.spacing(3),
      color: t.colors.subtext,
      marginTop: 2,
    },
    ytVideoSub: {
      fontSize: t.spacing(3),
      color: t.colors.subtext,
      marginTop: 2,
    },
    ytVideoButtonsSlot: {
      height: t.spacing(10),
    },
    ytVideoButtonView: {
      flex: 1,
      flexDirection: "row",
      marginTop: t.spacing(2),
      gap: t.spacing(2),
    },
    ytVideoButton: {
      flex: 1,
      flexDirection: "row",
      height: t.spacing(9),
      borderRadius: t.radius.full,
      backgroundColor: t.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      gap: t.spacing(2),
      marginHorizontal: t.spacing(5),
    },
    ytVideoButtonHover: {
      backgroundColor: t.colors.border,
    },
    ytVideoButtonText: {
      fontSize: t.spacing(3),
      color: t.colors.text,
      fontWeight: "600",
    },
  });
