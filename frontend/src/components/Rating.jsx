import { StarHalf, StarIcon } from "lucide-react";
import { useState } from "react";

const Rating = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  const validatedRating = Math.max(0, Math.min(5, parseFloat(rating)));
  const fullStars = Math.floor(validatedRating);
  const hasHalfStar = validatedRating % 1 !== 0;

  // Calculate the total number of stars needed (5 total)
  const totalStars = 5;

  const getStarColor = (index) => {
    if (index < fullStars) {
      return "text-yellow-500"; // Full star
    } else if (index === fullStars && hasHalfStar) {
      return "text-yellow-400"; // Half star
    }
    return "text-gray-400"; // Empty star
  };

  const handleStarClick = (index) => {
    const clickedRating = index + 1;

    if (clickedRating === fullStars && hasHalfStar) {
      setRating(clickedRating - 0.5); // Clicked half
    } else {
      setRating(clickedRating); // Click full
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className={getStarColor(i)}
            onClick={() => handleStarClick(i)}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className={getStarColor(i)}
            onClick={() => handleStarClick(i)}
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            className={getStarColor(i)}
            onClick={() => handleStarClick(i)}
          />
        );
      }
    }
    return stars;
  };

  return <span className="flex gap-1 cursor-pointer">{renderStars()}</span>;
};

export default Rating;
