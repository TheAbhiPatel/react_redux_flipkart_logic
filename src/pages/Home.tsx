import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";
import { IProduct } from "../interfaces";

import CategoriesMap from "../components/CategoriesMap";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);

  /** ---> fetching products on component load */
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    const limit = 10;
    const skip = page * limit - limit;

    const res = await axiosInstance.get(
      `/products?skip=${skip}&limit=${limit}`
    );
    if (res.data) {
      setProducts((prev) => [...prev, ...res.data.products]);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setPage((prev) => ++prev);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="flex mt-20 ">
        <div className="min-w-[15%]  flex flex-col gap-2 ">
          <CategoriesMap />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          {products.map((product, idx) => {
            return <ProductCard key={idx} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
