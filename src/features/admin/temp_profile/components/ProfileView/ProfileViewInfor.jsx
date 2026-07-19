export default function ProfileViewInfor({ fields }) {
  return (
    <div className="mt-10 space-y-5">
      {fields.map((field) => (
        <div key={field.value} className="border-b border-slate-700 pb-1">
          <span className="mb-3 block text-xs font-medium tracking-wider text-slate-200 uppercase">
            {field.label}
          </span>
          <span className="font-mono text-sm text-slate-100">
            {field.value}
          </span>
        </div>
      ))}
    </div>
  );
}
