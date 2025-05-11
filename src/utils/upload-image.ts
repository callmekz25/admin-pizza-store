import supabase from "../config/supabase.config";
const uploadImage = async (file: File, bucket: string) => {
  return await supabase.storage
    .from(bucket)
    .upload(`${file.name}-${Date.now().toString()}`, file);
};
export default uploadImage;
