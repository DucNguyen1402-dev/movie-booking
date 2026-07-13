export const formatDate = (dateValue) => {
  if (!dateValue) return "Đang cập nhật";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Đang cập nhật";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const formatTime = (dateValue) => {
  if (!dateValue) return "--:--";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDateTime = (dateValue) => {
  if (!dateValue) return "Đang cập nhật";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Đang cập nhật";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getYoutubeEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    return "";
  }

  try {
    const urlObject = new URL(url);

    if (urlObject.hostname.includes("youtu.be")) {
      const videoId = urlObject.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    const videoId = urlObject.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch {
    return "";
  }
};