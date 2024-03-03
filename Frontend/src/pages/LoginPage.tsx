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
          <div className="col-md-6">
            <TestimonialCarousel />
          </div>
          <div className="col-md-6">
            <LoginForm />
          </div>
        </div>
      </div>
      {/* <div>Footer</div> Will insert later */}
    </div>
  );
};

export default LoginPage;
