import type { ReactNode } from "react";

/**
 * Разбивает заголовок для акцента: «кавычки» или длинное тире — вторая часть с градиентом.
 */
export function splitHeroTitleParts(title: string): { before: string; accent: string; after: string } | null {
  const openIdx = title.indexOf("«");
  const closeIdx = openIdx === -1 ? -1 : title.indexOf("»", openIdx + 1);
  if (openIdx !== -1 && closeIdx !== -1) {
    return {
      before: title.slice(0, openIdx),
      accent: title.slice(openIdx, closeIdx + 1),
      after: title.slice(closeIdx + 1),
    };
  }
  for (const sep of [" — ", " – ", " - "]) {
    const idx = title.indexOf(sep);
    if (idx !== -1) {
      return {
        before: title.slice(0, idx),
        accent: title.slice(idx + sep.length),
        after: "",
      };
    }
  }
  return null;
}

export function renderHeroTitle(title: string): ReactNode {
  const parts = splitHeroTitleParts(title);
  if (!parts) return title;

  const { before, accent, after } = parts;
  const hasSpaceBeforeAccent = before.length > 0 && !/\s$/.test(before);
  return (
    <>
      {before}
      {hasSpaceBeforeAccent ? " " : null}
      <span className="hero-title-accent">{accent}</span>
      {after}
    </>
  );
}
