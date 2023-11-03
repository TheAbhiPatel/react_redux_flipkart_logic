import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import CategoriesMap from "../components/CategoriesMap";
import { useParams } from "react-router-dom";

const Categories = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const params = useParams();

  /** ---> fetching products on component load */
  useEffect(() => {
    fetchProducts();
  }, [params]);

  /** ---> scrolling to top on page load */
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    };
    scrollToTop();
  }, [params]);

  const fetchProducts = async () => {
    const res = await axiosInstance.get(
      `/products/category/${params.category}`
    );
    if (res.data) {
      setProducts(res.data.products);
    }
  };

  return (
    <div className="w-full">
      <div className="flex mt-20 ">
        <div className="min-w-[15%]  flex flex-col gap-2 ">
          <CategoriesMap />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          {products.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
