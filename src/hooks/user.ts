import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user-service";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
