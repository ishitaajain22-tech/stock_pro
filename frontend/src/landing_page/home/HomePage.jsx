import React from "react"
import Hero from "./Hero"
import Stats from "./Stats"
import Awards from "./Awards"
import Education from "./Education"
import Pricing from "./Pricing"
import OpenAccount from "../OpenAccount"
const HomePage = () => {
  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage