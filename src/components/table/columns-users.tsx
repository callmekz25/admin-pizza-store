import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export type User = {
  user_id: string;
  user_name: string;
  user_image: string;
  user_email: string;
  phone_number: string;
  role_id: string;
  role: {
    role_name: string;
  };
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_id",
    header: "Id",
    cell: ({ row }) => {
      return <span>{row.original.user_id}</span>;
    },
  },
  {
    accessorKey: "user_image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.user_image}
          alt={row.original.user_name}
          className="size-18 object-contain"
        />
      );
    },
  },
  {
    accessorKey: "user_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=""
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">{row.original.user_name}</h3>
    ),
  },
  {
    accessorKey: "user_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">{row.original.user_email}</h3>
    ),
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số điện thoại
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <h3 className="font-normal text-[15px] ">{row.original.phone_number}</h3>
    ),
  },
];
