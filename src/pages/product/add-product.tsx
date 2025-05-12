import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import { uploadImage } from "../../utils/up-image";
import { upFood } from "../../services/food-service";
import { useGetCategories } from "../../hooks/category";
const AddProduct = () => {
  const [previewImages, setPreviewImages] = useState("");
  const [fileTemp, setFileTemp] = useState<File>(null);
  const { data: categories, isLoading, error } = useGetCategories();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const uploadFileTemp = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileTemp(file);
      setPreviewImages(URL.createObjectURL(file));
    } else {
      setPreviewImages("");
    }
  };
  useEffect(() => {
    return () => URL.revokeObjectURL(previewImages);
  }, [previewImages]);
  const handleUpFood = async (data) => {
    if (!fileTemp) return;

    const publicUrl = await uploadImage(fileTemp, "item");
    console.log(publicUrl);

    if (publicUrl) {
      const food = {
        ...data,
        item_image: publicUrl,
      };

      const { data: res, error: insertError } = await upFood(food);
      console.log(res);

      if (insertError) {
        console.error("Lỗi insert DB:", insertError);
      } else {
        console.log("Thêm món ăn thành công:", res);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <form
      onSubmit={handleSubmit(handleUpFood)}
      className="grid grid-cols-4 gap-6 font-medium pt-10"
    >
      <div className=" col-span-3 h-fit flex flex-col gap-4 ">
        <div className=" border bg-white text-sm border-gray-200 rounded-md p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Id
            </label>
            <input
              type="text"
              id=""
              className=" px-2 py-1.5 font-normal outline-none border border-gray-300 rounded"
              {...register("item_id")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Tên món
            </label>
            <input
              type="text"
              id=""
              className=" px-2 py-1.5 font-normal outline-none border border-gray-300 rounded"
              {...register("item_name")}
            />
          </div>
          {/* Nội dung */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Mô tả
            </label>
            <textarea
              {...register("description")}
              id=""
              className=" outline-none border border-gray-300 rounded px-2 py-2 min-h-[100px]"
            ></textarea>
          </div>
          {/* Hình ảnh */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Hình ảnh
            </label>
            <label
              htmlFor="images"
              className={`border hover:cursor-pointer border-gray-300 border-dashed rounded-md py-5 min-h-[150px] px-4 flex items-center justify-center col-span-5 row-span-2 `}
            >
              <div className="flex items-center justify-center">
                {previewImages !== "" ? (
                  <>
                    <img
                      src={previewImages}
                      alt={previewImages}
                      className=" object-contain size-[300px]"
                    />
                  </>
                ) : (
                  <span className="font-normal text-center text-gray-300 text-lg">
                    Thêm ảnh
                  </span>
                )}
              </div>
              <input
                id="images"
                type="file"
                accept="image/*"
                onChange={(e) => uploadFileTemp(e)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
      {/* Price*/}
      <div className="flex flex-col gap-4">
        <div className="border border-gray-200 rounded-md p-4 h-fit bg-white flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">
              Giá
            </label>
            <input
              type="number"
              className="px-2 py-1.5 outline-none border text-sm font-normal border-gray-200 rounded"
              {...register("price")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="categories" className="text-sm text-gray-600">
              Danh mục
            </label>
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Danh mục</SelectLabel>
                      {categories && categories.data
                        ? categories.data.map((category) => {
                            return (
                              <SelectItem
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.category_name}
                              </SelectItem>
                            );
                          })
                        : ""}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <button
          className="bg-blue-600 w-fit rounded text-sm text-white px-4 py-1.5 font-normal  "
          disabled={isSubmitting}
        >
          Thêm mới
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
