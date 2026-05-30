import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, name, type, ...props }, ref) => {
    const inputId = id || name;

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={clsx(
              "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-200",
              isPassword && "pr-12",
              error && "border-red-500 focus:border-red-500 focus:ring-red-200",
              className,
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
