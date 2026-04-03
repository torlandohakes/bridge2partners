import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  isUser?: boolean
}

export function ChatBubble({ message, isUser = false, className, ...props }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-sm px-4 py-3 text-sm flex shadow-sm",
          isUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-neutral/5 text-foreground rounded-bl-none border border-neutral/10"
        )}
      >
        {message}
      </div>
    </div>
  )
}
