import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "w-full rounded-md border border-blue-500 bg-[#3b82f6] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;