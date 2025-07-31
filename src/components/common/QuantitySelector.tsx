import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

/**
 * @component QuantitySelector
 * @param {QuantitySelectorProps} props - Props cho component QuantitySelector.
 * @param {number} props.quantity - Số lượng hiện tại.
 * @param {(newQuantity: number) => void} props.onQuantityChange - Hàm callback khi số lượng thay đổi.
 * @param {number} [props.min=1] - Số lượng tối thiểu cho phép.
 * @param {number} [props.max] - Số lượng tối đa cho phép.
 * @returns {JSX.Element} Component QuantitySelector.
 */
const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max,
}) => {
  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= min) {
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    if (max === undefined || newQuantity <= max) {
      onQuantityChange(newQuantity);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value >= min && (max === undefined || value <= max)) {
        onQuantityChange(value);
      } else if (value < min) {
        onQuantityChange(min);
      } else if (max !== undefined && value > max) {
        onQuantityChange(max);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-16 text-center"
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={max !== undefined && quantity >= max}
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
