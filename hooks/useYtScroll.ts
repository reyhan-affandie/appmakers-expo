// useYtScroll.ts
import { useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "../theme";

export function useYtScroll() {
  const { theme } = useTheme();

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const id = "hover-scrollbar-css";
    let style = document.getElementById(id) as HTMLStyleElement | null;

    const css = `
      :main{
        --sb-size: 12px;
        --sb-thumb: rgba(255,255,255,.36);
        --sb-thumb-hover: rgba(255,255,255,.56);
        --sb-track: ${theme.colors.bg};
      }
      html, body, #main { background: var(--sb-track); }
      [data-hover-scrollbar="1"],
      [data-hover-scrollbar="1"] > div {
        background: var(--sb-track);
        scrollbar-gutter: stable both-edges;
        scrollbar-width: thin;
        scrollbar-color: transparent var(--sb-track);
      }
      [data-hover-scrollbar="1"]:hover,
      [data-hover-scrollbar="1"]:hover > div {
        scrollbar-color: var(--sb-thumb) var(--sb-track);
      }
      [data-hover-scrollbar="1"]::-webkit-scrollbar,
      [data-hover-scrollbar="1"] > div::-webkit-scrollbar {
        width: var(--sb-size);
        height: var(--sb-size);
      }
      [data-hover-scrollbar="1"]::-webkit-scrollbar-track,
      [data-hover-scrollbar="1"] > div::-webkit-scrollbar-track,
      [data-hover-scrollbar="1"]::-webkit-scrollbar-corner,
      [data-hover-scrollbar="1"] > div::-webkit-scrollbar-corner {
        background: var(--sb-track);
      }
      [data-hover-scrollbar="1"]::-webkit-scrollbar-thumb,
      [data-hover-scrollbar="1"] > div::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      [data-hover-scrollbar="1"]:hover::-webkit-scrollbar-thumb,
      [data-hover-scrollbar="1"]:hover > div::-webkit-scrollbar-thumb {
        background: var(--sb-thumb);
      }
      [data-hover-scrollbar="1"]:hover::-webkit-scrollbar-thumb:hover,
      [data-hover-scrollbar="1"]:hover > div::-webkit-scrollbar-thumb:hover {
        background: var(--sb-thumb-hover);
      }
      @media (hover: none){
        [data-hover-scrollbar="1"],
        [data-hover-scrollbar="1"] > div { scrollbar-width: auto; }
      }
    `;

    if (style) {
      style.textContent = css;
    } else {
      style = document.createElement("style");
      style.id = id;
      style.textContent = css;
      document.head.appendChild(style);
    }
  }, [theme]);
}
