export function buildDashboardRanking(movies) {
  return [...movies]
    .sort((a, b) => b.revenue - a.revenue)
    .map((movie, index) => ({
      ...movie,
      rank: index + 1,
    }));
}
