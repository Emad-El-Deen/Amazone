import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-black text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <NavLink className="text-2xl font-bold" to="">
            Amazone
          </NavLink>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-2xl">&#9776;</span>
          </button>

          {/* الروابط */}
          <div className={`w-full md:flex md:items-center md:justify-between md:w-auto gap-3 ${isOpen ? "block" : "hidden"}`}>
            <ul className="md:flex md:space-x-6">
              {null !== null ? (
                <>
                  <li>
                    <NavLink className="hover:text-gray-300" to="">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-gray-300" to="brands">
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-gray-300" to="categories">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="hover:text-gray-300" to="cart">
                      Cart
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>

            <ul className="md:flex md:space-x-4 mt-4 md:mt-0">
              {null === null ? (
                <>
                  <NavLink className="hover:text-gray-300" to={"login"}>
                    Login
                  </NavLink>
                  <NavLink className="hover:text-gray-300" to={"register"}>
                    Register
                  </NavLink>
                  <NavLink className="hover:text-gray-300" to={"products"}>
                    Products
                  </NavLink>
                </>
              ) : (
                <button className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  Logout
                </button>
              )}
            </ul>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <i className="fab fa-facebook text-xl"></i>
              <i className="fab fa-twitter text-xl"></i>
              <i className="fab fa-instagram text-xl"></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
