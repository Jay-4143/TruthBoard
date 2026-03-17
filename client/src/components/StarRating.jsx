import { useState } from 'react';

const StarRating = ({ rating, setRating, interactive = false, size = "h-8 w-8" }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getStarColor = (value) => {
    switch (value) {
      case 1: return "bg-[#ff3722]"; // Red
      case 2: return "bg-[#ff8622]"; // Orange-Red
      case 3: return "bg-[#ffce00]"; // Yellow/Orange
      case 4: return "bg-[#73cf11]"; // Light Green
      case 5: return "bg-[#00b67a]"; // Dark Green
      default: return "bg-gray-200";
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && setRating(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          disabled={!interactive}
          className={`${
            interactive ? "cursor-pointer" : "cursor-default"
          } transition-transform hover:scale-110 active:scale-95`}
        >
          <div
            className={`${size} flex items-center justify-center rounded-sm transition-colors duration-150 ${
              star <= activeRating ? getStarColor(activeRating) : "bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[60%] w-[60%] text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
