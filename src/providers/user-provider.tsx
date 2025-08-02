import { UserContext, UserContextType } from "@/context/user-context";
import React, { useEffect, useReducer } from "react";
// Sử dụng hook useToast từ hooks/use-toast
import { useToast } from "@/hooks/use-toast";
import { authService } from "../services/authService";
import { User } from "../types";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_START" }
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
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData ? userData.token : null;
      // Nếu có token, thử lấy thông tin user từ API
      if (token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
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

      if (response.isActive === 0) {
        toast({
          title: "Tài khoản chưa được kích hoạt",
          description: "Vui lòng kiểm tra email của bạn để kích hoạt tài khoản",
          variant: "destructive",
        });
        throw new Error("Tài khoản của bạn chưa được kích hoạt");
      } else {
        // Cập nhật state với thông tin user
        dispatch({ type: "LOGIN_SUCCESS", payload: response });

        // Hiển thị thông báo thành công với useToast
        toast({
          title: "Đăng nhập thành công",
          description: "Bạn đã đăng nhập vào hệ thống",
          variant: "default",
        });

        // Lưu token vào localStorage
        localStorage.setItem("userData", JSON.stringify(response));

        return response;
      }
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
      let formData = new FormData();
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("username", userData.username);
      // Gọi API đăng ký thông qua authService
      const response = await authService.register(formData);
      return response;
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
    localStorage.removeItem("userData");
    // Cập nhật state
    dispatch({ type: "LOGOUT" });
  };

  /**
   * Cập nhật thông tin người dùng
   * @param userData - Thông tin cần cập nhật
   */
  const updateProfile = async (userData: Partial<User>) => {
    if (!state.user) return;

    dispatch({ type: "UPDATE_PROFILE_START" });

    // try {
    //   // Gọi API cập nhật thông tin người dùng
    //   const response = await authService.updateProfile(userData);

    //   // Lấy thông tin user đã cập nhật từ response
    //   const updatedUser = response;

    //   // Cập nhật state với thông tin user mới
    //   dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: updatedUser });

    //   // Hiển thị thông báo thành công với useToast
    //   toast({
    //     title: "Cập nhật thành công",
    //     description: "Thông tin của bạn đã được cập nhật",
    //     variant: "default",
    //   });

    //   return updatedUser;
    // } catch (error) {
    //   // Xử lý lỗi và cập nhật state
    //   const errorMessage =
    //     error.response?.data?.message || "Cập nhật thông tin thất bại";
    //   dispatch({
    //     type: "UPDATE_PROFILE_FAILURE",
    //     payload: errorMessage,
    //   });

    //   // Hiển thị thông báo lỗi với useToast
    //   toast({
    //     title: "Cập nhật thất bại",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });
    //   throw error;
    // }
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
