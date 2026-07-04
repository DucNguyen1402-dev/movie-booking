// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { editMovie } from "@services/admin/api";

// export function useEditMovie() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: editMovie,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["movies"],
//       });
//     },
//   });
// }