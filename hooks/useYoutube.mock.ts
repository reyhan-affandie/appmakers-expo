import { useCallback, useEffect, useRef, useState } from "react";
import type { YtVideoItem } from "./useYoutube.types";

const PAGE_SIZE = 24;

/* ---------- tiny seeded RNG so results are stable across reloads ---------- */
function hashCode(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- mock pool (96 items) ---------- */
const adjectives = [
  "Top",
  "Epic",
  "Chill",
  "Insane",
  "Relaxing",
  "Ultimate",
  "Live",
  "Fresh",
  "Daily",
  "Classic",
  "Viral",
  "Hidden",
  "Pro",
  "Noob",
  "Lo-Fi",
  "Dreamy",
];
const topics = ["Hits", "Beats", "Coding", "Remix", "Gameplay", "Build", "Mix", "Playlist", "Tutorial", "Highlights", "Review", "Walkthrough", "Compilation"];
const channels = ["Moonlight Records", "Stack Ninja", "Indie Cloud", "Pixel Forge", "Dev Coffee", "Synth Wave", "Retro Arcade", "Daily Tech"];

function makePool(total = 96, seed = "yt-mock-v1"): YtVideoItem[] {
  const rnd = mulberry32(hashCode(seed));
  const pool: YtVideoItem[] = [];
  const now = Date.now();
  for (let i = 0; i < total; i++) {
    const a = adjectives[Math.floor(rnd() * adjectives.length)];
    const t = topics[Math.floor(rnd() * topics.length)];
    const ch = channels[Math.floor(rnd() * channels.length)];
    const daysAgo = Math.floor(rnd() * 365);
    const publishedAt = new Date(now - daysAgo * 86400000).toISOString();
    const id = `mock-${i + 1}`;
    // 16:9 thumbnail using Picsum with stable seed
    const thumbnail = `https://picsum.photos/seed/${encodeURIComponent(id)}/640/360`;
    pool.push({
      id,
      title: `${a} ${t} #${i + 1}`,
      channelTitle: ch ?? "Unknown Channel",
      publishedAt,
      thumbnail,
    });
  }
  return pool;
}
const MOCK_POOL = makePool(96);

/* ---------- small delay helper to mimic network ---------- */
function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    };
    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

/* ---------- the hook (same API as your real one) ---------- */
export function useYoutube(search: string) {
  const [ytItems, setYtItems] = useState<YtVideoItem[]>([]);
  const [ytNext, setYtNext] = useState<string | null>(null); // page index as string
  const [ytLoading, setYtLoading] = useState(false);
  const [ytLoadingMore, setYtLoadingMore] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(
    async (pageToken?: string, replace = false) => {
      setYtError(null);
      const pageIndex = pageToken ? parseInt(pageToken, 10) : 0;
      const isLoadMore = pageIndex > 0 && !replace;

      setYtLoading(replace && !isLoadMore);
      setYtLoadingMore(isLoadMore);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        // filter by search (case-insensitive)
        const q = (search || "").trim().toLowerCase();
        const filtered = q ? MOCK_POOL.filter((v) => v.title.toLowerCase().includes(q) || v.channelTitle.toLowerCase().includes(q)) : MOCK_POOL;

        // simulate latency
        await wait(400, controller.signal);

        const start = pageIndex * PAGE_SIZE;
        const slice = filtered.slice(start, start + PAGE_SIZE);
        const next = start + PAGE_SIZE < filtered.length ? String(pageIndex + 1) : null;

        setYtItems((prev) => (replace ? slice : [...prev, ...slice]));
        setYtNext(next);
      } catch (e: any) {
        if (e?.name !== "AbortError") setYtError(e?.message || "Mock fetch failed");
      } finally {
        setYtLoading(false);
        setYtLoadingMore(false);
      }
    },
    [search]
  );

  useEffect(() => {
    setYtItems([]);
    setYtNext(null);
    fetchPage(undefined, true);
    return () => abortRef.current?.abort();
  }, [fetchPage]);

  const ytLoadMore = useCallback(() => {
    if (ytLoading || ytLoadingMore || !ytNext) return;
    fetchPage(ytNext, false);
  }, [ytLoading, ytLoadingMore, ytNext, fetchPage]);

  const ytRefresh = useCallback(() => {
    if (!ytLoading) fetchPage(undefined, true);
  }, [fetchPage, ytLoading]);

  return {
    ytItems,
    ytNext,
    ytLoading,
    ytLoadingMore,
    ytError,
    ytLoadMore,
    ytRefresh,
  };
}
