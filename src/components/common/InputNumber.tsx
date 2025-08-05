import { Input } from "@/components/ui/input";
import React from "react";

interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * @component InputNumber
 * @param {InputNumberProps} props - Props cho component InputNumber.
 * @param {number} props.value - Giá trị hiện tại.
 * @param {(newValue: number) => void} props.onChange - Hàm callback khi giá trị thay đổi.
 * @param {number} [props.min=1] - Giá trị tối thiểu cho phép.
 * @param {number} [props.max] - Giá trị tối đa cho phép.
 * @returns {JSX.Element} Component InputNumber.
 */
const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  min = 1,
  max,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value >= min && (max === undefined || value <= max)) {
        onChange(value);
      } else if (value < min) {
        onChange(min);
      } else if (max !== undefined && value > max) {
        onChange(max);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input type="number" value={value} onChange={handleChange} {...props} />
    </div>
  );
};

export default InputNumber;
