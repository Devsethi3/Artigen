import { createContext, useContext } from "react";

export const TotalUsageContext = createContext<any>(0);

export const useTotalUsage = () => {
  return useContext(TotalUsageContext);
};
