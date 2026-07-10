import { Controller } from "react-hook-form";

export function formatCurrencyDisplay(value) {
  if (!value) return "";

  return Number(value).toLocaleString("vi-VN");
}

export default function TicketPrice({ control,watch, validationRules, isTicketPriceDisabled }) {

  const giaVe = watch("giaVe") ?? null;
  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="ticket-price"
      >
        Giá vé
      </label>

      <Controller
        control={control}
        name="giaVe"
        rules={validationRules}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <input
                type="text"
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                inputMode="numeric"
                id="ticket-price"
                value={formatCurrencyDisplay(field.value)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  field.onChange(rawValue);
                }}
                disabled ={isTicketPriceDisabled}
                placeholder={isTicketPriceDisabled ? "Vui lòng chọn rạp chiếu trước": "Nhập giá vé (VND)"}
                className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
              />
             { giaVe && <div className="absolute top-1/2 right-2 -translate-y-1/2">
                <span className="text-gray-500">VND</span>
              </div>}
            </div>
            {fieldState.error && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
