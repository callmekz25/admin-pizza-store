import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <ul className="flex items-center font-medium text-[16px] justify-center bg-white gap-14 py-5 border-b border-gray-200 shadow-sm tex-red-500">
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/products">Sản phẩm</Link>
        </li>
        <li>
          <Link to="/users">Khách hàng</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
