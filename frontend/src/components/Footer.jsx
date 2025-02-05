import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-white shadow-lg   text-gray-800 py-8">
        <div className="container mx-auto   grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="font-bold text-xl block mb-2">
              Koselie Marketplace
            </span>
            <p className="text-sm mb-4">
              Discover amazing products and connect with sellers.
            </p>
            <p className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Explore</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-gray-800">
                  Sell Your Items
                </Link>
              </li>
              <li>
                <Link to="/categorybar" className="hover:text-gray-800">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-gray-800 mb-2 text-lg">Support</h4>
            <div className="flex items-center space-x-2 mb-1">
              <Mail size={16} />
              <p className="text-sm">
                <a
                  href="mailto:support@koselie.com"
                  className="hover:text-gray-100"
                >
                  support@koselie.com
                </a>
              </p>
            </div>
            <Link to="/help" className="hover:text-gray-100 text-sm block">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
