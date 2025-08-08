import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorCircleProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCircle = ({ color, isSelected, onClick }: ColorCircleProps) => {
  // Xử lý viền riêng cho màu trắng để không bị “nhem” trên nền trắng
  const isWhite = color?.toLowerCase() === "#ffffff" || color?.toLowerCase() === "white";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className={cn(
        // Dùng ring + ring-offset thay vì lồng nhiều viền để tránh răng cưa trên màn lớn
        "w-8 h-8 rounded-full border cursor-pointer flex items-center justify-center transition-shadow",
        isWhite ? "border-gray-300" : "border-transparent",
        // Với màu trắng: ring-primary để đảm bảo tương phản; các màu khác dùng màu chính của ô màu
        isSelected && (isWhite
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
          : "ring-2 ring-offset-2 ring-offset-background")
      )}
      style={{
        backgroundColor: color,
        // Dùng biến CSS của Tailwind để set màu ring động, tránh dynamic class bị purge
        ...(isSelected && !isWhite
          ? (({ ["--tw-ring-color" as any]: color } as any))
          : {}),
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {isSelected && (
        <Check className={cn("h-4 w-4", isWhite ? "text-gray-800" : "text-white")} />
      )}
    </div>
  );
};

export default ColorCircle;