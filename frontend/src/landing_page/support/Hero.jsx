import React from "react";

const Hero = () => {
  return (
    <section
      className="container-fluid py-5"
      id="supportHero"
    >
      <div className="container p-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h4 className="">Support Portal</h4>
          <a href="#" className="text-white text-decoration-underline">
            Track Tickets
          </a>
        </div>

        {/* Content Row */}
        <div className="row ">
          {/* Left Section */}
          <div className="col-5" >
            <h1 className="fs-4 mb-3">
              Search for an answer or browse help topics to create a ticket
            </h1>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
            />

            <div className="d-flex gap-2">
              <a href="#" className="text-white text-decoration-underline">
                Track account opening
              </a>
              <a href="#" className="text-white text-decoration-underline">
                Track segment activation
              </a>
              <a href="#" className="text-white">
                Intraday margins
              </a>
              <a href="#" className="text-white text-decoration-underline">
                Kite user manual
              </a>
            </div>
          </div>

          <div className="col-2"></div>

          {/* Right Section */}
          <div className="col-5">
            <h1 className="fs-4 mb-3">Featured</h1>
            <ol className="ps-3">
              <li>
                <a href="#" className="text-white text-decoration-underline">
                  Current Takeovers and Delisting - January 2024
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-underline">
                  Latest Intraday leverages - MIS & CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
