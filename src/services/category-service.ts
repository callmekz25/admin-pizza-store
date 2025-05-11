import supabase from "../config/supabase.config";

export const getCategories = async () => {
  return await supabase.from("category").select();
};
