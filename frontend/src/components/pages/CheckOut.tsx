import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentDetails: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/Home');
  };

  return (
    <>
      <div className="py-5 text-center bg-gray-100">
        <h1 className="text-4xl mb-5 font-bold tracking-tight text-gray-900 ">Place Order</h1>
        <p className=" text-2xl font-bold  tracking-tight text-gray-900">For Placing Order Enter Your details</p>
      </div>
      <div className="min-h-fit py-8 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">User Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDetails">
                Payment Details
              </label>
              <input
                type="text"
                name="paymentDetails"
                id="paymentDetails"
                value={formData.paymentDetails}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your payment details"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Order Placed Successfully</h2>
              <p className="text-red-600">Details are here:</p>
              <ul className="text-green-600">
                <li>
                  {formData.name}
                </li>
                <li>{formData.address}
                </li>
                <li>
                  {formData.paymentDetails}
                </li>
              </ul>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
