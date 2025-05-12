import React from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";

const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.amazonReducer.products);

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
      {productsData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>
          {/* ========== Product Image Start here ============== */}
          <div className="w-full h-auto flex items-center justify-center relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="ProductImg"
            />
          </div>
          {/* ========== Product Image End here ================ */}
          {/* ========== Product Info Start here =============== */}
          <div className="px-4 bg-white flex flex-col gap-1 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ₹{item.price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0, 100)}...</p>
              <div className="text-yellow-500 flex">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      price: item.price,
                      category: item.category,
                      image: item.image,
                      quantity: 1,
                    })
                  )
                }
                className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
              >
                Add to Cart
              </button>
              {getItemQuantity(item.id) > 0 && (
                <div className="mt-3 px-3 py-1.5 bg-gray-100 rounded-md border border-gray-300">
                  <p className="text-sm font-medium">
                    {getItemQuantity(item.id)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
