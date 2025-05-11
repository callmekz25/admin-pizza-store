import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../services/food-service";

export const useGetFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
};
