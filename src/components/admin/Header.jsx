import { FaBell } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="h-20 bg-[#1e1e1e]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Search Bar */}
      <div className="w-96 relative">
        <input
          type="text"
          placeholder="Tìm kiếm phim, mã vé, người dùng..."
          className="w-full bg-[#121212] border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center space-x-8">
        {/* Filter Date Shortcut */}
        <select className="bg-[#121212] border border-gray-800 rounded-md px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-blue-600 cursor-pointer">
          <option>Hôm nay</option>
          <option>7 ngày qua</option>
          <option>Tháng này</option>
        </select>

        {/* Notification Badge */}
        <button className="p-2.5 bg-[#121212] border border-gray-800 rounded-lg text-gray-400 hover:text-white relative transition-colors cursor-pointer group">
          <FaBell className ="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-400"/>
          <span className="absolute top-1 right-1.25 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
