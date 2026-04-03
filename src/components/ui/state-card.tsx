import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react"

export interface StateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "success" | "warning" | "error" | "info"
  title: string
  description?: string
}

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
}

export function StateCard({ type, title, description, className, ...props }: StateCardProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        "rounded-sm border p-4 flex gap-3 shadow-sm items-start",
        {
          "bg-success/10 border-success/20 text-success-foreground": type === "success",
          "bg-warning/10 border-warning/20 text-warning-foreground": type === "warning",
          "bg-error/10 border-error/20 text-error-foreground": type === "error",
          "bg-neutral/10 border-neutral/20 text-foreground": type === "info",
        },
        className
      )}
      {...props}
    >
      <Icon 
        className={cn("h-5 w-5 mt-0.5 shrink-0", {
          "text-success": type === "success",
          "text-warning": type === "warning",
          "text-error": type === "error",
          "text-neutral": type === "info",
        })} 
      />
      <div>
        <h5 className="font-medium font-heading tracking-tight leading-none mb-1 text-foreground">
          {title}
        </h5>
        {description && (
          <p className="text-sm opacity-90 text-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
