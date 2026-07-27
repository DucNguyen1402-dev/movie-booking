import { useState } from "react";

import { Eye, EyeOff, Search } from "lucide-react";

import { Button } from "@components/admin/ui";
import { Input } from "@components/admin/ui/form";

export default function Playground() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-md space-y-4 bg-slate-900 p-8">
      <Input placeholder="Default" />
      <Input error="Required" />
      <Input disabled />
      <Input leftIcon={Search} inputClassName="px-7" />
      <Input
        rightSlot={
          <Button
            size="none"
            className="text-slate-300 hover:text-slate-100"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </Button>
        }
        type={showPassword ? "text" : "password"}
      />
    </div>
  );
}
