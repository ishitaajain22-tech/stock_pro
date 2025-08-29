import React from "react";

const Steps = () => {
  return (
    <div style={{ backgroundColor: "#4f4f4f17" }}>
      <div className="container py-5">
        <div className="row align-items-center mt-5">
          <h2 className="text-center">
            Steps to open a demat account with Zerodha
          </h2>
          <div className="col-md-6 p-5">
            <img
              src="images/steps.png"
              alt="Steps"
              className="img-fluid"
              style={{ width: "70%", marginLeft: "180px" }}
            />
          </div>

          <div className="col-md-6 p-5">
            {[
              { step: "01", text: "Enter the requested details" },
              { step: "02", text: "Complete e-sign & verification" },
              { step: "03", text: "Start investing!" },
            ].map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-4">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  {item.step}
                </div>
                <h5 className="mb-0">{item.text}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
