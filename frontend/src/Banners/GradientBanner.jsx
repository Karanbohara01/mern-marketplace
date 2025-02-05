import { X } from "lucide-react"; // Import the X icon for the close button
import { useState } from "react"; // Import useState to manage banner visibility
import logo from "../assets/logo.png";

const GradientBanner = () => {
  // State to control the visibility of the banner
  const [isVisible, setIsVisible] = useState(true);

  // Function to close the banner
  const handleCloseBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // If the banner is not visible, don't render anything

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-orange-600 h-64 w-full shadow-lg flex items-center justify-between p-8 text-white">
      {/* Content Section */}
      <div className="max-w-md">
        {/* Logo Area or Brand Name */}
        <div className="flex items-center mb-2">
          <img src={logo} alt="Marketplace Logo" className="h-8 w-8 mr-2" />
          <h2 className="text-xl font-bold">Koselie</h2>
        </div>

        {/* Headline - Make it compelling for a marketplace */}
        <h3 className="text-2xl font-semibold mb-2">
          Discover Unique Finds. Connect with Local Sellers.
        </h3>

        {/* Supporting Text - Short and sweet */}
        <p className="text-sm mb-4">
          Buy, Sell, and Support Your Community. Start Exploring Today!
        </p>

        {/* Action Button - Clear call to action */}
        <button className="bg-black text-white px-4 py-2 rounded-full font-medium shadow hover:bg-gray-800 transition">
          Explore More
        </button>
      </div>

      {/* Illustration Section - More relevant to a marketplace */}
      <div className="relative flex items-center justify-center">
        <img
          src={logo}
          alt="Featured Product"
          className="w-16 h-16 animate-pulse" // Slightly less intense animation
        />
      </div>

      {/* Close Button - Using lucide-react for a cleaner look */}
      <button
        onClick={handleCloseBanner} // Close the banner on click
        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default GradientBanner;
