import supabase from "../config/supabase.config";
export const getUsers = async () => {
  return await supabase.from("app_user").select(`
    *
    role:role_id (
      role_name,
      
    )
  `);
};
