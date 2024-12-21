import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Layout from "../templates/Layout";
import CheckOut from "../pages/CheckOut";
import Cart from "../pages/Cart";
import ProductDetail from "../pages/ProductDetail";


function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/logout" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/cart/:id" element={<Cart />} />
            <Route path="/productDetail" element={<ProductDetail/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing  