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

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Check if there's a half star
  const hasHalfStar = rating - fullStars >= 0.5;

  // Create an array to hold our TSX stars
  let stars: JSX.Element[] = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarFill style={iconStyle} key={i} />);
  }

  // Add half star if applicable
  if (hasHalfStar) {
    stars.push(<StarHalf style={iconStyle} key="half" />);
  }

  // Add empty stars to complete the rating
  const remainingStars = outOf - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<Star style={iconStyle} key={`empty-${i}`} />);
  }

  return <div>{stars}</div>;
};

export default StarRating;
