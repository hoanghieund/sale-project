import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorCircleProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorCircle = ({ color, isSelected, onClick }: ColorCircleProps) => {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full border cursor-pointer flex items-center justify-center",
        {
          "border": isSelected,
        }
      )}
      style={{
        backgroundColor: color,
        borderColor: isSelected ? color : undefined,
      }}
      onClick={onClick}
    >
      {isSelected && (
        <div
          className={`w-7 h-7 border-2 rounded-full flex items-center justify-center ${
            color === "#FFFFFF" || color === "white" ? "border-gray-800" : "border-white"
          }`}
        >
          <Check className={`h-4 w-4 ${color === "#FFFFFF" || color === "white" ? "text-gray-800" : "text-white"}`} />
        </div>
      )}
    </div>
  );
};

export default ColorCircle;