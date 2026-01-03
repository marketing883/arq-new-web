import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0A2463] text-white shadow hover:bg-[#0A2463]/90 focus-visible:ring-[#0A2463]",
        accent:
          "bg-[#A7FF83] text-[#0A2463] shadow hover:bg-[#A7FF83]/90 focus-visible:ring-[#A7FF83]",
        destructive:
          "bg-[#FF5964] text-white shadow-sm hover:bg-[#FF5964]/90 focus-visible:ring-[#FF5964]",
        outline:
          "border-2 border-[#0A2463] bg-transparent text-[#0A2463] shadow-sm hover:bg-[#0A2463] hover:text-white",
        secondary:
          "bg-[#1E1E24] text-white shadow-sm hover:bg-[#1E1E24]/80",
        ghost:
          "hover:bg-[#0A2463]/10 hover:text-[#0A2463]",
        link:
          "text-[#0A2463] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
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
