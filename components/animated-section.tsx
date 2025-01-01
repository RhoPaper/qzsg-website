'use client'

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ className, direction = 'up', delay = 0, children, ...props }, ref) => {
    const [elementRef, isVisible] = useIntersectionObserver()

    const baseStyles = "transition-all duration-1000 opacity-0"
    const directionStyles = {
      up: "translate-y-8",
      down: "-translate-y-8",
      left: "translate-x-8",
      right: "-translate-x-8"
    }

    const visibleStyles = "opacity-100 translate-y-0 translate-x-0"

    return (
      <div
        ref={elementRef}
        className={cn(
          baseStyles,
          directionStyles[direction],
          isVisible && visibleStyles,
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AnimatedSection.displayName = "AnimatedSection"

