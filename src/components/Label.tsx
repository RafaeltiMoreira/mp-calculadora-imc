import { LabelHTMLAttributes } from "react";

export function Label({
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
}) {
  return (
    <label className="block text-neutral-600 text-sm" {...props}>
      {children}
    </label>
  );
}
