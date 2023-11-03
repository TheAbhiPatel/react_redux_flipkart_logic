import { useAppDispatch, useAppSelector } from "../store/hooks";
import { decQty, incQty, removeCartItem } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const totalPrice = cartItems.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );

  const handleRemoveCartItem = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const handleQtyIncrease = (id: number) => {
    dispatch(incQty(id));
  };
  const handleQtyDecrease = (id: number) => {
    dispatch(decQty(id));
  };

  return (
    <section className="min-h-screen  py-12 sm:py-16 lg:py-20 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-100">Your Cart</h1>
        </div>
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-slate-600 shadow mb-5">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                <ul className="-my-8">
                  {cartItems.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={item.thumbnail}
                            alt=""
                          />
                        </div>
                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-200">
                                {item.title}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-300">
                                {item.brand}
                              </p>
                            </div>
                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-200 sm:order-2 sm:ml-8 sm:text-right">
                                ${item.price}
                              </p>
                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() => handleQtyDecrease(item.id)}
                                    className="flex items-center justify-center rounded-l-md bg-gray-300 px-4 transition duration-300 hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() => handleQtyIncrease(item.id)}
                                    className="flex items-center justify-center rounded-r-md bg-gray-300 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() => handleRemoveCartItem(item.id)}
                              type="button"
                              className="flex rounded p-2 text-center text-gray-300 transition-all duration-300 ease-in-out  hover:text-gray-500"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                  className=""
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* ----> cart sub totoal and checkout  */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-200">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">Shipping</p>
                  <p className="text-lg font-semibold text-gray-200">
                    ${(cartItems.length !== 0 ? 8.0 : 0.0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-300">Total</p>
                <p className="text-2xl font-semibold text-gray-200">
                  <span className="text-xs font-normal text-gray-300">USD</span>{" "}
                  {(cartItems.length !== 0 ? totalPrice + 8 : 0.0).toFixed(2)}
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
