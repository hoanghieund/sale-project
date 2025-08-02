import { createContext } from "react";
import { User } from "../types";

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: FormData) => Promise<void>;
  clearError: () => void;
  isLoading: boolean;
  error: string | null;
}

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

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
