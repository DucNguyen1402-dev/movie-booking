import {RATE_CLASSES} from "@features/admin/movies/edit/constants"

export const getRateClasses = (rate) => {
  return (
     RATE_CLASSES.find(({ max }) => rate < max)?.className ??
    "bg-green-600 focus:ring-green-600"
  );
};