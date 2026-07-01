function Dashboard() {
  return (
  
    <div className="flex-1 flex flex-col">
      {/* ========================================================= */}
      {/* 3. MAIN CONTENT CONTAINER                                 */}
      {/* ========================================================= */}
      <div className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-400 mt-1">
            Cập nhật dữ liệu thời gian thực của rạp phim.
          </p>
        </div>

        {/* --------------------------------------------------------- */}
        {/* 3.1 METRIC CARDS ZONE (Thẻ chỉ số tổng quan)             */}
        {/* --------------------------------------------------------- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Doanh thu */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                Doanh thu tháng này
              </span>
              <span className="p-2 bg-green-500/10 text-green-500 rounded-lg text-xs">
                +$
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">142,500,000đ</h3>
              <p className="text-xs text-green-500 mt-1">
                ▲ +12.5%{" "}
                <span className="text-gray-500">so với tháng trước</span>
              </p>
            </div>
          </div>

          {/* Card 2: Vé đã bán */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                Vé đã bán (Ngày)
              </span>
              <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg text-xs">
                🎟️
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">1,240</h3>
              <p className="text-xs text-blue-500 mt-1">
                ▲ +4.2% <span className="text-gray-500">so với hôm qua</span>
              </p>
            </div>
          </div>

          {/* Card 3: Phim đang chiếu */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                Phim đang hoạt động
              </span>
              <span className="p-2 bg-red-500/10 text-red-500 rounded-lg text-xs">
                🎬
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">18 Phim</h3>
              <p className="text-xs text-gray-500 mt-1">
                3 phim sắp khởi chiếu tuần tới
              </p>
            </div>
          </div>

          {/* Card 4: Thành viên mới */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">
                User đăng ký mới
              </span>
              <span className="p-2 bg-purple-500/10 text-purple-500 rounded-lg text-xs">
                👥
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">+320 ctv</h3>
              <p className="text-xs text-purple-500 mt-1">
                ▲ +18.3% <span className="text-gray-500">lượt cài app</span>
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- */}
        {/* 3.2 ANALYTICS CHARTS ZONE (Khu vực biểu đồ)               */}
        {/* --------------------------------------------------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Biểu đồ doanh thu chính (Cột lớn) */}
          <div className="lg:col-span-2 bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 min-h-87.5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-lg font-semibold text-white">
                Thống kê doanh thu chi tiết
              </h2>
              <span className="text-xs text-gray-400">
                (Biểu đồ tích hợp Chart.js / Recharts tại đây)
              </span>
            </div>
            {/* Placeholder Chart */}
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-lg mt-4 bg-[#161616]">
              <p className="text-sm text-gray-500">
                [ Line / Bar Chart Component ]
              </p>
            </div>
          </div>

          {/* Biểu đồ tròn tỷ lệ (Cột nhỏ) */}
          <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800 min-h-87.5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h2 className="text-lg font-semibold text-white">
                Tỷ lệ vé theo Thể loại
              </h2>
              <span className="text-xs text-gray-400">(Pie / Donut Chart)</span>
            </div>
            {/* Placeholder Chart */}
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-lg mt-4 bg-[#161616]">
              <p className="text-sm text-gray-500">[ Pie Chart Component ]</p>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- */}
        {/* 3.3 DATA TABLES & ACTIVITIES ZONE (Bảng dữ liệu gần đây)   */}
        {/* --------------------------------------------------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bảng danh sách vé đặt gần đây (Cột lớn) */}
          <div className="lg:col-span-2 bg-[#1e1e1e] rounded-xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-[#1a1a1a]">
              <h2 className="text-lg font-semibold text-white">
                Giao dịch vé gần đây
              </h2>
              <button className="text-xs text-red-500 hover:underline">
                Xem tất cả
              </button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 bg-[#151515]">
                    <th className="p-4 font-medium">Khách hàng</th>
                    <th className="p-4 font-medium">Phim / Rạp</th>
                    <th className="p-4 font-medium">Giá vé</th>
                    <th className="p-4 font-medium">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  <tr className="hover:bg-gray-800/20">
                    <td className="p-4">
                      <p className="font-medium text-white">Nguyễn Văn A</p>
                      <p className="text-xs text-gray-500">0901234***</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white truncate max-w-45">
                        Avatar: Dòng Chảy Của Nước
                      </p>
                      <p className="text-xs text-gray-500">Gò Vấp - Phòng 3</p>
                    </td>
                    <td className="p-4 text-white font-medium">120,000đ</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-md text-xs font-medium">
                        Thành công
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-800/20">
                    <td className="p-4">
                      <p className="font-medium text-white">Trần Thị B</p>
                      <p className="text-xs text-gray-500">0938765***</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white truncate max-w-45">
                        Conan: Tàu Ngầm Sắt Màu Đen
                      </p>
                      <p className="text-xs text-gray-500">Gò Vấp - Phòng 1</p>
                    </td>
                    <td className="p-4 text-white font-medium">95,000đ</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md text-xs font-medium">
                        Chờ thanh toán
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bảng xếp hạng Top Phim Doanh Thu (Cột nhỏ) */}
          <div className="bg-[#1e1e1e] rounded-xl border border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-800 bg-[#1a1a1a]">
              <h2 className="text-lg font-semibold text-white">
                Top 3 Phim Hot Trong Tuần
              </h2>
            </div>
            <div className="p-6 space-y-4 flex-1 justify-center flex flex-col">
              {/* Phim 1 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white truncate max-w-45">
                    1. Thor: Love and Thunder
                  </span>
                  <span className="text-gray-400 font-medium">45.2Mđ</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              {/* Phim 2 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white truncate max-w-45">
                    2. Oppenheimer
                  </span>
                  <span className="text-gray-400 font-medium">32.8Mđ</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "55%" }}
                  ></div>
                </div>
              </div>

              {/* Phim 3 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-white truncate max-w-45">
                    3. Doraemon Đêm Tối
                  </span>
                  <span className="text-gray-400 font-medium">18.4Mđ</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
