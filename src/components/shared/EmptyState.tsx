import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: Readonly<EmptyStateProps>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-xs max-w-md mx-auto shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500",
        className
      )}
    >
      {icon && (
        <div className="mb-5 h-16 w-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary [&>svg]:h-7 [&>svg]:w-7 select-none">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold tracking-tight text-foreground">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6 w-full">{action}</div>}
    </div>
  );
}
