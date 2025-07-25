import { UserContext } from "@/context/user-context";
import { useContext } from "react";

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
