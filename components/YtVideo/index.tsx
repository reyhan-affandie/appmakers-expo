import React, { useEffect, useRef, useState } from "react";
import { Linking, Platform, Pressable, Text, View, Animated, Easing } from "react-native";
import { Image } from "react-native";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import { ytVideoStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import { Clock4, ListPlus, EllipsisVertical, Share2 } from "lucide-react-native";
import type { YtVideoProps } from "./types";

function formatDateMDY(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}
function pseudoViewsFromId(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const raw = 5_000 + (h % 9_999_000);
  if (raw >= 1_000_000) return `${(raw / 1_000_000).toFixed(1)}M views`;
  if (raw >= 1_000) return `${Math.round(raw / 1_000)}K views`;
  return `${raw} views`;
}

export default function YtVideo({ item, onPress }: YtVideoProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(ytVideoStyles);

  const open = () => {
    if (onPress) return onPress(item.id);
    const url = `https://www.youtube.com/watch?v=${item.id}`;
    if (Platform.OS === "web") window.open(url, "_blank");
    else Linking.openURL(url).catch(() => {});
  };

  const { moreThan, belowThanEqual } = useTailwindBreakpoints();
  const br = moreThan("sm") ? theme.radius.sm : 0;

  const [active, setActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showEllipsisMenu, setShowEllipsisMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const rowOpacity = useRef(new Animated.Value(0)).current;
  const rowY = useRef(new Animated.Value(6)).current;

  // animated padding
  const basePad = moreThan("lg") ? theme.spacing(8) : 0;
  const pad = useRef(new Animated.Value(basePad)).current;

  // keep pad in sync when layout/breakpoint changes and card isn't active
  useEffect(() => {
    if (!active) pad.setValue(basePad);
  }, [basePad, active, pad]);

  const hintTO = useRef<any>(null);
  const ellipsisMenuTO = useRef<any>(null);
  const activateTO = useRef<any>(null);
  const leaveTO = useRef<any>(null);

  const hoverIn = () => {
    if (leaveTO.current) clearTimeout(leaveTO.current);
    if (hintTO.current) clearTimeout(hintTO.current);
    if (ellipsisMenuTO.current) clearTimeout(ellipsisMenuTO.current);
    if (activateTO.current) clearTimeout(activateTO.current);

    setShowHint(true);
    hintTO.current = setTimeout(() => setShowHint(false), 1200);

    setShowEllipsisMenu(true);

    activateTO.current = setTimeout(() => {
      setActive(true);
      Animated.parallel([
        Animated.timing(rowOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rowY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(pad, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }), // smooth padding
      ]).start();
    }, 1200);
  };

  const hoverOut = () => {
    if (leaveTO.current) clearTimeout(leaveTO.current);
    leaveTO.current = setTimeout(() => {
      if (hintTO.current) clearTimeout(hintTO.current);
      if (ellipsisMenuTO.current) clearTimeout(ellipsisMenuTO.current);
      if (activateTO.current) clearTimeout(activateTO.current);

      setActive(false);
      setShowHint(false);
      setShowEllipsisMenu(false);
      setShowContextMenu(false);

      Animated.parallel([
        Animated.timing(rowOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rowY, {
          toValue: 6,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(pad, {
          toValue: basePad,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }), // back smoothly
      ]).start();
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (hintTO.current) clearTimeout(hintTO.current);
      if (ellipsisMenuTO.current) clearTimeout(ellipsisMenuTO.current);
      if (activateTO.current) clearTimeout(activateTO.current);
      if (leaveTO.current) clearTimeout(leaveTO.current);
    };
  }, []);

  const views = (item as any).views ? `${(item as any).views} views` : pseudoViewsFromId(item.id);
  const date = formatDateMDY(item.publishedAt);

  return (
    <Pressable
      style={[{ padding: belowThanEqual("lg") ? theme.spacing(2) : 0 }]}
      onPress={() => {
        if (!showContextMenu) open();
      }}
      onHoverIn={hoverIn}
      onHoverOut={hoverOut}
      hitSlop={theme.spacing(1)}
    >
      <Animated.View style={[styles.ytVideoCard, active && styles.ytVideoCardHover, { padding: pad }]}>
        <View style={[styles.ytVideoThumbWrapper, { borderRadius: br, overflow: "hidden" }]}>
          <Image source={{ uri: item.thumbnail }} style={[styles.ytVideoThumb, { borderRadius: br }]} resizeMode="cover" />
          {showHint && !active && (
            <View style={styles.ytVideoHint}>
              <Text style={styles.ytVideoHintText}>Keep hovering to play</Text>
            </View>
          )}
        </View>

        <View style={styles.ytVideoMetaWrapper}>
          <View style={styles.ytVideoMetaInner}>
            <View style={styles.ytVideoMetaContent}>
              <Text style={styles.ytVideoTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.ytVideoChannel} numberOfLines={1}>
                {item.channelTitle}
              </Text>
              <Text style={styles.ytVideoSub} numberOfLines={1}>
                {views}
                {date ? ` • ${date}` : ""}
              </Text>
            </View>
            <View style={[styles.ytVideoEllipsisMenu, { display: showEllipsisMenu ? "flex" : "none" }]}>
              <Pressable
                onPress={(e: any) => {
                  e?.stopPropagation?.();
                  setShowContextMenu((v) => !v);
                }}
                onHoverIn={hoverIn}
                onHoverOut={hoverIn}
              >
                <EllipsisVertical size={20} color={theme.colors.text} />
              </Pressable>
              {showContextMenu && (
                <View style={styles.ytVideoContextMenu}>
                  <Pressable
                    onPress={(e: any) => {
                      e?.stopPropagation?.();
                      setShowContextMenu(false);
                      // TODO: add-to-queue action
                    }}
                    onHoverIn={hoverIn}
                    onHoverOut={hoverIn}
                    style={({ hovered }) => [styles.ytVideoContextMenuItem, hovered && styles.ytVideoContextMenuItemHover]}
                  >
                    <ListPlus size={16} color={theme.colors.text} />
                    <Text style={{ color: theme.colors.text }}>Add to queue</Text>
                  </Pressable>
                  <Pressable
                    onPress={(e: any) => {
                      e?.stopPropagation?.();
                      setShowContextMenu(false);
                      // TODO: share action
                    }}
                    onHoverIn={hoverIn}
                    onHoverOut={hoverIn}
                    style={({ hovered }) => [styles.ytVideoContextMenuItem, hovered && styles.ytVideoContextMenuItemHover]}
                  >
                    <Share2 size={16} color={theme.colors.text} />
                    <Text style={{ color: theme.colors.text }}>Share</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          <View style={styles.ytVideoButtonsSlot}>
            <Animated.View
              style={[styles.ytVideoButtonView, { opacity: rowOpacity, transform: [{ translateY: rowY }] }]}
              pointerEvents={active ? "auto" : "none"}
              onTouchStart={hoverIn}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverIn}
            >
              <Pressable
                style={({ hovered }) => [styles.ytVideoButton, hovered && styles.ytVideoButtonHover]}
                onPress={() => {}}
                onHoverIn={hoverIn}
                onHoverOut={hoverIn}
              >
                <Clock4 size={16} color={theme.colors.text} />
                <Text style={styles.ytVideoButtonText} numberOfLines={1}>
                  Watch later
                </Text>
              </Pressable>
              <Pressable
                style={({ hovered }) => [styles.ytVideoButton, hovered && styles.ytVideoButtonHover]}
                onPress={() => {}}
                onHoverIn={hoverIn}
                onHoverOut={hoverIn}
              >
                <ListPlus size={16} color={theme.colors.text} />
                <Text style={styles.ytVideoButtonText} numberOfLines={1}>
                  Add to queue
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
