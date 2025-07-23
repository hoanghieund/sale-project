import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE_START' }
  | { type: 'UPDATE_PROFILE_SUCCESS'; payload: User }
  | { type: 'UPDATE_PROFILE_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_USER'; payload: User };

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
    case 'LOGIN_START':
    case 'REGISTER_START':
    case 'UPDATE_PROFILE_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'LOAD_USER':
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
    const savedUser = localStorage.getItem('donekick-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', payload: parsedUser });
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
        localStorage.removeItem('donekick-user');
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('donekick-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('donekick-user');
    }
  }, [state.user]);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      if (email === 'demo@donekick.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: email,
          firstName: 'Demo',
          lastName: 'User',
          avatar: undefined,
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1990-01-01',
          addresses: [
            {
              id: 'addr-1',
              type: 'shipping',
              firstName: 'Demo',
              lastName: 'User',
              address1: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'United States',
              isDefault: true,
            }
          ],
          preferences: {
            newsletter: true,
            smsNotifications: false,
            emailNotifications: true,
            preferredSizes: ['9', '9.5', '10'],
            favoriteCategories: ['running', 'basketball'],
          },
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock registration
      const user: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        addresses: [],
        preferences: {
          newsletter: false,
          smsNotifications: false,
          emailNotifications: true,
          preferredSizes: [],
          favoriteCategories: [],
        },
      };

      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ 
        type: 'REGISTER_FAILURE', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!state.user) return;

    dispatch({ type: 'UPDATE_PROFILE_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: updatedUser });
    } catch (error) {
      dispatch({ 
        type: 'UPDATE_PROFILE_FAILURE', 
        payload: error instanceof Error ? error.message : 'Profile update failed' 
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

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
