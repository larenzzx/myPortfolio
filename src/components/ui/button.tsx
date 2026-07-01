import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-ink text-bg border border-gray-200/10 hover:opacity-95",
        outline: "border border-gray-200 dark:border-gray-800 bg-bg text-ink hover:bg-gray-100/70",
        secondary: "bg-gray-100 text-ink hover:bg-gray-200 border border-transparent",
        ghost: "text-gray-500 hover:bg-gray-100/70 hover:text-ink border border-transparent",
        link: "text-ink underline-offset-4 hover:underline",
        build: "border border-build/20 bg-build/5 text-build hover:bg-build/10",
        defend: "border border-defend/20 bg-defend/5 text-defend hover:bg-defend/10",
        support: "border border-support/20 bg-support/5 text-support hover:bg-support/10",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-[11px]",
        lg: "h-10 rounded-2xl px-8",
        icon: "h-9 w-9",
        xs: "h-7 rounded-lg px-2.5 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
