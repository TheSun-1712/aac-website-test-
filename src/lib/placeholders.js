// src/lib/placeholders.js - Resilient image resolver and fallback pool for AAC sections

export const FALLBACK_POOLS = {
  events: [
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
    "/images/AAC2.png",
    "/images/pic.webp",
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
  ],
  news: [
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
    "/images/8.webp",
    "/images/AAC1.png",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
  ],
  achievements: [
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100184/AAC-web/news_events/vishwakarma_zzzwlh.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
    "/images/AAC1.png",
    "/images/AAC3.png",
    "/images/grietlogo.png",
    "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
  ],
};

/**
 * Returns a guaranteed valid image URL, falling back to thematic pools if missing.
 */
export function resolveItemImage(imgUrl, category = "events", index = 0) {
  if (
    imgUrl &&
    typeof imgUrl === "string" &&
    imgUrl.trim() !== "" &&
    !imgUrl.includes("undefined") &&
    !imgUrl.includes("null")
  ) {
    return imgUrl;
  }

  const pool = FALLBACK_POOLS[category] || FALLBACK_POOLS.events;
  return pool[Math.abs(index) % pool.length];
}

