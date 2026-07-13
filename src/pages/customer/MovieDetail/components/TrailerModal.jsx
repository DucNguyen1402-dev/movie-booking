import { X } from "lucide-react";
import { getYoutubeEmbedUrl } from "@/utils/customer/trailer";

const TrailerModal = ({ trailer, onClose }) => {
  if (!trailer) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
        >
          <X size={20} />
        </button>
        <iframe
          src={getYoutubeEmbedUrl(trailer)}
          title="Trailer"
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
