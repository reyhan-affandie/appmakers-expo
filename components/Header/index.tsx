import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, TouchableHighlight, View } from "react-native";
import { ArrowLeft, CircleUser, EllipsisVertical, Menu, Mic, Search } from "lucide-react-native";
import { headerBarStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import type { HeaderBarProps } from "./types";
import { useTailwindBreakpoints } from "../../hooks/useTailwindBreakpoints";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Header({ search, setSearch, focused, setFocused, onSubmit = () => {}, onMicPress, onSettingsPress, onSignInPress }: HeaderBarProps) {
  const { theme } = useTheme();
  const styles = useThemedStyles(headerBarStyles);

  const { belowThan, belowThanEqual, moreThan } = useTailwindBreakpoints();

  const [searchMobile, setSearchMobile] = useState(false);

  const closeMobile = () => {
    setSearchMobile(false);
    setFocused(false);
  };

  return (
    <View style={styles.header}>
      <View
        style={[
          styles.searchWrapper,
          {
            justifyContent: belowThan("2xl") ? "flex-start" : "center",
            paddingRight: belowThan("2xl") ? theme.spacing(2) : 0,
          },
        ]}
      >
        <View
          style={[
            styles.searchInner,
            {
              width: belowThan("2xl") ? "100%" : 600,
            },
          ]}
        >
          {/*burger menu and logo*/}
          <View style={[styles.menu, { display: belowThan("2xl") ? "flex" : "none" }]}>
            <Pressable style={[styles.menuLeft, { display: moreThan("md") ? "flex" : "none" }]} onPress={() => {}}>
              <Menu style={styles.menuIcon} size={24} color={theme.colors.text} />
            </Pressable>
            <Pressable
              style={styles.menuRight}
              onPress={() => {
                window.location.href = "/";
              }}
            >
              <Image
                accessibilityLabel="YouTube demo logo for coding challenge"
                alt="YouTube demo logo"
                resizeMode="contain"
                style={[styles.menuLogo, { display: !searchMobile ? "flex" : "none" }]}
                source={{
                  uri: theme.isDark
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/YouTube_2024_(white_text).svg/1024px-YouTube_2024_(white_text).svg.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1024px-YouTube_Logo_2017.svg.png",
                }}
              />
            </Pressable>
          </View>
          {/*mobile search icon*/}
          <View
            style={[
              styles.searchViewMobile,
              {
                display: belowThanEqual("md") && !searchMobile ? "flex" : "none",
              },
            ]}
          >
            <Pressable
              style={styles.searchButtonMobile}
              onPress={() => {
                setSearchMobile(!searchMobile);
              }}
            >
              <Search size={21} color={theme.colors.text} />
            </Pressable>
          </View>
          {/*mobile search bar*/}
          {belowThanEqual("md") && searchMobile && (
            <View style={styles.searchMobileBar}>
              <Pressable style={styles.mobileBack} onPress={closeMobile} hitSlop={8}>
                <ArrowLeft size={20} color={theme.colors.text} />
              </Pressable>

              <View style={styles.searchMobileBarInner}>
                <TextInput
                  style={styles.searchInput}
                  value={search}
                  onChangeText={setSearch}
                  inputMode="search"
                  placeholder="Search"
                  placeholderTextColor={theme.colors.placeholder}
                  onSubmitEditing={onSubmit}
                />
                <Search size={21} color={theme.colors.text} />
              </View>

              <TouchableHighlight style={styles.searchMic} onPress={onMicPress}>
                <Mic size={24} color={theme.colors.text} style={styles.searchMicIcon} />
              </TouchableHighlight>
            </View>
          )}
          {/*desktop / tablet search bar*/}
          <View style={[styles.searchView, { display: moreThan("md") ? "flex" : "none" }]}>
            <View
              style={[
                styles.searchLeft,
                {
                  borderColor: focused ? theme.colors.focus : theme.colors.border,
                  width: belowThan("2xl") ? "60%" : 600,
                  justifyContent: belowThan("2xl") ? "flex-end" : "center",
                  marginLeft: belowThan("2xl") ? theme.spacing(2) : 0,
                },
              ]}
            >
              {focused && <Search size={18} color={theme.colors.text} style={styles.searchLeftIcon} />}
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                inputMode="search"
                placeholder="Search"
                placeholderTextColor={theme.colors.placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onSubmitEditing={onSubmit}
              />
            </View>

            <Pressable style={styles.searchRight} onPress={onSubmit}>
              <Search size={20} color={theme.colors.text} />
            </Pressable>

            <TouchableHighlight style={styles.searchMic} onPress={onMicPress}>
              <Mic size={24} color={theme.colors.text} style={styles.searchMicIcon} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={styles.profileWrapper}>
        <View style={[styles.profileInner]}>
          <Pressable
            onPress={onSettingsPress}
            hitSlop={8}
            style={{
              marginHorizontal: belowThanEqual("md") ? theme.spacing(4) : 0,
            }}
          >
            <EllipsisVertical size={20} color={theme.colors.text} style={styles.profileSettings} />
          </Pressable>

          <Pressable
            style={({ hovered }) => [styles.profileButton, hovered && styles.profileButtonHover, { display: moreThan("md") ? "flex" : "none" }]}
            onPress={onSignInPress}
          >
            <CircleUser size={20} color={theme.isDark ? theme.colors.text : theme.colors.focus} style={styles.profileButtonIcon} />
            <Text style={styles.profileButtonText}>Sign in</Text>
          </Pressable>
          <ThemeSwitcher />
        </View>
      </View>
    </View>
  );
}
