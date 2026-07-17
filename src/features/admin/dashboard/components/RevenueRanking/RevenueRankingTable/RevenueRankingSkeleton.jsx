export default function RevenueRankingSkeleton() {
  return [...Array(8)].map((_, index) => (
    <tr key ={index} className ="animate-pulse border-b border-slate-700 ">
      <td className="px-8 ">
        <div className="h-6 w-20 rounded-md bg-slate-700" />
      </td>
      <td className="pl-8 py-4">
        <div className="h-20 w-18 rounded-md bg-slate-700" />
      </td>
      <td className="px-8">
        <div className="h-6 w-50 rounded-md bg-slate-700" />
      </td>
      <td className="px-4 ">
        <div className="h-6 w-25 rounded-md bg-slate-700" />
      </td>
      <td className="px-4">
        <div className ="flex items-center justify-center">
            <div className="h-10 w-35 rounded-md bg-slate-700" />
        </div>
      </td>
      <td className="px-4">
        <div className="h-5 w-60 rounded-md bg-slate-700" />
      </td>
    </tr>
  ));
}
