import supabase from "../config/supabase.config";
export const getFoods = async () => {
  return await supabase.from("item").select(`
    item_id,
    item_name,
    item_image,
    description,
    price,
    category_id,
    category:category_id (
      category_name,
      category_image
    )
  `);
};
export const upFood = async (food) => {
  return await supabase.from("item").insert([food]);
};
