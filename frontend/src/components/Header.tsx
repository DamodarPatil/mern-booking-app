import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggendIn } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#b30000] py-6 flex items-center justify-between">
      <div className="container mx-auto flex justify-between items-center lg:px-32 px-4">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to="/">AryaVihar.com</Link>
        </span>
        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-7">
          {isLoggendIn ? (
            <>
              <Link
                to="/my-bookings"
                className="text-white font-semibold hover:text-[#cccccc] py-2"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-white font-semibold hover:text-[#cccccc] py-2"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="rounded-md bg-[#FFFFFF] text-[#b30000] px-4 py-2 font-bold hover:bg-[#e6e6e6]"
            >
              Sign In
            </Link>
          )}
        </nav>
        {/* Mobile Menu Icon */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        {/* Mobile Menu */}
        <div
          className={`fixed top-16 right-0 w-[200px] max-w-sm rounded-[10px] bg-white p-4 md:hidden transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg z-50`}
        >
          <button
            className="self-end mb-4 focus:outline-none"
            onClick={toggleMobileMenu}
          ></button>
          {isLoggendIn ? (
            <>
              <Link
                to="/my-bookings"
                className="block py-1 px-4 mb-3 text-black hover:bg-[#e6e6e6]"
                onClick={closeMobileMenu} // Close menu on click
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="block py-1 px-4 mb-3 text-black hover:bg-[#e6e6e6]"
                onClick={closeMobileMenu} // Close menu on click
              >
                My Hotels
              </Link>
              <SignOutButton onClick={closeMobileMenu} />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="block py-1 px-4 text-black hover:bg-[#e6e6e6]"
              onClick={closeMobileMenu} // Close menu on click
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
