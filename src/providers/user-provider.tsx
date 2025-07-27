import { UserContext, UserContextType } from "@/context/user-context";
import React, { useEffect, useReducer } from "react";
// Sử dụng hook useToast từ hooks/use-toast
import { useToast } from "@/hooks/use-toast";
import { authService } from "../services/authService";
import { User } from "../types";

interface RegisterData {
  id?: number;
  username: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  file?: string;
  address?: string;
  roles?: { id: number; name: string }[];
  roleId?: number[];
  active?: number;
  dayOfBirth?: number;
  monthOfBirth?: number;
  yearOfBirth?: number;
  date?: string;
  gender?: boolean;
  shopName?: string;
  newAccount?: boolean;
}

type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE_START" }
  | { type: "UPDATE_PROFILE_SUCCESS"; payload: User }
  | { type: "UPDATE_PROFILE_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "LOAD_USER"; payload: User };

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
    case "UPDATE_PROFILE_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  // Sử dụng hook useToast để hiển thị thông báo
  const { toast } = useToast();

  // Load user từ token và API khi component mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      // Nếu có token, thử lấy thông tin user từ API
      if (token) {
        try {
          dispatch({ type: "LOGIN_START" });
          const userData = await authService.getCurrentUser();
          dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        } catch (error) {
          // Sử dụng toast thay vì console.error
          toast({
            title: "Lỗi xác thực",
            description: "Lỗi khi lấy thông tin người dùng",
            variant: "destructive",
          });

          // Nếu token hết hạn hoặc không hợp lệ, thử refresh token
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await authService.refreshToken(refreshToken);
              localStorage.setItem("token", response.token);

              // Thử lấy thông tin user lần nữa với token mới
              const userData = await authService.getCurrentUser();
              dispatch({ type: "LOGIN_SUCCESS", payload: userData });
            } catch (refreshError) {
              // Sử dụng toast thay vì console.error
              toast({
                title: "Lỗi xác thực",
                description: "Không thể làm mới phiên đăng nhập",
                variant: "destructive",
              });
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              dispatch({ type: "LOGOUT" });
            }
          } else {
            localStorage.removeItem("token");
            dispatch({ type: "LOGOUT" });
          }
        }
      }
    };

    loadUser();
  }, []);

  // Không cần lưu user vào localStorage vì chúng ta sẽ sử dụng token để lấy thông tin user từ API

  /**
   * Đăng nhập người dùng với email/username và mật khẩu
   * @param email - Email hoặc username
   * @param password - Mật khẩu
   */
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Gọi API đăng nhập thông qua authService
      const response = await authService.login(email, password);

      // Lưu token vào localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      // Lấy thông tin user từ response
      const user = response;

      // Cập nhật state với thông tin user
      dispatch({ type: "LOGIN_SUCCESS", payload: user });

      // Hiển thị thông báo thành công với useToast
      toast({
        title: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập vào hệ thống",
        variant: "default",
      });

      return user;
    } catch (error) {
      // Xử lý lỗi và cập nhật state
      const errorMessage =
        error.response?.data?.message || "Đăng nhập thất bại";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });

      // Hiển thị thông báo lỗi với useToast
      toast({
        title: "Đăng nhập thất bại",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Đăng ký người dùng mới
   * @param userData - Thông tin đăng ký
   */
  const register = async (userData: RegisterData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Gọi API đăng ký thông qua authService
      const response = await authService.register(userData);

      // Lưu token vào localStorage nếu API trả về token sau khi đăng ký
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      // Lấy thông tin user từ response
      const user = response.user;

      // Cập nhật state với thông tin user
      dispatch({ type: "REGISTER_SUCCESS", payload: user });

      // Hiển thị thông báo thành công với useToast
      toast({
        title: "Đăng ký thành công",
        description: "Đăng ký tài khoản thành công!",
        variant: "default",
      });

      return user;
    } catch (error) {
      // Xử lý lỗi và cập nhật state
      const errorMessage = error.response?.data?.message || "Đăng ký thất bại";
      dispatch({
        type: "REGISTER_FAILURE",
        payload: errorMessage,
      });

      // Hiển thị thông báo lỗi với useToast
      toast({
        title: "Đăng ký thất bại",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Đăng xuất người dùng
   */
  const logout = async () => {
    try {
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Cập nhật state
      dispatch({ type: "LOGOUT" });

      // Hiển thị thông báo thành công với useToast
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi hệ thống",
        variant: "default",
      });
    } catch (error) {
      // Sử dụng toast thay vì console.error
      toast({
        title: "Lỗi đăng xuất",
        description:
          "Có lỗi xảy ra khi đăng xuất, nhưng phiên đăng nhập đã được xóa",
        variant: "destructive",
      });

      // Xóa token khỏi localStorage ngay cả khi API thất bại
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Cập nhật state
      dispatch({ type: "LOGOUT" });
    }
  };

  /**
   * Cập nhật thông tin người dùng
   * @param userData - Thông tin cần cập nhật
   */
  const updateProfile = async (userData: Partial<User>) => {
    if (!state.user) return;

    dispatch({ type: "UPDATE_PROFILE_START" });

    try {
      // Gọi API cập nhật thông tin người dùng
      const response = await authService.updateProfile(userData);

      // Lấy thông tin user đã cập nhật từ response
      const updatedUser = response;

      // Cập nhật state với thông tin user mới
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: updatedUser });

      // Hiển thị thông báo thành công với useToast
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin của bạn đã được cập nhật",
        variant: "default",
      });

      return updatedUser;
    } catch (error) {
      // Xử lý lỗi và cập nhật state
      const errorMessage =
        error.response?.data?.message || "Cập nhật thông tin thất bại";
      dispatch({
        type: "UPDATE_PROFILE_FAILURE",
        payload: errorMessage,
      });

      // Hiển thị thông báo lỗi với useToast
      toast({
        title: "Cập nhật thất bại",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Xóa thông báo lỗi
   */
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  /**
   * Giá trị context được cung cấp cho các component con
   */
  const value: UserContextType = {
    user: state.user,
    isAuthenticated: !!state.user,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    isLoading: state.isLoading,
    error: state.error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
