import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Mic, PlusCircle, Menu } from "lucide-react-native";
import { sideNavStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import type { SideNavProps } from "./types";
import { useYtScroll } from "../../hooks/useYtScroll";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import type { MenuNav } from "../../constants/menu.types";
import {
  explore,
  help,
  library,
  moreFrom,
  primary,
} from "../../constants/menu";

export default function SideNav({
  activeKey = "home",
  onSelect,
  style,
}: SideNavProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(sideNavStyles);

  useYtScroll();
  const renderItem = (it: MenuNav) => {
    const isActive = it.key === activeKey;

    return (
      <Pressable
        key={it.key}
        onPress={() => onSelect?.(it.key)}
        hitSlop={8}
        style={({ hovered }) => [
          styles.sideNavItem,
          hovered && styles.sideNavItemHover,
          isActive && styles.sideNavItemActive,
        ]}
      >
        <it.Icon
          size={18}
          color={isActive ? theme.colors.text : theme.colors.subtext}
          style={styles.sideNavItemIcon}
        />
        <Text
          style={[
            styles.sideNavItemText,
            isActive && styles.sideNavItemTextActive,
          ]}
        >
          {it.label}
        </Text>
      </Pressable>
    );
  };
  const { belowThan } = useTailwindBreakpoints();
  return (
    <View style={{ display: belowThan("2xl") ? "none" : "flex" }}>
      <View>
        <View style={styles.menu}>
          <Pressable style={styles.menuLeft} onPress={() => {}}>
            <Menu style={styles.menuIcon} size={24} color={theme.colors.text} />
          </Pressable>
          <Pressable style={styles.menuRight} onPress={() => {}}>
            <Image
              resizeMode="contain"
              style={styles.menuLogo}
              source={{
                uri: theme.isDark
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/YouTube_2024_(white_text).svg/1024px-YouTube_2024_(white_text).svg.png"
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png",
              }}
            />
          </Pressable>
        </View>
        <ScrollView
          dataSet={{ "hover-scrollbar": "1" }}
          showsVerticalScrollIndicator
          style={styles.sideNavScroll}
          contentContainerStyle={styles.sideNavContent}
        >
          {/* Primary */}
          <View style={styles.sideNavSection}>{primary.map(renderItem)}</View>

          <View style={styles.sideNavDivider} />

          {/* Library */}
          <View style={styles.sideNavSection}>{library.map(renderItem)}</View>

          <View style={styles.sideNavDivider} />

          {/* Sign in prompt */}
          <View style={styles.sideNavSigninBox}>
            <Text style={styles.sideNavSigninText}>
              Sign in to like videos, comment, and subscribe.
            </Text>
            <Pressable
              style={styles.sideNavSigninButton}
              onPress={() => onSelect?.("signin")}
            >
              <Mic size={16} color={theme.colors.text} />
              <Text style={styles.sideNavSigninButtonText}>Sign in</Text>
            </Pressable>
          </View>

          <View style={styles.sideNavDivider} />

          {/* Explore */}
          <Text style={styles.sideNavHeader}>Explore</Text>
          <View style={styles.sideNavSection}>{explore.map(renderItem)}</View>

          <View style={styles.sideNavDivider} />

          {/* Browse channels */}
          <Pressable
            onPress={() => onSelect?.("browse")}
            hitSlop={8}
            style={({ hovered }) => [
              styles.sideNavItem,
              hovered && styles.sideNavItemHover,
            ]}
          >
            <PlusCircle size={18} color={theme.colors.text} />
            <Text style={styles.sideNavItemText}>Browse channels</Text>
          </Pressable>

          <View style={styles.sideNavDivider} />

          {/* More from YouTube */}
          <Text style={styles.sideNavHeader}>More from YouTube</Text>
          <View style={styles.sideNavSection}>{moreFrom.map(renderItem)}</View>

          <View style={styles.sideNavDivider} />

          {/* Help/Settings */}
          <View style={styles.sideNavSection}>{help.map(renderItem)}</View>

          {/* Footer */}
          <View style={styles.sideNavFooter}>
            <Text style={styles.sideNavFooterLink}>About</Text>
            <Text style={styles.sideNavFooterLink}>Press</Text>
            <Text style={styles.sideNavFooterLink}>Copyright</Text>
            <Text style={styles.sideNavFooterLink}>Contact us</Text>
            <Text style={styles.sideNavFooterLink}>Creators</Text>
            <Text style={styles.sideNavFooterLink}>Advertise</Text>
            <Text style={styles.sideNavFooterLink}>Developers</Text>
          </View>
          <Text style={styles.sideNavFooterCopy}>© 2022 Google LLC</Text>
        </ScrollView>
      </View>
    </View>
  );
}
