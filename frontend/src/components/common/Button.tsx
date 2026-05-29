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
        "w-full rounded-lg bg-primary px-4 py-3 text-white font-medium shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70",
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