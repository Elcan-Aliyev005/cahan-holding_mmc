import type * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-screen-2xl",
  full: "max-w-none",
}

export function Container({ children, className, size = "xl" }: ContainerProps) {
  return <div className={cn("container mx-auto px-4", sizeClasses[size], className)}>{children}</div>
}
