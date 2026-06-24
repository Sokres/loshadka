export function toVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const id =
        parsed.hostname.includes("youtu.be")
          ? parsed.pathname.slice(1)
          : parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
    }

    if (parsed.hostname.includes("rutube.ru")) {
      const match = parsed.pathname.match(/\/video\/([a-f0-9]+)/i);
      return match ? `https://rutube.ru/play/embed/${match[1]}?autoplay=1` : null;
    }

    if (parsed.hostname.includes("vk.com") || parsed.hostname.includes("vkvideo.ru")) {
      return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
    }

    return url;
  } catch {
    return null;
  }
}
