import { useNavigate } from "react-router-dom";
import dataProducts from "../../Data/Data.json";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../core/UserContext";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../core/CartSlices";

export interface product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
}

export default function Home() {
  const [searchResult, setSearchResult] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<product[]>(
    dataProducts.products
  );

  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function productView(productId: number, product: any) {
    dispatch(addItemToCart(product));
    navigate(`/cart/${productId}`);
  }

  useEffect(() => {
    const results = dataProducts.products.filter((product) =>
      product.name.toLowerCase().includes(searchResult.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchResult]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-cyan-600 uppercase">
            {user.name} Mart Products
          </h2>

          <form className="max-w-md ml-auto">
            <label className=" text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <input
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Products, Category..."
                required
              />
            </div>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative text-center uppercase font-bold"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
                <h3 className="text-slate-500 ">{product.name}</h3>
                <p className="text-current ">{product.color}</p>
                <p className="text-red-500 ">{product.price}</p>
                <button
                  onClick={() => productView(product.id, product)}
                  className="transition ease-in-out delay-150 bg-sky-900 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300 p-3 mb-4 mt-3 rounded-lg text-stone-50 "
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
