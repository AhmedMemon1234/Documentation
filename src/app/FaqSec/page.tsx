export default function FAQs() {
    return (
      <div className="faq-container">
        <h1 className="faq-title">Pricing FAQs</h1>
        <p className="faq-subtitle">
          Problems trying to resolve the conflict between the two major realms of Classical physics
        </p>
        <div className="faq-grid">
          {Array(6).fill(null).map((_, index) => (
            <div key={index} className="faq-card">
              <h2>
                <span className="blue-arrow">&lt;</span>
                the quick fox jumps over the lazy dog
              </h2>
              <p>
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official
                consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
            </div>
          ))}
        </div>
        <p className="faq-contact">Haven't got your answer? Contact our support</p>
      </div>
    );
  }
  