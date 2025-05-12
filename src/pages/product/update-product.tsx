import { useParams } from "react-router-dom";
import { useGetFoodById, useUpdateFood } from "../../hooks/food";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useGetCategories } from "../../hooks/category";
import { updateImage } from "../../utils/up-image";

const UpdateProduct = () => {
  const { id } = useParams();
  const [previewImages, setPreviewImages] = useState("");
  const [fileTemp, setFileTemp] = useState<File>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: food, isLoading, error } = useGetFoodById(id);
  const { mutate, isPending } = useUpdateFood();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetCategories();
  console.log(food);

  useEffect(() => {
    if (food?.data) {
      reset({
        item_id: food?.data?.item_id,
        price: food?.data.price,
        item_name: food?.data?.item_name,
        description: food?.data?.description,
        category_id: food?.data?.category_id,
      });
      setPreviewImages(food?.data?.item_image);
    }
  }, [food, reset]);
  const uploadFileTemp = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileTemp(file);
      setPreviewImages(URL.createObjectURL(file));
    } else {
      setPreviewImages("");
    }
  };
  const handleUpdateFood = async (data) => {
    let publicUrl = food?.data?.item_image;
    if (fileTemp) {
      publicUrl = await updateImage(fileTemp, "item");
    }
    console.log(publicUrl);

    const updateData = {
      ...data,
      item_image: publicUrl,
    };
    console.log(updateData);

    mutate(updateData, {
      onSuccess: () => console.log("Update Success"),
      onError: (error) => console.log(error),
    });
  };
  if (isLoading || isLoadingCategories) {
    return <p>Loading...</p>;
  }
  return (
    <div className="py-10">
      <h3 className="mb-4 font-medium text-xl">
        Cập nhật: {food?.data?.item_name}
      </h3>
      <form
        onSubmit={handleSubmit(handleUpdateFood)}
        className="grid grid-cols-4 gap-6 font-medium"
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
                readOnly
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
                    <img
                      src={previewImages}
                      alt={previewImages}
                      className=" object-contain size-[300px]"
                    />
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
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
