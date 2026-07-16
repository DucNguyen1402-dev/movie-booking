const generateTicketsSold = (id) => {
  return ((id * 233 + 17) % 1_000_000) + 100_000;
};

const generateTicketPrice = (id) => {
  return (((id * 97 + 31) % 7) + 8) * 10_000;

};

export const buildDashboardData = (movies) => {
  return movies.map((movie) => {
    const ticketSold = generateTicketsSold(movie.maPhim);
    const ticketPrice = generateTicketPrice(movie.maPhim);

    return {
      ...movie,
      ticketSold,
      revenue: ticketSold * ticketPrice,
    };
  });
};

