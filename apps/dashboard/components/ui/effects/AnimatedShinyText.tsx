import React, { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
 children: ReactNode;
 className?: string;
 shimmerWidth?: number;
}
/*children, className, shimmerWidth = 100 */

export const AnimatedShinyText = React.forwardRef<HTMLParagraphElement, AnimatedShinyTextProps>(({ children, className, shimmerWidth = 100 }, ref) => {
 return (
  <p
   ref={ref}
   style={
    {
     "--shiny-width": `${shimmerWidth}px`,
    } as CSSProperties
   }
   className={cn(
    "mx-auto max-w-md text-neutral-600 ",

    // Shine effect
    "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

    // Shine gradient
    "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80",

    className
   )}
  >
   {children}
  </p>
 );
});
