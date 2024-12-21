import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../core/Store";
import {
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../core/CartSlices";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  console.log("items=>", items);
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function removeFromCart(itemId: number) {
    dispatch(removeItemFromCart(itemId));
  }

  const handleIncrement = (itemId: number) => {
    dispatch(incrementQuantity(itemId));
  };

  const notifyError = () => {
    toast.warning("Please add the item");
  };

  const handleDecrement = (itemId: number, quantity: number) => {
    if (quantity <= 1) {
      notifyError(); // Call the error toast function
    } else {
      dispatch(decrementQuantity(itemId));
    }
  };

  const handlePlaceOrder = () => {
    navigate("/CheckOut");
  };

  function totalValue(price: string, quantity: number) {
    console.log("param:", price);
    const value = price.replace("$", "");
    console.log("Value:", value);
    let totalPrice = Number(value) * quantity;
    return totalPrice;
  }

  function calculateFinalTotal() {
    return items.reduce((acc, item) => {
      const itemsPrice = Number(item.price.replace("$", ""));
      return acc + itemsPrice * item.quantity;
    }, 0);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        </div>
        
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="border p-2 mb-2  flex justify-between "
              >
                <div className="flex flex-row ">
                  <div className="basis-1/4">
                    <button
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="basis-1/2">
                    <p className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >{item.quantity} </p>
                  </div>
                  <div className="basis-1/4">
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => handleDecrement(item.id, item.quantity)}
                    >
                      -
                    </button>
                  </div>
                </div>

                <div className="ml-20 font-bold">
                  <p>
                    <span className="text-rose-500 uppercase me-2">Item Name: </span>
                    {item.name}
                  </p>
                  <p>
                    <span className="text-rose-500 uppercase me-2">Color: </span>
                    {item.color}
                  </p>
                  <p>
                    <span className="text-rose-500 uppercase me-2">Price per item: </span>
                    {item.price}
                  </p>
                  <p>
                    <span className="text-rose-500 uppercase me-2">Total Price: </span>
                    {totalValue(item.price, item.quantity)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto text-white bg-red-800 hover:bg-red-900 font-medium rounded-lg text-sm px-6 mb-14 dark:bg-red-800 dark:hover:bg-red-700  "
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <hr className="mt-10"/>
          <div className="text-right font-bold text-lg mb-4">
          Checkout Total Price: {calculateFinalTotal()}
        </div>  
          <button
            onClick={handlePlaceOrder}
            className="float-right text-white bg-green-500 hover:bg-green-900 font-medium rounded-lg text-sm py-3 px-5 "
          >
            Checkout
          </button>

            {/* ToastContainer must be included in the component */}
            <ToastContainer position="top-center" transition={Bounce} />
          
        </>
      )}
    </div>
  );
}
