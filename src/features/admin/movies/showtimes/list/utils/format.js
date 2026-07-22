export const formatShowtime = (isoString) => {
  const date = new Date(isoString);

  return {
    date: date.toLocaleDateString("vi-VN"),
    time: date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }), 
  };
};