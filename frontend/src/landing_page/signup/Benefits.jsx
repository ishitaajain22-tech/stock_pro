import React from "react";

const Benefits = () => {
  return (
    <div className="container">
      <div className="row align-items-center p-5">
        {/* Image and main heading */}
        <div className="col-md-6 text-center">
          <img
            src="/images/benefits.png"
            alt="Benefits Illustration"
            className="img-fluid p-3"
          />
          <h3 className="fw-bold fs-2">Why choose Zerodha?</h3>
        </div>

        {/* Benefits list */}
        <div className="col-md-6 p-5">
          <div className="mb-4">
            <h3>Unbeatable pricing</h3>
            <p>
              ₹0 commission on equity & mutual fund investments. Just ₹20 per
              intraday & F&O trade.
            </p>
          </div>

          <div className="mb-4">
            <h3>Powerful platform</h3>
            <p>
              Trade on Kite – a modern, fast, and intuitive trading platform for
              web & mobile.
            </p>
          </div>

          <div className="mb-4">
            <h3>Safe & Reliable</h3>
            <p>
              Zerodha is a trusted broker with a decade of experience and strong
              tech security.
            </p>
          </div>

          <div className="mb-4">
            <h3>Supportive community</h3>
            <p>
              Join 1.6+ crore investors and traders in India’s largest investing
              community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
