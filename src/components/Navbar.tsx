import { NavLink, useNavigate } from "react-router-dom";
import { BiSolidCart } from "react-icons/bi";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { IProduct } from "../interfaces";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart);
  const [searchText, setSearchText] = useState("");
  const [searchSuggetionList, setSearchSuggetionList] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // console.log("searchSuggetionList ----->", searchSuggetionList);

  const handleOnSubmitForm = (e: any) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/search?q=${searchText}`);

      // navigate({
      //   pathname: "/search",
      //   search: `${createSearchParams({
      //     q: searchText,
      //   })}`,
      // });
    }
  };

  useEffect(() => {
    if (searchText) {
      // debounceFunc(fetchProductsQuries, 400);
      // debounce(fetchProductsQuries, 400);
      fetchProductsQuries();
    } else {
      setSearchSuggetionList([]);
    }
  }, [searchText]);

  const fetchProductsQuries = async () => {
    console.log("i am calling in api funct");
    const res = await axiosInstance.get(`/products/search?q=${searchText}`);
    if (res.data) {
      setSearchSuggetionList(
        res.data.products?.map((item: IProduct) => {
          const { title, brand } = item;
          return {
            title,
            brand,
          };
        })
      );
    }
  };

  const debounceFunc = (cb: any, duration: number) => {
    let timer: number;

    return function () {
      // @ts-ignore
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(" i am runnnign in setTimeout");

        cb.apply(context, args);
      }, 200);
    };
  };

  const debounce = (func: any, delay: number) => {
    let timer: number;

    return function () {
      // @ts-ignore
      const context = this;
      const args = arguments;

      clearTimeout(timer);

      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  };

  return (
    <header>
      <div className="w-full mx-auto flex  p-5 px-10  justify-between items-center bg-slate-700 fixed top-0 z-10">
        <NavLink to={"/"}>
          <span className=" text-2xl font-bold">FlipKart</span>
        </NavLink>
        <form className="w-[30%] relative" onSubmit={handleOnSubmitForm}>
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
            value={searchText}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Search for Products..."
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md "
          />
          <div
            className={`absolute top-12 left-0 right-0 min-h-32 bg-white rounded-md shadow-lg ${
              isInputFocused ? "block" : "hidden"
            }`}
          >
            <ul className="text-gray-600 px-3 py-2">
              <li>Search results</li>

              {searchSuggetionList.length !== 0 ? (
                searchSuggetionList
                  ?.slice(0, 5)
                  .map((item: { title: string; brand: string }, idx) => {
                    return (
                      <li key={idx} className="leading-3 my-4">
                        <span>{item.title}</span> <br />{" "}
                        <span className="text-gray-400 text-xs ">
                          {item.brand}
                        </span>
                      </li>
                    );
                  })
              ) : (
                <div className="w-full flex justify-center items-center h-32">
                  <span>No search results</span>
                </div>
              )}
            </ul>
          </div>
        </form>
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
              {cartItems.length}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
