const SectionTitle = ({ eyebrow, title, description }) => {
  return (
    <div className="mb-8 flex flex-col gap-2">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm text-zinc-400 md:text-base">{description}</p>}
    </div>
  );
};

export default SectionTitle;
