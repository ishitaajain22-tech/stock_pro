import React from 'react'

const Team = () => {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="fs-2 text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            style={{ width: "40%" }}
            src="images/sumankumari.png"
            alt="Team Member"
          />
          <h4 className="mt-5">Sumana Kumari</h4>
          <h6>Developer</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Suman bootstrapped and founded Zerodha in 2020 to overcome the
            hurdles she faced during her decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            She is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is her zen.</p>
          <p>
            Connect on <a style={{ textDecoration: "none"}} href="">Homepage</a> / <a style={{ textDecoration: "none"}} href="">TradingQnA</a> /{" "}
            <a style={{ textDecoration: "none"}} href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team