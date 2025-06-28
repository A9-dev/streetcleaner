/**
 * Custom hook for managing user points state
 */
"use client";

import { useState, useCallback, createContext, useContext, ReactNode } from "react";

interface UserPointsContextType {
  userPoints: number;
  addPointsToBounty: (amount: number) => boolean;
  setUserPoints: (points: number) => void;
}

const UserPointsContext = createContext<UserPointsContextType | undefined>(undefined);

export const useUserPoints = () => {
  const context = useContext(UserPointsContext);
  if (!context) {
    throw new Error("useUserPoints must be used within a UserPointsProvider");
  }
  return context;
};

interface UserPointsProviderProps {
  children: ReactNode;
  initialPoints?: number;
}

export const UserPointsProvider: React.FC<UserPointsProviderProps> = ({ 
  children, 
  initialPoints = 8000 
}) => {
  const [userPoints, setUserPointsState] = useState<number>(initialPoints);

  const addPointsToBounty = useCallback((amount: number): boolean => {
    if (amount <= 0 || amount > userPoints) {
      return false; // Invalid amount or insufficient points
    }
    
    setUserPointsState(prev => prev - amount);
    return true; // Success
  }, [userPoints]);

  const setUserPoints = useCallback((points: number) => {
    setUserPointsState(points);
  }, []);

  const value = {
    userPoints,
    addPointsToBounty,
    setUserPoints,
  };

  return (
    <UserPointsContext.Provider value={value}>
      {children}
    </UserPointsContext.Provider>
  );
};
