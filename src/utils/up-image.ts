import supabase from "../config/supabase.config";
export const uploadImage = async (file: File, bucket: string) => {
  const response = await supabase.storage
    .from(bucket)
    .upload(`${file.name}-${Date.now().toString()}`, file);
  const imageUrl = supabase.storage
    .from("item")
    .getPublicUrl(response?.data?.path);
  return imageUrl?.data?.publicUrl;
};
export const updateImage = async (file: File, bucket: string) => {
  const response = await supabase.storage
    .from(bucket)
    .upload(`${file.name}-${Date.now().toString()}`, file, {
      upsert: true,
    });
  const imageUrl = supabase.storage
    .from("item")
    .getPublicUrl(response?.data?.path);
  return imageUrl?.data?.publicUrl;
};
