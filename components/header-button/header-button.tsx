import { Button } from "@/components/ui/button";

interface HeaderButtonProps {
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  size: "default" | "withIcon" | "sm" | "lg" | "icon";
}

export const HeaderButton: React.FC<HeaderButtonProps> = ({
  size,
  text,
  variant,
  onClick,
  icon,
}) => {
  return (
    <Button
      size={size}
      variant={variant}
      onClick={onClick}
      className="flex flex-row justify-between gap-2">
      {icon}
      {text}
    </Button>
  );
};
