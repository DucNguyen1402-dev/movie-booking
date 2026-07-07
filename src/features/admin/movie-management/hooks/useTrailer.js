import { useState } from "react";

export function useTrailer() {
  const [trailer, setTrailer] = useState({ url: null, movieName: null });

  const open = ({ url, movieName }) => setTrailer({ url, movieName });

  const close = () => setTrailer({ url: null, movieName: null });

  return {
    trailer,
    open,
    close,
  };
}
