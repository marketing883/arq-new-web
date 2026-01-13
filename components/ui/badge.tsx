import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0A2463] text-white",
        secondary:
          "border-transparent bg-gray-100 text-gray-800",
        success:
          "border-transparent bg-[#A7FF83] text-[#0A2463]",
        destructive:
          "border-transparent bg-[#FF5964] text-white",
        outline:
          "text-[#0A2463] border border-[#0A2463]",
        hot:
          "border-transparent bg-red-500 text-white",
        warm:
          "border-transparent bg-orange-500 text-white",
        nurture:
          "border-transparent bg-blue-500 text-white",
        research:
          "border-transparent bg-gray-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
