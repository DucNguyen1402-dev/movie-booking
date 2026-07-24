import { useEffect, useRef } from "react";

export default function TimePicker({
  value,
  onChange,
  timePickerVisible,
  timePickerRef,
}) {
  const [currentHour, currentMinute] = value ? value.split(":") : ["00", "00"];
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
  );

  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  useEffect(() => {
    if (hourRef.current) {
      const activeHour = hourRef.current.querySelector(
        '[data-active-time="true"]',
      );
      if (activeHour) hourRef.current.scrollTop = activeHour.offsetTop - 80;
    }

    if (minuteRef.current) {
      const activeMinute = minuteRef.current.querySelector(
        '[data-active-time ="true"]',
      );
      if (activeMinute)
        minuteRef.current.scrollTop = activeMinute.scrollTop - 80;
    }
  }, [value]);

  const handleSelectHour = (hour) => onChange(`${hour}:${currentMinute}`);
  const handleSelectMinute = (minute) => onChange(`${currentHour}:${minute}`);

  return (
    <div
      ref={timePickerRef}
      className={`absolute top-[102%] left-0 z-20 rounded-md border border-slate-600 transition-opacity duration-300 ${timePickerVisible ? "" : "pointer-events-none opacity-0"}`}
    >
      <div className="h-64 space-y-4 overflow-hidden rounded-md bg-slate-800 px-4 py-3 text-white">
        <div className="flex items-center justify-between gap-2 rounded-full bg-slate-900 px-8 py-1 text-lg">
          <span>{currentHour}</span>
          <span className="font-bold">:</span>
          <span>{currentMinute}</span>
        </div>
        <div className="flex h-45 justify-between py-2">
          <div
            className="snap-mandator flex snap-y scrollbar-none flex-col gap-2 overflow-y-scroll scroll-smooth"
            ref={hourRef}
          >
            {hours.map((hour) => {
              const isActive = hour === currentHour;
              return (
                <button
                  key={hour}
                  data-ative-time={isActive}
                  onClick={() => handleSelectHour(hour)}
                  className={`rounded-full border-none px-5 py-0.75 text-sm transition-colors duration-200 ${isActive ? "bg-blue-500 text-slate-50" : "cursor-pointer text-slate-200 hover:bg-blue-400 hover:text-slate-50"}`}
                >
                  {hour}
                </button>
              );
            })}
          </div>
          <div className="mx-5 min-h-full w-0.5 rounded-full bg-slate-100"></div>
          <div
            className="snap-mandator flex h-full snap-y scrollbar-none flex-col gap-2 overflow-y-scroll scroll-smooth"
            ref={minuteRef}
          >
            {minutes.map((minute) => {
              const isActive = minute === currentMinute;
              return (
                <button
                  key={minute}
                  data-ative-time={isActive}
                  onClick={() => handleSelectMinute(minute)}
                  className={`rounded-full border-none px-5 py-0.75 text-sm transition-colors duration-200 ${isActive ? "bg-blue-500 text-slate-50" : "cursor-pointer text-slate-200 hover:bg-blue-400 hover:text-slate-50"}`}
                >
                  {minute}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
