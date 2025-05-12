import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { allItems } from "../../constants";
import { logo } from "../../assets/index";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../../redux/amazonSlice";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.amazonReducer.products);
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  console.log(userInfo);
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userSignOut());
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex md:justify-between items-center gap-2 md:gap-4 lgl:gap-2 xl:gap-4">
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logoImage" />
          </div>
        </Link>

        <div className="hidden md:inline-flex headerHover">
          <LocationOnOutlinedIcon />
          <p className="flex flex-col text-xs text-lightText font-light">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              Jamshedpur
            </span>
          </p>
        </div>

        <div className="hidden lgl:inline-flex h-10 rounded-md flex-grow relative">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All{" "}
            <span>
              <ArrowDropDownOutlinedIcon />
            </span>
          </span>
          {showAll && (
            <div>
              <ul
                ref={ref}
                className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50"
              >
                {allItems.map((item) => (
                  <li
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                    key={item._id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchIcon />
          </span>
        </div>

        <div className="relative">
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex flex-col items-start justify-center headerHover cursor-pointer"
          >
            {userInfo ? (
              <div>
                <p className="text-sm text-gray-100 font-medium">
                  {userInfo.userName}
                </p>
                <p className="text-xs text-lightText font-light">
                  Account & Lists
                </p>
              </div>
            ) : (
              <Link to="/signin">
                <div>
                  <p className="text-xs text-lightText font-light">
                    Hello, sign in
                  </p>
                  <p className="text-sm text-gray-100 font-medium">
                    Account & Lists
                  </p>
                </div>
              </Link>
            )}
          </div>

          {showDropdown && userInfo && (
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-medium text-gray-900">{userInfo.userName}</p>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
              <div className="py-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogoutIcon className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden mdl:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
        </div>

        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="hidden mdl:inline-flex text-xs font-semibold mt-3 text-whiteText">
              Cart
            </p>
            <span className="absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
              {products.length > 0 ? products.length : 0}
            </span>
          </div>
        </Link>
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
