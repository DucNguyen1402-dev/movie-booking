import React, { useRef, useEffect } from 'react';

export default function TimePicker({ value, onChange }) {
  // value dạng "HH:MM", ví dụ: "08:30"
  const [currentHour, currentMinute] = value ? value.split(':') : ['00', '00'];

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  // Tự động cuộn đến giá trị hiện tại khi mở picker
  useEffect(() => {
    if (hourRef.current) {
      const activeHour = hourRef.current.querySelector('[data-active="true"]');
      if (activeHour) hourRef.current.scrollTop = activeHour.offsetTop - 80;
    }
    if (minuteRef.current) {
      const activeMinute = minuteRef.current.querySelector('[data-active="true"]');
      if (activeMinute) minuteRef.current.scrollTop = activeMinute.offsetTop - 80;
    }
  }, [value]);

  const handleSelectHour = (h) => {
    onChange(`${h}:${currentMinute}`);
  };

  const handleSelectMinute = (m) => {
    onChange(`${currentHour}:${m}`);
  };

  return (
    <div className="w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl p-4 flex flex-col gap-3 select-none">
      {/* Header hiển thị thời gian đã chọn */}
      <div className="text-center py-2 bg-neutral-800/50 rounded-lg border border-neutral-800">
        <span className="text-2xl font-mono font-medium text-neutral-100">
          {currentHour}:{currentMinute}
        </span>
      </div>

      {/* Vùng chọn Giờ và Phút */}
      <div className="grid grid-cols-2 gap-2 h-48 relative">
        {/* Cột chọn Giờ */}
        <div 
          ref={hourRef}
          className="overflow-y-auto scrollbar-none snap-y snap-mandatory scroll-smooth flex flex-col gap-1 pr-1"
        >
          {hours.map((h) => {
            const isActive = h === currentHour;
            return (
              <button
                key={h}
                data-active={isActive}
                onClick={() => handleSelectHour(h)}
                className={`py-2 text-center font-mono rounded-lg transition-colors snap-center shrink-0 text-sm
                  ${isActive 
                    ? 'bg-neutral-100 text-neutral-900 font-semibold' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
              >
                {h}
              </button>
            );
          })}
        </div>

        {/* Cột chọn Phút */}
        <div 
          ref={minuteRef}
          className="overflow-y-auto scrollbar-none snap-y snap-mandatory scroll-smooth flex flex-col gap-1 pl-1 border-l border-neutral-800"
        >
          {minutes.map((m) => {
            const isActive = m === currentMinute;
            return (
              <button
                key={m}
                data-active={isActive}
                onClick={() => handleSelectMinute(m)}
                className={`py-2 text-center font-mono rounded-lg transition-colors snap-center shrink-0 text-sm
                  ${isActive 
                    ? 'bg-neutral-100 text-neutral-900 font-semibold' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'}`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}