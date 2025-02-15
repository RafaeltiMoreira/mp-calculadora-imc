import { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  return (
    <button
      className="mt-6 bg-rose-500 opacity-95 hover:opacity-100 text-white font-bold w-full rounded p-3"
      {...props}
    >
      {children}
    </button>
  );
}
