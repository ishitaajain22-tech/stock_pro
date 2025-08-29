import React from "react";

const FAQs = () => {
  const faqData = [
    {
      question: "What is Zerodha?",
      answer:
        "Zerodha is a leading stock brokerage firm in India that offers a platform for trading in stocks, commodities, and currencies.",
    },
    {
      question: "How do I open an account?",
      answer:
        "You can open an account online by visiting our website and filling out the application form. You will need to provide some documents for verification.",
    },
    {
      question: "What are the charges for trading?",
      answer:
        "Zerodha charges a flat fee of ₹20 per trade for equity and commodity trading, and there are no brokerage fees for delivery trades.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Yes, Zerodha offers a mobile app called Kite, which allows you to trade on the go.",
    },
    {
      question: "What is the minimum amount required to start trading?",
      answer:
        "There is no minimum amount required to open an account, but you will need sufficient funds to cover your trades.",
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Frequently Asked Questions</h2>
      <div className="accordion p-5" id="faqAccordion">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button custom-accordion-button fs-5 fw-normal"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
