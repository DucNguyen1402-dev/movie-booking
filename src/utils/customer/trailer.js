export const getYoutubeEmbedUrl = (url = "") => {
  if (!url) return "";

  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(youtubeRegex);

  if (!match?.[1]) return url;

  return `https://www.youtube.com/embed/${match[1]}`;
};
