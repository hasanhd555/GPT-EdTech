import React from "react";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

interface StarRatingProps {
  rating: number;
  outOf?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, outOf = 5 }) => {
  // Define styles
  const iconStyle = {
    color: "yellow",
    fontSize: "3.5rem", // Default size
    marginRight: "0.2rem", // Adjust as needed for spacing
  };
  // Create an array to hold our TSX stars
  let stars: JSX.Element[] = [];

  // Add full, half, and empty stars based on the rating
  for (let i = 1; i <= outOf; i++) {
    if (i <= rating) {
      // Full Star
      stars.push(<StarFill style={iconStyle} key={i} />);
    } else if (i - 0.5 === rating) {
      // Half Star
      stars.push(<StarHalf style={iconStyle} key={i} />);
    } else {
      // Empty Star
      stars.push(<Star style={iconStyle} key={i} />);
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
