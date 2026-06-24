export function parseDifficultyLevel(value?: string | null): number | null {
  if (!value?.trim()) return null;

  const apples = [...value].filter((c) => c === "\u{1F34E}" || c === "\u{1F34F}");
  if (apples.length > 0) {
    const hard = apples.filter((c) => c === "\u{1F34E}").length;
    return Math.min(5, Math.max(1, hard || 1));
  }

  const t = value.toLowerCase();
  if (/опытн|высок|сложн|требовател|только\s+для\s+опытн/u.test(t)) return 5;
  if (/подготовлен|уверенн|для\s+подготовлен/u.test(t)) return 4;
  if (/начинающ|новичок|лёгк|легк|низк|семейн|мягк/u.test(t)) return 2;
  return 3;
}
