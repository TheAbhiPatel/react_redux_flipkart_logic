import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
