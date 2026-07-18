import React from 'react';
import { User, Mail, Shield, Film, Eye, MessageSquare, Settings } from 'lucide-react';

const Profile = () => {
  // Data mock theo đúng ngữ cảnh hệ thống Movie
  const adminData = {
    name: "Duc Nguyen",
    email: "ducnguyen@example.com",
    role: "Super Admin",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHRBRa4R-zxcpsrBBwXjarX2BRch-b7hb4vq2PKfyZFA&s=10",
    stats: [
      { id: 1, label: "Phim đã đăng", value: "142", icon: Film },
      { id: 2, label: "Lượt duyệt bình luận", value: "1,240", icon: MessageSquare },
      { id: 3, label: "Tổng view bài viết", value: "45.8K", icon: Eye },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6 text-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header/Breadcrumb */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-100">Tài khoản cá nhân</h1>
            <p className="text-xs text-gray-500 mt-1">Quản lý thông tin và hiệu suất làm việc của bạn</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-gray-300 rounded hover:bg-gray-100 transition">
            <Settings className="w-3.5 h-3.5" />
            Cài đặt
          </button>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cột trái: Card thông tin chính */}
          <div className="md:col-span-1 bg-white border border-gray-200 rounded p-6 flex flex-col items-center text-center">
            <img 
              src={adminData.avatar} 
              alt={adminData.name} 
              className="w-24 h-24 rounded-full object-cover border border-gray-100  transition duration-300"
            />
            <h2 className="text-base font-medium text-gray-900 mt-4 tracking-tight">{adminData.name}</h2>
            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[11px] font-medium uppercase tracking-wider">
              <Shield className="w-3 h-3" />
              {adminData.role}
            </span>
            
            <div className="w-full border-t border-gray-100 my-4"></div>
            
            {/* Chi tiết liên hệ viết gọn */}
            <div className="w-full text-left space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate">{adminData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <span>ID: admin_026</span>
              </div>
            </div>
          </div>

          {/* Cột phải: Thống kê hiệu suất làm việc trong dự án Movie */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {adminData.stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.id} className="bg-white border border-gray-200 rounded p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">{stat.label}</p>
                      <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-100 rounded text-gray-500">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hoạt động gần đây (Recent Activities) */}
            <div className="bg-white border border-gray-200 rounded p-6">
              <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">Hoạt động gần đây</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {[
                    { id: 1, text: "Đã cập nhật thông tin tập 12 phim 'Interstellar'", time: "2 giờ trước" },
                    { id: 2, text: "Phê duyệt 45 bình luận trong danh sách chờ", time: "5 giờ trước" },
                    { id: 3, text: "Thêm danh mục mới: 'Sci-Fi Classic'", time: "Hôm qua" },
                  ].map((activity, idx, arr) => (
                    <li key={activity.id}>
                      <div className="relative pb-6">
                        {idx !== arr.length - 1 && (
                          <span className="absolute top-4 left-2 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        )}
                        <div className="relative flex space-x-3 items-start">
                          <div>
                            <span className="h-4 w-4 rounded-full bg-gray-900 flex items-center justify-center ring-4 ring-white">
                              <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-xs text-gray-600">{activity.text}</p>
                            </div>
                            <div className="text-right text-[11px] whitespace-nowrap text-gray-400">
                              <time>{activity.time}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;