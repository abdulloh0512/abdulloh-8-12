import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "capitalize inline-flex items-center rounded-lg py-3 text-xs font-sans w-24 justify-center",
  {
    variants: {
      variant: {
        draft: "text-primary bg-primary/10",
        paid: "text-paid bg-paid/10",
        pending: "text-pending bg-pending/10",
        overdue: "text-alert bg-alert/10",
      },
    },
    defaultVariants: {
      variant: "draft",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
