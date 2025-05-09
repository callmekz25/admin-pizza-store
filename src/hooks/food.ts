import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../services/foodService";

export const useGetFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
};
