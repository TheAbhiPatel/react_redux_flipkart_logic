import { NavLink } from "react-router-dom";
import { BiSolidCart } from "react-icons/bi";

const Navbar = () => {
  return (
    <header>
      <div className="w-full mx-auto flex  p-5 px-10  justify-between items-center bg-slate-700 fixed top-0 z-10">
        <NavLink to={"/"}>
          <span className=" text-2xl font-bold">FlipKart</span>
        </NavLink>
        <div className="w-[30%]">
          <input
            type="text"
            placeholder="Search for Products..."
            className="w-full bg-gray-100 px-4 py-2 rounded-md"
          />
        </div>
        <nav className="w-[25%] flex  items-center  justify-between">
          <NavLink
            to={"/"}
            className=" hover:text-gray-300 border border-gray-400 p-1 px-2 rounded-md"
          >
            Become a Seller
          </NavLink>
          <NavLink
            to={"/"}
            className=" hover:text-gray-300 border border-gray-400 p-1 px-2 rounded-md"
          >
            Sign in
          </NavLink>
          <NavLink
            to={"/cart"}
            className=" hover:text-gray-300  relative gap-2"
          >
            <BiSolidCart className="text-3xl  " />
            <span className="absolute -top-3 -right-3 bg-red-500 px-2 rounded-full text-sm">
              0
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
