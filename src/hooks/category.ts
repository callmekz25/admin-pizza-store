import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category-service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
