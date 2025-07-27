import { UserContext, UserContextType } from "@/context/user-context";
import React, { useEffect, useReducer } from "react";
import { User } from "../types";

interface RegisterData {
  email: string;
  password: string;
  username: string;
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

interface UserState {
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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("donekick-user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: "LOAD_USER", payload: parsedUser });
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        localStorage.removeItem("donekick-user");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("donekick-user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("donekick-user");
    }
  }, [state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      if (email === "demo@donekick.com" && password === "password") {
        const user: User = {
          id: 1, // bigint(20) trong SQL
          username: "Demo", // username varchar(255)
          email: email, // email varchar(255)
          password: undefined, // password varchar(255) - chỉ dùng khi cần thiết
          avatar: "/images/avatars/default.png", // avatar varchar(255)
          phone: "+1 (555) 123-4567", // phone varchar(255)
          address: "123 Main St, New York, NY 10001", // address varchar(255)
          gender: true, // gender bit(1) - true: nam, false: nữ
          dayOfBirth: 1, // day_of_birth int(11)
          monthOfBirth: 1, // month_of_birth int(11)
          yearOfBirth: 1990, // year_of_birth int(11)
          active: 1, // active int(11) - trạng thái hoạt động
          // Audit fields
          createBy: "system", // create_by varchar(255)
          createDate: new Date(), // create_date datetime
          modifierBy: "system", // modifier_by varchar(255)
          modifierDate: new Date(), // modifier_date datetime
        };
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock registration
      const user: User = {
        id: 1, // bigint(20) trong SQL
        username: userData.username, // username varchar(255)
        email: userData.email, // email varchar(255)
        password: undefined, // password varchar(255) - chỉ dùng khi cần thiết
        avatar: "/images/avatars/default.png", // avatar varchar(255)
        gender: true, // gender bit(1) - mặc định là nam
        active: 1, // active int(11) - trạng thái hoạt động mặc định là active
        // Audit fields
        createBy: "system", // create_by varchar(255)
        createDate: new Date(), // create_date datetime
        modifierBy: "system", // modifier_by varchar(255)
        modifierDate: new Date(), // modifier_date datetime
      };

      dispatch({ type: "REGISTER_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error instanceof Error ? error.message : "Registration failed",
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!state.user) return;

    dispatch({ type: "UPDATE_PROFILE_START" });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: updatedUser });
    } catch (error) {
      dispatch({
        type: "UPDATE_PROFILE_FAILURE",
        payload:
          error instanceof Error ? error.message : "Profile update failed",
      });
      throw error;
    }
  };

  const value: UserContextType = {
    user: state.user,
    isAuthenticated: !!state.user,
    login,
    register,
    logout,
    updateProfile,
    isLoading: state.isLoading,
    error: state.error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
