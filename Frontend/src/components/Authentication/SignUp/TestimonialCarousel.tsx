import React, { useEffect, useState } from "react";
import "./TestimonialCarousel.css";

const testimonialsData = [
  {
    id: 1,
    text: "I've gained invaluable skills and knowledge through courses on this platform. It's revolutionized the way I learn!",
    author: "Jessica S.",
  },
  {
    id: 2,
    text: "The courses offered here are top-notch! They're engaging, informative, and truly enriching. Highly recommend it!",
    author: "Michael T.",
  },
  {
    id: 3,
    text: "I never thought online learning could be this effective until I joined this platform. It's exceeded all my expectations!",
    author: "Rachel L.",
  },
  {
    id: 4,
    text: "This website has opened up a world of opportunities for me. I've been able to advance my career and broaden my skill set.",
    author: "David M.",
  },
  {
    id: 5,
    text: "I'm amazed by the quality of instruction and the variety of courses available here. It's made learning enjoyable and convenient!",
    author: "Sophie H.",
  },
  {
    id: 6,
    text: "The instructors are experts in their fields and the platform is user-friendly. It's been a game-changer for my professional development!",
    author: "Ryan K.",
  },
  {
    id: 7,
    text: "I love how flexible and accessible the courses are. Whether you're a beginner or an expert, there's something for everyone!",
    author: "Emma G.",
  },
];
const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // New state to track transition

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) { // Only proceed if not already transitioning
        setIsTransitioning(true); // Set transitioning state to true
        setActiveIndex((current) => (current + 1) % testimonialsData.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isTransitioning]); // Include isTransitioning in the dependency array

//   const handlePrevNextClick = (direction: 'prev' | 'next') => {
//     if (isTransitioning) return; // Prevent action if already transitioning

//     setIsTransitioning(true); // Set transitioning state to true
//     setActiveIndex((current) => {
//       if (direction === 'prev') {
//         return current === 0 ? testimonialsData.length - 1 : current - 1;
//       } else { // 'next'
//         return (current + 1) % testimonialsData.length;
//       }
//     });
// };

  // Function to call after a transition ends, setting isTransitioning back to false
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="testimonial-carousel-container mt-5">
      <div
        id="testimonialCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner p-2">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              onTransitionEnd={handleTransitionEnd} // Add transition end handler
            >
              <blockquote className="blockquote text-center mx-4 px-5">
                <p className="mb-0">{testimonial.text}</p>
                <footer className="blockquote-footer mt-4">
                  {testimonial.author}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
        {/* <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
          onClick={() => handlePrevNextClick('prev')}
          disabled={isTransitioning} // Disable button during transition
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
          onClick={() => handlePrevNextClick('next')}
          disabled={isTransitioning} // Disable button during transition
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
