import type { MenuNav } from "./menu.types";
import {
  Home,
  Clapperboard,
  Radio,
  LibraryBig,
  History,
  Flame,
  Music2,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  BookOpen,
  Shirt,
  Mic,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
  PlayCircle,
  Tv,
  Baby,
} from "lucide-react-native";

export const primary: MenuNav[] = [
  { key: "home", label: "Home", Icon: Home },
  { key: "shorts", label: "Shorts", Icon: Clapperboard },
  { key: "subs", label: "Subscriptions", Icon: LibraryBig },
];

export const library: MenuNav[] = [
  { key: "library", label: "Library", Icon: LibraryBig },
  { key: "history", label: "History", Icon: History },
];

export const explore: MenuNav[] = [
  { key: "trending", label: "Trending", Icon: Flame },
  { key: "music", label: "Music", Icon: Music2 },
  { key: "movies", label: "Movies & TV", Icon: Film },
  { key: "live", label: "Live", Icon: Radio },
  { key: "gaming", label: "Gaming", Icon: Gamepad2 },
  { key: "news", label: "News", Icon: Newspaper },
  { key: "sports", label: "Sports", Icon: Trophy },
  { key: "learning", label: "Learning", Icon: BookOpen },
  { key: "fashion", label: "Fashion & Beauty", Icon: Shirt },
  { key: "podcasts", label: "Podcasts", Icon: Mic },
];

export const moreFrom: MenuNav[] = [
  { key: "premium", label: "YouTube Premium", Icon: PlayCircle },
  { key: "musicApp", label: "YouTube Music", Icon: Music2 },
  { key: "kids", label: "YouTube Kids", Icon: Baby },
  { key: "tv", label: "YouTube TV", Icon: Tv },
];

export const help: MenuNav[] = [
  { key: "settings", label: "Settings", Icon: Settings },
  { key: "report", label: "Report history", Icon: Flag },
  { key: "help", label: "Help", Icon: HelpCircle },
  { key: "feedback", label: "Send feedback", Icon: MessageSquare },
];
