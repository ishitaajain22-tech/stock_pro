import React from "react";

const appsList = [
  {
    name: "Kite",
    description: "Our ultra-fast flagship platform for trading and investing.",
    image: "kite.png",
  },
  {
    name: "Coin",
    description: "Direct mutual fund investments, completely commission-free.",
    image: "coin.png",
  },
  {
    name: "Console",
    description: "The central dashboard for your Zerodha account.",
    image: "./console.png",
  },
  {
    name: "Varsity",
    description: "Explore stock market education for free.",
    image: "./varsity.png",
  },
];

const Apps = () => {
  return (
    <div className="apps-container">
      <h2>Our Apps</h2>
      <div className="apps-grid">
        {appsList.map((app, index) => (
          <div className="app-card" key={index}>
            <img src={app.image} alt={app.name} className="app-img" />
            <h3>{app.name}</h3>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
