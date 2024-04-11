import React from 'react'

function AboutUs() {
  return (
    <>
      <div
        className="container-fluid contact py-5"
        style={{
          backgroundImage: "linear-gradient(to top right, #4A16BD,#16016C)",
        }}
      >
        <div className="container pt-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-12">
              <div className="text-center">
                <h1 className="display-3 text-white mb-4">Our Mission</h1>
                <p className="text-white fs-4">
                  At IntelliLearn, our mission is to revolutionize education by
                  leveraging cutting-edge technology to empower learners
                  worldwide. We are dedicated to providing innovative,
                  personalized learning experiences that inspire curiosity,
                  foster critical thinking, and unlock the full potential of
                  every individual. Through our commitment to excellence,
                  accessibility, and continuous improvement, we strive to
                  cultivate a future where education knows no bounds, and every
                  learner has the tools and support they need to thrive in an
                  ever-evolving world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid pb-5"
        style={{ backgroundColor: "rgb(217, 236, 255)" }}
      >
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-12">
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="d-inline-flex bg-light w-100 border border-primary p-4 rounded">
                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                    <div>
                      <h4>Physical Address</h4>
                      <p className="mb-0">
                        IntelliLearn.Inc <br />
                        M-4 Boys Hostel
                        <br />
                        LUMS, LHR ,209
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-inline-flex bg-light w-100 border border-primary p-4 rounded">
                    <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                    <div>
                      <h4>Mailing Address</h4>
                      <p className="mb-0">
                        IntelliLearn.Inc <br />
                        Room 207 <br />
                        LUMS, LHR
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-inline-flex bg-light w-100 border border-primary p-4 rounded">
                    <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                    <div>
                      <h4>Telephone</h4>
                      <p className="mb-0">
                        Toll Free: 888-334-4457 <br />
                        International: 727-359-0236 <br />
                        Fax: 727-362-6827
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="rounded">
                <div style={{ width: "100%" }}>
                  <iframe
                    width="100%"
                    height="600"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%25&amp;height=100&amp;hl=en&amp;q=M-4%20Boy%20Hostel%20Lums+(IntelliLearn.Inc)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.gps.ie/">gps systems</a>
                  </iframe>
                </div>
              </div>
              <div className="text-center p-4 rounded-bottom bg-primary">
                <h4 className="text-white fw-bold">Visit Us Anytime</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs