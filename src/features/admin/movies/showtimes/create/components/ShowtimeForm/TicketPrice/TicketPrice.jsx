import { Controller } from "react-hook-form";

import { formatCurrencyDisplay } from "@features/admin/movies/showtimes/create/utils";
import { FormLabel, Input } from "@components/admin/ui/form";

const TicketPrice = ({ control, watch, rules, isTicketPriceDisabled }) => {
  const giaVe = watch("giaVe") ?? null;
  return (
    <div className="flex flex-col gap-3">
      <FormLabel
        className={isTicketPriceDisabled ? "text-slate-300" : ""}
        htmlFor="ticket-price"
        required={true}
      >
        Giá vé
      </FormLabel>

      <Controller
        control={control}
        name="giaVe"
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <Input
                id="ticket-price"
                ref={field.ref}
                onBlur={field.onBlur}
                inputMode="numeric"
                value={formatCurrencyDisplay(field.value)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  field.onChange(rawValue);
                }}
                disabledClassName="border border-slate-600"
                disabled={isTicketPriceDisabled}
                showDisabledIcon={false}
                placeholder={
                  isTicketPriceDisabled
                    ? "Vui lòng chọn rạp chiếu trước"
                    : "Nhập giá vé (VND)"
                }
                error={fieldState.error?.message}
                rightSlot={giaVe && <span className="text-gray-200">VND</span>}
                inputClassName="text-base px-3 py-1.5 rounded-sm"
                wrapperClassName="gap-1.5"
              />
            </div>
          </>
        )}
      />
    </div>
  );
};

export default TicketPrice;
