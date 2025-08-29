import React from 'react'
import Hero from './Hero'
import Signup from './Signup'
import InvestmentType from './InvestmentType'
import Steps from './Steps'
import Benefits from './Benefits'
import FAQs from './FAQs'
import OpenAccount from '../OpenAccount'

const SignupPage = () => {
  return (
    <>
        <Hero />
        <Signup />
        <InvestmentType />
        <Steps />
        <Benefits />
        <FAQs />
        <OpenAccount />
    </>
  )
}

export default SignupPage