interface ProgressProps {
  value?: number
  className?: string
}

export function Progress({ value = 0, className }: ProgressProps) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div className="h-full bg-teal-500 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  )
}

