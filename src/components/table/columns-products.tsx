import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import formatPrice from "../../utils/format-price";
export type Food = {
  item_id: string;
  item_image: string;
  item_name: string;
  description: string;
  price: number;
  category: {
    category_name: string;
    category_image: string;
  };
};

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: "item_id",
    header: "Id",
    cell: ({ row }) => {
      return <span>{row.original.item_id}</span>;
    },
  },
  {
    accessorKey: "item_image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.item_image}
          alt={row.original.item_name}
          className="size-18 object-contain"
        />
      );
    },
  },
  {
    accessorKey: "item_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên món
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">{row.original.item_name}</h3>
    ),
  },
  {
    accessorKey: "category.category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại món
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">
        {row.original.category.category_name}
      </h3>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">
        {formatPrice(row.original.price)}
      </h3>
    ),
  },
];
