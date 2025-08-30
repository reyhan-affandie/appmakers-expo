export type YtVideoItem = {
  id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string; // url
};

export type YtApiRes = {
  items: Array<{
    id: { videoId?: string } | string;
    snippet: {
      title: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails?: {
        maxres?: { url: string };
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
    };
  }>;
  nextPageToken?: string;
};
