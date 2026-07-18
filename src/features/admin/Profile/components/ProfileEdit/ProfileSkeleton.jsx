

export default function ProfileSkeleton() {
  return (
    <div className=" min-h-screen  bg-linear-to-br from-slate-900 to-slate-800 p-4 text-[#E0E0E0] antialiased">
      <div className ="flex items-center justify-center mt-16">
        <div className="w-full max-w-md animate-pulse rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
   
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 h-20 w-20 rounded-full bg-slate-700" />
          <div className="mb-2 h-5 w-32 rounded-md bg-slate-700" />
          <div className="h-4 w-20 rounded-md bg-slate-700" />
        </div>

      
        <div className="space-y-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <div className="mb-2 h-3 w-16 rounded bg-slate-700" />
              <div className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900" />
            </div>
          ))}
      
          <div className="pt-2">
            <div className="h-10 w-full rounded-lg bg-slate-700" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
