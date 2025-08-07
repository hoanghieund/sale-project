import { Input } from '@/components/ui/input'; // Import Input component từ shadcn/ui
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

interface InputDebounceProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onDebounceChange: (value: string) => void; // Đổi tên prop để tránh xung đột với onChange gốc
  debounceTime?: number; // Thời gian debounce tính bằng ms, mặc định là 500ms
}

/**
 * @component InputDebounce
 * @description Component Input với chức năng debounce, giúp trì hoãn việc cập nhật giá trị đầu vào.
 * @param {string | number} value - Giá trị hiện tại của input.
 * @param {(value: string) => void} onDebounceChange - Hàm callback được gọi khi giá trị debounce được cập nhật.
 * @param {number} [debounceTime=500] - Thời gian debounce tính bằng mili giây.
 * @param {InputHTMLAttributes<HTMLInputElement>} props - Các thuộc tính HTML input tiêu chuẩn.
 * @returns {JSX.Element} Một phần tử Input đã được debounce.
 */
const InputDebounce: React.FC<InputDebounceProps> = ({
  value,
  onDebounceChange, // Sử dụng prop mới onDebounceChange
  debounceTime = 1000, // Đặt mặc định là 1s giây theo yêu cầu
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);
  const onDebounceChangeRef = useRef(onDebounceChange);
  const debounceTimeRef = useRef(debounceTime);

  // Cập nhật ref khi props thay đổi
  useEffect(() => {
    onDebounceChangeRef.current = onDebounceChange;
  }, [onDebounceChange]);

  useEffect(() => {
    debounceTimeRef.current = debounceTime;
  }, [debounceTime]);

  /**
   * @description Đồng bộ `inputValue` với `value` prop khi `value` thay đổi từ bên ngoài.
   * Đây là cơ chế để component được kiểm soát bởi prop `value`.
   * Điều kiện `value !== inputValue` giúp tránh cập nhật không cần thiết và vòng lặp.
   */
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]); // Chỉ chạy khi prop `value` thay đổi

  /**
   * @description Thiết lập logic debounce cho `inputValue`.
   * Hàm `onDebounceChange` sẽ được gọi sau `debounceTime` mili giây
   * kể từ lần cuối `inputValue` thay đổi.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      // Sử dụng ref để gọi hàm callback, đảm bảo luôn là phiên bản mới nhất
      onDebounceChangeRef.current(String(inputValue));
    }, debounceTimeRef.current); // Sử dụng ref cho `debounceTime`

    /**
     * @description Cleanup function để hủy bỏ timeout nếu `inputValue` thay đổi
     * trước khi hết thời gian debounce. Điều này ngăn chặn việc gọi `onDebounceChange`
     * với giá trị cũ hoặc không mong muốn.
     */
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]); // Chỉ chạy lại khi `inputValue` thay đổi

  /**
   * @function handleChange
   * @description Xử lý sự kiện thay đổi của input.
   * Cập nhật trạng thái `inputValue` với giá trị mới từ người dùng.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Đối tượng sự kiện thay đổi từ input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

  return <Input value={inputValue} onChange={handleChange} {...props} />;
};

export default InputDebounce;