import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react'; // Assuming lucide-react for icons
import React, { useState } from 'react';

interface InputWithIconProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  id: string;
  register: any; // From react-hook-form
  error: any; // From react-hook-form
  showToggle?: boolean; // For password show/hide
}

/**
 * @component InputWithIcon
 * @param {InputWithIconProps} props - Props cho component InputWithIcon.
 * @param {React.ReactNode} props.icon - Icon hiển thị bên trái input.
 * @param {string} props.type - Loại input (e.g., "text", "password", "email").
 * @param {string} props.placeholder - Placeholder của input.
 * @param {string} props.id - ID duy nhất cho input.
 * @param {any} props.register - Hàm `register` từ `react-hook-form` để đăng ký input.
 * @param {any} props.error - Đối tượng `error` từ `react-hook-form` để hiển thị lỗi.
 * @param {boolean} [props.showToggle] - Hiển thị nút toggle (chỉ dùng cho type="password").
 * @returns {JSX.Element} Component InputWithIcon.
 */
const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  type,
  placeholder,
  id,
  register,
  error,
  showToggle,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const inputType = showToggle && isToggled ? 'text' : type;

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <Input
        id={id}
        type={inputType}
        placeholder={placeholder}
        {...register(id)}
        className={`pl-10 ${error ? 'border-red-500' : ''}`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setIsToggled(!isToggled)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {isToggled ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputWithIcon;