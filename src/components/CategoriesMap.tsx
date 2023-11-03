import { memo, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";

const CategoriesMap = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/products/categories");
    if (res.data) {
      setCategories(res.data);
    }
  };

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <div className="bg-slate-600 py-10 pl-3 sticky top-20 h-screen overflow-scroll">
      <h2 className="text-xl font-bold">Categories </h2>
      {categories.map((item, idx) => {
        return (
          <div
            key={idx}
            onClick={() => handleNavigate(`/products/category/${item}`)}
            className=" px-3 flex py-1 hover:bg-blue-400 cursor-pointer duration-500 rounded-md"
          >
            <h3 className="text-white capitalize">{item}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CategoriesMap);
