import React, { useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from "react-native";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react-native";
import { chipsStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import type { ChipsProps } from "./types";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";

export default function Chips({
  items,
  activeIndex,
  onChange,
  style,
}: ChipsProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(chipsStyles);

  const ref = useRef<ScrollView>(null);
  const [contentW, setContentW] = useState(0);
  const [layoutW, setLayoutW] = useState(0);
  const [x, setX] = useState(0);

  const canLeft = x > 2;
  const canRight = x + layoutW < contentW - 2;
  const step = useMemo(
    () => Math.max(120, Math.floor(layoutW * 0.8)),
    [layoutW]
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setX(e.nativeEvent.contentOffset.x);
  };

  const scrollBy = (dx: number) => {
    if (!ref.current) return;
    const next = Math.max(0, Math.min(x + dx, Math.max(0, contentW - layoutW)));
    ref.current.scrollTo({ x: next, y: 0, animated: true });
  };

  const { belowThanEqual } = useTailwindBreakpoints();

  return (
    <View
      style={[
        styles.chipWrapper,
        {
          marginLeft: belowThanEqual("md") ? 0 : theme.spacing(12),
          marginRight: belowThanEqual("md") ? 0 : theme.spacing(8),
          borderWidth: belowThanEqual("md") ? 1 : 0,
          borderColor: belowThanEqual("md") ? theme.colors.border : "",
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingHorizontal: belowThanEqual("md") ? theme.spacing(2) : 0,
          paddingVertical: belowThanEqual("md") ? theme.spacing(2) : 0,
        },
        style,
      ]}
    >
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(w) => setContentW(w)}
        onLayout={(e) => setLayoutW(e.nativeEvent.layout.width)}
      >
        <Pressable
          onPress={() => console.log("chipMenu clicked")}
          style={[
            styles.chipMenu,
            { display: belowThanEqual("md") ? "flex" : "none" },
          ]}
          hitSlop={8}
        >
          <Compass size={24} color={theme.colors.text} />
        </Pressable>
        {items.map((label, i) => {
          const active = i === activeIndex;
          return (
            <Pressable
              key={label}
              onPress={() => onChange(i)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Pressable
        onPress={() => scrollBy(-step)}
        style={[
          styles.chipArrow,
          styles.chipLeft,
          !canLeft && styles.chipArrowHidden,
        ]}
        hitSlop={8}
      >
        <View style={styles.chipArrowInner}>
          <ChevronLeft size={16} color={theme.colors.text} />
        </View>
      </Pressable>

      <Pressable
        onPress={() => scrollBy(step)}
        style={[
          styles.chipArrow,
          styles.chipRight,
          !canRight && styles.chipArrowHidden,
        ]}
        hitSlop={8}
      >
        <View style={styles.chipArrowInner}>
          <ChevronRight size={20} color={theme.colors.text} />
        </View>
      </Pressable>
    </View>
  );
}
