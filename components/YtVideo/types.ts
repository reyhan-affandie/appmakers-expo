import type { ViewStyle, ImageStyle, TextStyle } from "react-native";
import type { YtVideoItem } from "../../hooks/useYoutube.types";

export type YtVideoProps = {
  item: YtVideoItem;
  onPress?: (id: string) => void;
};

export type YTThumb = {
  url: string;
  width?: number;
  height?: number;
};

export type YTThumbs = {
  default?: YTThumb;
  medium?: YTThumb;
  high?: YTThumb;
};

export interface YTSnippet {
  publishedAt: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnails: YTThumbs;
}

export interface YTItem {
  id: { videoId: string };
  snippet: YTSnippet;
}

export type YtVideoStyles = {
  ytVideoCard: ViewStyle;
  ytVideoCardHover: ViewStyle;

  ytVideoThumbWrapper: ViewStyle;
  ytVideoThumb: ImageStyle;
  ytVideoHint: ViewStyle;
  ytVideoHintText: TextStyle;

  ytVideoMetaWrapper: ViewStyle;
  ytVideoMetaInner: ViewStyle;
  ytVideoMetaContent: ViewStyle;

  ytVideoEllipsisMenu: ViewStyle;
  ytVideoContextMenu: ViewStyle;
  ytVideoContextMenuItem: ViewStyle;
  ytVideoContextMenuItemHover: ViewStyle;

  ytVideoTitle: TextStyle;
  ytVideoChannel: TextStyle;
  ytVideoSub: TextStyle;

  ytVideoButtonsSlot: ViewStyle;
  ytVideoButtonView: ViewStyle;
  ytVideoButton: ViewStyle;
  ytVideoButtonHover: ViewStyle;
  ytVideoButtonText: TextStyle;
};
