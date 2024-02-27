import React from "react";
import LoginForm from "../components/LoginForm";
import TestimonialCarousel from "../components/TestimonialCarousel";

const LoginPage = () => {
  return (
    <div>
      {/* <div>Navbar</div> Will insert later */}
      <div className="container mt-4">
        <div className="row d-flex align-items-center">
          {" "}
          {/* Added flexbox classes */}
          <div className="col-md-6">
            {/* Ensure TestimonialCarousel component has proper classes for vertical alignment */}
            <TestimonialCarousel />
          </div>
          <div className="col-md-6">
            {/* Ensure LoginForm component has proper classes for vertical alignment */}
            <LoginForm />
          </div>
        </div>
      </div>
      {/* <div>Footer</div> Will insert later */}
    </div>
  );
};

export default LoginPage;
