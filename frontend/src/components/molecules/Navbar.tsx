import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../core/UserContext";
import { Zoom, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const notifyLogout = () => {
    toast.success("Logout successful!");
    setTimeout(() => {
      navigate("/"); // Redirect to the home page after logout
    }, 1000); // Delay navigation to display toast
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://e7.pngegg.com/pngimages/621/196/png-clipart-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white uppercase">
              {user.name} Mart
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            ></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/Home"
                  className="uppercase block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Product Catalog
                </Link>
              </li>

              <li>
                <Link
                  to="/cart/:id"
                  className="uppercase block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    notifyLogout();
                  }}
                  className="transition ease-in-out delay-150 bg-sky-900 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 p-3 mb-4 mt-3 rounded-lg text-stone-50 "
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Include ToastContainer to render toast notifications */}
      <ToastContainer transition={Zoom} />
    </>
  );
}
