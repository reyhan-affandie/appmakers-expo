// hooks/useYoutube.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { YtApiRes, YtVideoItem } from "./useYoutube.types";

const API_KEY = process.env.EXPO_PUBLIC_YT_API_KEY || undefined;

const pickThumb = (s: YtApiRes["items"][number]["snippet"]) =>
  s.thumbnails?.maxres?.url ||
  s.thumbnails?.high?.url ||
  s.thumbnails?.medium?.url ||
  s.thumbnails?.default?.url ||
  ""; // last resort

export function useYoutube(search: string) {
  const [ytItems, setYtItems] = useState<YtVideoItem[]>([]);
  const [ytNext, setYtNext] = useState<string | null>(null);
  const [ytLoading, setYtLoading] = useState(false);
  const [ytLoadingMore, setYtLoadingMore] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);

  // cancel in-flight requests on search change or unmount
  const abortRef = useRef<AbortController | null>(null);

  const fetchPage = useCallback(
    async (pageToken?: string, replace = false) => {
      if (!API_KEY) {
        setYtError("Missing API key. Set EXPO_PUBLIC_YT_API_KEY.");
        return;
      }

      const isLoadMore = !!pageToken && !replace;
      setYtError(null);
      setYtLoading(replace && !isLoadMore);
      setYtLoadingMore(isLoadMore);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const url = new URL("https://www.googleapis.com/youtube/v3/search");
        url.searchParams.set("part", "snippet");
        url.searchParams.set("type", "video");
        url.searchParams.set("maxResults", "24");
        url.searchParams.set("q", search || "programming");
        // Optional nice-to-haves
        url.searchParams.set("safeSearch", "none");
        url.searchParams.set("order", "relevance");
        if (pageToken) url.searchParams.set("pageToken", pageToken);
        url.searchParams.set("key", API_KEY);

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const json = (await res.json()) as YtApiRes;

        const mapped = json.items
          .map((it) => {
            const id = typeof it.id === "string" ? it.id : it.id.videoId || ""; // search API gives id.videoId
            if (!id) return null;
            const s = it.snippet;
            return {
              id,
              title: s.title,
              channelTitle: s.channelTitle,
              publishedAt: s.publishedAt,
              thumbnail: pickThumb(s),
            } as YtVideoItem;
          })
          .filter(Boolean) as YtVideoItem[];

        setYtItems((prev) => (replace ? mapped : [...prev, ...mapped]));
        setYtNext(json.nextPageToken ?? null);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setYtError(err?.message || "Failed to fetch YouTube data");
        }
      } finally {
        setYtLoading(false);
        setYtLoadingMore(false);
      }
    },
    [search]
  );

  // initial + when search changes
  useEffect(() => {
    setYtItems([]);
    setYtNext(null);
    fetchPage(undefined, true);
    return () => {
      abortRef.current?.abort();
    };
  }, [fetchPage]);

  const ytLoadMore = useCallback(() => {
    if (ytLoading || ytLoadingMore || !ytNext) return;
    fetchPage(ytNext, false);
  }, [ytLoading, ytLoadingMore, ytNext, fetchPage]);

  const ytRefresh = useCallback(() => {
    if (ytLoading) return;
    fetchPage(undefined, true);
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
