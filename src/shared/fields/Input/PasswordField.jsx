import { forwardRef, useState } from "react";

import { Button } from "@shared/ui";
import { Eye, EyeOff } from "lucide-react";

import { Input } from ".";

const PasswordField = forwardRef(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      ref={ref}
      {...props}
      rightSlot={
        <Button
          type="button"
          size="none"
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="text-slate-300 hover:text-slate-100"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Eye className="size-4.5" />
          ) : (
            <EyeOff className="size-4.5" />
          )}
        </Button>
      }
      type={showPassword ? "text" : "password"}
    />
  );
});

export default PasswordField;
