import { UserContext, UserContextType } from "@/context/user-context";
import React, { useEffect, useReducer } from "react";
// Use useToast hook from hooks/use-toast
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
  | { type: "REGISTER_SUCCESS" }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE_START" }
  | { type: "UPDATE_PROFILE_SUCCESS"; payload: User }
  | { type: "UPDATE_PROFILE_FAILURE"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "LOAD_USER"; payload: User }
  | { type: "FINISH_LOADING" }; // Add new action to finish loading state

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
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

    case "REGISTER_SUCCESS":
      return {
        ...state,
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

    case "FINISH_LOADING": // Handle FINISH_LOADING action
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  // Use useToast hook to display notifications
  const { toast } = useToast();

  // Load user from token and API when component mounts
  useEffect(() => {
    const loadUser = async () => {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const token = userData ? userData.token : null;
      // If there's a token, try to get user info from API
      if (token) {
        try {
          dispatch({ type: "LOGIN_START" });
          // Send LOGIN_SUCCESS action if loading successful
          const response = await authService.getUserProfile();
          dispatch({ type: "LOGIN_SUCCESS", payload: response });
        } catch (error) {
          // Log error to console if there's an error during loading
          console.error("Error loading user information:", error);
          // Send LOGIN_FAILURE action if loading fails
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Failed to load user information",
          });
        } finally {
          // Always send FINISH_LOADING action to ensure isLoading is set back to false
          dispatch({ type: "FINISH_LOADING" });
        }
      } else {
        // If no token, finish loading state
        dispatch({ type: "FINISH_LOADING" });
      }
    };

    loadUser();
  }, []);

  // No need to save user to localStorage since we'll use token to get user info from API

  /**
   * Login user with email/username and password
   * @param email - Email or username
   * @param password - Password
   */
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // Call login API through authService
      const response = await authService.login(email, password);

      if (response.isActive === 0) {
        toast({
          title: "Account not activated",
          description: "Please check your email to activate your account",
          variant: "destructive",
        });
        throw new Error("Your account is not activated");
      } else {
        // Update state with user information
        dispatch({ type: "LOGIN_SUCCESS", payload: response });

        // Display success notification with useToast
        toast({
          title: "Login successful",
          description: "You have logged into the system",
          variant: "default",
        });

        // Save token to localStorage
        localStorage.setItem("userData", JSON.stringify(response));

        return response;
      }
    } catch (error) {
      // Handle error and update state
      const errorMessage = error.response?.data?.message || "Login failed";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: errorMessage,
      });

      // Display error notification with useToast
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Register new user
   * @param userData - Registration information
   */
  const register = async (userData: RegisterData) => {
    dispatch({ type: "REGISTER_START" });

    try {
      let formData = new FormData();
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("username", userData.username);
      // Call register API through authService
      const response = await authService.register(formData);
      // Update state with user information
      dispatch({ type: "REGISTER_SUCCESS" });
      return response;
    } catch (error) {
      // Handle error and update state
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      dispatch({
        type: "REGISTER_FAILURE",
        payload: errorMessage,
      });

      // Display error notification with useToast
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("userData");
      dispatch({ type: "LOGOUT" });
      toast({
        title: "Logout successful",
        description: "You have logged out of the system",
        variant: "default",
      });
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Logout failed",
        description: "Error during logout",
        variant: "destructive",
      });
    }
  };

  /**
   * Update user information
   * @param userData - Information to update
   */
  const updateProfile = async (userData: FormData) => {
    if (!state.user) return;

    dispatch({ type: "UPDATE_PROFILE_START" });

    try {
      // Call API to update user information
      const response = await authService.updateProfile(userData);

      // Get updated user info from response
      const updatedUser = response;

      // Update state with new user information
      dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: updatedUser });

      // Display success notification with useToast
      toast({
        title: "Update successful",
        description: "Your information has been updated",
        variant: "default",
      });

      return updatedUser;
    } catch (error) {
      // Handle error and update state
      const errorMessage =
        error.response?.data?.message || "Failed to update information";
      dispatch({
        type: "UPDATE_PROFILE_FAILURE",
        payload: errorMessage,
      });

      // Display error notification with useToast
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  /**
   * Context value provided to child components
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
