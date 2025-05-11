import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
const Layout = () => {
  return (
    <div>
      <Header />
      <main className="bg-[#f7f7f7]  min-h-screen px-40 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
