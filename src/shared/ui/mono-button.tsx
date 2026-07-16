import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const monoButton = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-black font-bold uppercase transition disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        /** Solid black — primary action. Hover dims slightly. */
        solid: "bg-black text-white hover:opacity-90",
        /** Outlined white — secondary. Hover shifts to muted bg. */
        outline: "bg-white text-black hover:bg-muted",
        /** Pill (tab) active state — solid black. */
        "pill-active": "bg-black text-white",
        /** Pill (tab) inactive state — outlined with subtle hover. */
        "pill-inactive": "bg-white text-black hover:bg-black/5",
      },
      size: {
        sm: "px-3 py-1.5 text-sm tracking-wider",
        md: "px-4 py-2 text-sm tracking-widest",
        lg: "px-6 py-3.5 text-base tracking-widest",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

export interface MonoButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof monoButton> {}

export const MonoButton = forwardRef<HTMLButtonElement, MonoButtonProps>(
  function MonoButton({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(monoButton({ variant, size }), className)}
        {...props}
      />
    );
  },
);

/**
 * Helper for tabs/toggles: renders a pill with active/inactive styling
 * driven by a boolean, avoiding the `variant={active ? ... : ...}` ternary.
 */
export function MonoPill({
  active,
  className,
  ...props
}: MonoButtonProps & { active?: boolean }) {
  return (
    <MonoButton
      variant={active ? "pill-active" : "pill-inactive"}
      size="sm"
      className={className}
      {...props}
    />
  );
}
