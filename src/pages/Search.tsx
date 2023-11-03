import { useEffect, useState } from "react";
import { IProduct } from "../interfaces";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const qurey = useSearchParams()[0].get("q");

  /** ---> fetching products on component load */
  useEffect(() => {
    fetchProducts();
  }, [qurey]);

  const fetchProducts = async () => {
    const res = await axiosInstance.get(`/products/search?q=${qurey}`);
    if (res.data) {
      setProducts(res.data.products);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};
export default Search;
