import { CloseButton } from "@components/admin";
import { useMovieListContext } from "@features/admin/movies/list/contexts";

export default function TrailerModal() {
  const {
    trailer: { close, trailer },
  } = useMovieListContext();

  const embedUrl = trailer.url
    ? trailer.url.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-zinc-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {trailer.movieName} Trailer
          </h2>
        </div>

        <div className="absolute top-2 right-2">
          <CloseButton onClick={() => close()} surface="dark" size="xs" />
        </div>
  
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={trailer.movieName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
