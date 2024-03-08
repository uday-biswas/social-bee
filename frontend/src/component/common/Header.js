//before return statement
//firstly take the token , user details and total items from redux store
//then fetch the sublinks from the api and create a function to check the route to make the navbar links active
//for return statement
//put the logo, then map through the navbar links array {home, catalog, about, contact} and put the links inside li tag.
//if the title is catalog then put the sublinks inside the div tag and map through the sublinks array and
// put the links inside li tag which will be shown on hover.
//then put the login & signup button if token is null else put the cart with totalItems and profile dropdown button.

import React, { useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Small-Light.png";
import { useSelector } from "react-redux";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import { FiMenu } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { NavbarLinks } from "../../data/NavbarLinks";

const Header = () => {
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);

  const [navVisible, setNavVisible] = useState(false);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      {/* for tab and desktop */}
      <div
        className={` hidden md:flex h-14 z-10 items-center justify-center`}
      >
        <div className="fixed bg-richblack-800 flex w-full h-14 items-center justify-between">
          {/* logo */}
          <Link>
            <div className="flex ml-2">
              <img
                className="md:h-8 md:w-8 h-6 w-6"
                src={logo}
                alt="Logo"
                loading="lazy"
              />
              <div className="text-white font-bold mx-2 text-2xl ">
                Social bee
              </div>
            </div>
          </Link>

          {/* nav links */}
          <nav className="relative right-10">
            <ul className="flex gap-x-6 text-richblack-25 font-semibold">
              {NavbarLinks?.map((element, index) => (
                !(element.title === "Posts" && token === null) && (<li key={index}>
                    <Link to={element.path}>
                      <p
                        className={`${
                          matchRoute(element.path)
                            ? "text-yellow-50"
                            : "ring-richblack-50"
                        }`}
                      >
                        {element?.title}
                      </p>
                    </Link>
                </li>)
              ))}
            </ul>
          </nav>

          {/* login / signup / dashboard  */}
          <div className=" items-center gap-x-4 md:flex mr-3">
            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>

      {/* for mobile */}
      <div
        className={` md:hidden flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 transition-all duration-200"} `}
      >
        {" "}
        <div className="md:hidden text-sm flex w-full max-w-maxContent items-center justify-between">
          {/* logo */}
          <Link>
            <div className="flex ml-2">
              <img
                className="md:h-8 md:w-8 h-6 w-6"
                src={logo}
                alt="Logo"
                loading="lazy"
              />
              <div className="text-white font-bold mx-2 md:text-2xl text-xl">
                SocialBee
              </div>
            </div>
          </Link>
          {/* Button to toggle navigation */}
          <button
            onClick={toggleNav}
            className="md:hidden border border-white bottom-4 right-4 text-white z-50 p-2 rounded-md "
          >
            {navVisible ? <GiCancel /> : <FiMenu />}
          </button>
          {/* nav links */}
          <nav
            className={`absolute z-40 left-0 top-0 w-[60%] h-[100vh] bg-richblack-800 ${
              navVisible ? "visible " : "invisible "
            }`}
          >
            <ul
              className={`flex flex-col items-center justify-center gap-y-20 pt-5 text-richblack-25 `}
            >
              {NavbarLinks?.map((element, index) => (
                <li key={index}>
                    <Link to={element.path}>
                      <p
                        onClick={() => setNavVisible(false)}
                        className={`${
                          matchRoute(element.path)
                            ? "text-yellow-50"
                            : "ring-richblack-50"
                        }`}
                      >
                        {element?.title}
                      </p>
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* login / signup / dashboard  */}
          <div className="flex">
            {token === null && (
              <>
                <Link to="/login">
                  <button className="rounded-[8px] text-sm border  border-richblack-700 bg-richblack-800 p-1 text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-[8px] mx-2 text-sm border border-richblack-700 bg-richblack-800 p-1 text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
