import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../data/mockData";

interface RecentlyViewedContextType {
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

/**
 * Provider manages the list of recently viewed products
 * Stores product IDs in localStorage and limits the number of products displayed
 */
export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const MAX_ITEMS = 8; // Limit the number of recently viewed products

  // Restore the list of viewed products from localStorage when component mounts
  useEffect(() => {
    const storedIds = localStorage.getItem("recentlyViewedIds");
    if (storedIds) {
      try {
        const ids = JSON.parse(storedIds) as string[];
        // Lấy thông tin sản phẩm từ ID
        const products = ids
          .map(id => MOCK_PRODUCTS.find(p => p.id === id))
          .filter((p): p is Product => p !== undefined);
        setRecentlyViewed(products);
      } catch (error) {
        console.error("Error reading recently viewed products data:", error);
        localStorage.removeItem("recentlyViewedIds");
      }
    }
  }, []);

  // Add product to recently viewed list
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Remove product if it already exists in the list
      const filtered = prev.filter(p => p.id !== product.id);
      // Add new product to the beginning of the list
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      
      // Save product IDs to localStorage
      const ids = updated.map(p => p.id);
      localStorage.setItem("recentlyViewedIds", JSON.stringify(ids));
      
      return updated;
    });
  };

  // Clear the entire recently viewed products list
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem("recentlyViewedIds");
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

// Hook to use the context
export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
};

// Default export to avoid Fast Refresh error
export default RecentlyViewedProvider;
