import React from "react";
import { Link } from "react-router-dom";

const InvestmentType = () => {
  return (
    <div className="container">
      <div className="row text-center p-4 mt-5">
        <h2>Investment options with Zerodha account</h2>
      </div>

      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-4 mb-4 p-4">
          <div>
            <h3 className="text-primary">Stocks</h3>
            <p>Invest in purchasing stocks</p>
          </div>
          <div>
            <h3 className="text-primary">Mutual funds</h3>
            <p>Invest in commission-free direct mutual funds</p>
          </div>
        </div>

        <div className="col-md-6 mb-4 p-4">
          <div>
            <h3 className="text-primary">IPO</h3>
            <p>Apply to the latest IPOs instantly via UPI</p>
          </div>
          <div className="mt-4">
            <h3 className="text-primary">Futures & options</h3>
            <p>Hedge and mitigate market risk through simplified F&O trading</p>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>

      <div className="row text-center">
        <Link to="/">
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Explore Investment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InvestmentType;
