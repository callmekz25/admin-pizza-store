import { useMutation, useQuery } from "@tanstack/react-query";
import { getFoodById, getFoods, updateFood } from "../services/food-service";

export const useGetFoods = () => {
  return useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });
};
export const useGetFoodById = (id: string) => {
  return useQuery({
    queryKey: ["foods", id],
    queryFn: () => getFoodById(id),
    enabled: !!id,
  });
};
export const useUpdateFood = () => {
  return useMutation({
    mutationFn: (data) => updateFood(data),
  });
};
