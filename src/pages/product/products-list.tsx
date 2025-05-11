import { type Food, columns } from "../../components/table/columns-products";
import { DataTable } from "../../components/table/data-table";

import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useGetFoods } from "../../hooks/food";
const ProductsList = () => {
  const { data: foods, isLoading, error } = useGetFoods();

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  return (
    <div className="">
      <div className="flex items-center justify-between py-5 ">
        <h3 className="text-xl font-medium">Sản phẩm</h3>
        <Link
          to="/add-product"
          className="flex px-3 py-2.5 rounded items-center gap-2 bg-blue-500 text-white font-medium text-sm"
        >
          Thêm sản phẩm
          <PlusIcon className="size-5" />
        </Link>
      </div>
      <div className="">
        <DataTable columns={columns} data={foods.data} />
      </div>
    </div>
  );
};

export default ProductsList;
