import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { homeStyles } from "./styles";
import { useThemedStyles } from "../../hooks/useThemedStyles";
import { useTheme } from "../../theme";
import SideNav from "../../components/SideNav";
import SideNavMini from "../../components/SideNavMini";
import Header from "../../components/Header";
import Chips from "../../components/Chips";
import { useYoutube } from "../../hooks/useYoutube";
//import { useYoutube } from "../../hooks/useYoutube.mock";
import YtVideo from "../../components/YtVideo";
import {
  useTailwindBreakpoints,
  tailwindYtCols,
} from "../../hooks/useTailwindBreakpoints";
import BottomNav from "../../components/BottomNav";

const Home = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(homeStyles);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [chip, setChip] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [currentMenu, setCurrentMenu] = useState("home");

  const { ytItems, ytLoadMore } = useYoutube(query || "");

  const commitSearch = useCallback(() => {
    const next = search.trim();
    if (!next) return;
    if (next === query) return;
    setQuery(next);
  }, [search, query]);

  const onContentLayout = (e: any) =>
    setContentWidth(e.nativeEvent.layout.width);

  const CATEGORIES = [
    "All",
    "News",
    "Gaming",
    "Live",
    "Podcasts",
    "Music",
    "Defense of the Ancients",
    "Mobile Legends: Bang Bang",
    "Streaming Television",
    "Tropical House",
    "Playlists",
    "Mixes",
    "Electro house music",
    "Clash Royale",
    "Bossa Nova",
    "Action-adventure games",
    "Comedy",
    "Recently uploaded",
    "Watched",
    "New to you",
  ];

  const { width, belowThan, belowThanEqual, moreThan, tailwind } =
    useTailwindBreakpoints();
  const cols = tailwindYtCols(contentWidth || width);

  return (
    <View
      style={[
        styles.container,
        {
          padding: belowThan("md") ? 0 : theme.spacing(1),
          paddingTop: moreThan("md") ? theme.spacing(1) : theme.spacing(3),
          paddingBottom: 0,
        },
      ]}
    >
      <SideNav activeKey={currentMenu} onSelect={setCurrentMenu} />
      <View style={styles.main}>
        <Header
          search={search}
          setSearch={setSearch}
          focused={focused}
          setFocused={setFocused}
          onSubmit={commitSearch}
          onMicPress={() => {}}
          onSettingsPress={() => {}}
          onSignInPress={() => {}}
        />
        <View style={[styles.contentWrapper]}>
          <SideNavMini activeKey={currentMenu} onSelect={setCurrentMenu} />
          <View style={styles.contentInner}>
            <Chips items={CATEGORIES} activeIndex={chip} onChange={setChip} />
            <View
              style={[
                styles.content,
                { padding: moreThan("sm") ? theme.spacing(2) : 0 },
              ]}
              onLayout={onContentLayout}
            >
              <FlatList
                data={ytItems}
                key={cols}
                numColumns={cols}
                keyExtractor={(it) => it.id}
                renderItem={({ item }) => (
                  <View style={styles.contentGridCell}>
                    <YtVideo item={item} />
                  </View>
                )}
                contentContainerStyle={styles.contentGridContent}
                columnWrapperStyle={
                  cols > 1 ? styles.contentGridColumn : undefined
                }
                onEndReachedThreshold={0.6}
                onEndReached={ytLoadMore}
                dataSet={{ "hover-scrollbar": "1" }}
                showsVerticalScrollIndicator
              />
            </View>
          </View>
        </View>
      </View>
      <BottomNav activeKey={currentMenu} onSelect={setCurrentMenu} />
    </View>
  );
};

export default Home;
