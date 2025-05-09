import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
