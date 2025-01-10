import React from "react";

interface ReviewBarProps {
  averageRating: number; 
}

const ReviewBar: React.FC<ReviewBarProps> = ({ averageRating }) => {
  const filledStars = Math.floor(averageRating);
  
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="text-yellow-500 text-xl">
          {index < filledStars ? "★" : "☆"} 
        </span>
      ))}
    </div>
  );
};

export default ReviewBar;