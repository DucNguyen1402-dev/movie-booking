import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { bookingApi } from "@/services/customer/bookingApi";

export const useTicketRoom = (maLichChieu) => {
  return useQuery({
    queryKey: ["customer", "ticketRoom", maLichChieu],
    queryFn: async () => {
      const response = await bookingApi.getTicketRoom(maLichChieu);
      return response.data.content;
    },
    enabled: Boolean(maLichChieu),
    retry: false,
  });
};

export const useBookTickets = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ maLichChieu, danhSachVe }) => {
      const response = await bookingApi.bookTickets({
        maLichChieu,
        danhSachVe,
      });

      return response.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["customer", "ticketRoom", String(variables.maLichChieu)],
      });

      queryClient.invalidateQueries({
        queryKey: ["customer", "ticketRoom", variables.maLichChieu],
      });
    },
  });
};