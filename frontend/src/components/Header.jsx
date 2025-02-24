import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md z-10 fixed w-full">
      <nav className="max-w-screen-xl  sm:ml-12 mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
              className="h-8"
              alt="logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Koselie
            </span>
          </Link>
          {/* User Menu (Desktop) */}
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {/* Navigation (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`py-2 px-3 rounded-md transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-blue-500 dark:text-blue-400 font-semibold"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation (Mobile) */}
        <div
          className={`md:hidden mt-2 ${isMenuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                location.pathname === item.href
                  ? "text-blue-500 dark:text-blue-400 font-semibold"
                  : "text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
