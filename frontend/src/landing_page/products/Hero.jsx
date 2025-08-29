import React from 'react'

const Hero = () => {
  return (
    <div className="container border-bottom mb-5">
      <div className="row text-center mt-5 p-3">
        <h1>Technology</h1>
        <h4 className="text-muted fs-4 mt-3">
          Sleek, modern and intuitive trading platform
        </h4>
        <p className="mt-3 mb-5">
          Check out our{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            investment offerings{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero