import { columns } from "../../components/table/columns-users";
import { DataTable } from "../../components/table/data-table";
import { useGetUsers } from "../../hooks/user";
const UserList = () => {
  const { data: users, isLoading, error } = useGetUsers();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between py-5 ">
        <h3 className="text-xl font-medium">Khách Hàng</h3>
      </div>
      <div className="">
        <DataTable columns={columns} data={users.data} />
      </div>
    </div>
  );
};

export default UserList;
