import type {
  InputHTMLAttributes,
} from "react";

import clsx from "clsx";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

  error?: string;
}

const Input = ({
  label,
  error,
  className,
  id,
  name,
  ...props
}: InputProps) => {
  const inputId = id || name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        className={clsx(
          "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-200",
          error &&
            "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;