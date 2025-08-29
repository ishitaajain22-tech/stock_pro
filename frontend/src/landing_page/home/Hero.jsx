import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img className="mb-5" src="images/homeHero.png" alt="Hero Image" />
        <h1 className="mt-5">Invest in everything</h1>
        <p>Online platform for investing in stocks, mutual funds, and more.</p>

        <Link to="/signup">
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Signup Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero