import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-primary-500 py-6 flex items-center justify-between">
      <div className="container mx-auto flex justify-between items-center lg:px-32 px-4">
        <span className="text-2xl md:text-3xl text-text-50 font-bold tracking-tight">
          <Link to="/">AryaVihar.com</Link>
        </span>
        <nav className="hidden md:flex space-x-7">
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="text-text-50 font-semibold hover:text-text-100 py-2"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="text-text-50 font-semibold hover:text-text-100 py-2"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="rounded-md bg-background-50 text-primary-500 px-4 py-2 font-bold hover:bg-background-100"
            >
              Sign In
            </Link>
          )}
        </nav>
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
              className="h-6 w-6 text-text-50"
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
              className="h-6 w-6 text-text-50"
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
        <div
          className={`fixed top-16 right-0 w-[200px] max-w-sm rounded-[10px] bg-background-50 p-4 md:hidden transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg z-50`}
        >
          <button
            className="self-end mb-4 focus:outline-none"
            onClick={toggleMobileMenu}
          ></button>
          {isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="block py-1 px-4 mb-3 text-text-900 hover:bg-background-100"
                onClick={closeMobileMenu}
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="block py-1 px-4 mb-3 text-text-900 hover:bg-background-100"
                onClick={closeMobileMenu}
              >
                My Hotels
              </Link>
              <SignOutButton onClick={closeMobileMenu} />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="block py-1 px-4 text-text-900 hover:bg-background-100"
              onClick={closeMobileMenu}
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
