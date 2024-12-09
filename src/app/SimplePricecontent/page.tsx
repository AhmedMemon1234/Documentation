export default function Pricing() {
    return (
      <div className="pricing-container">
        <div className="breadcrumb">
          <h5>Home &gt; Pricing</h5>
          <h1>Simple Pricing</h1>
          <p>
            Problems trying to resolve the conflict between the two major realms of classNameical physics: Newtonian mechanics
          </p>
        </div>
  
        <div className="pricing-section">
          <h2>Pricing</h2>
          <p className="pricing-description">
            Organize across all apps by hand
          </p>
          
          <div className="pricing-toggle">
            <span>Monthly</span>
            <div className="toggle-switch">
              <input type="checkbox" id="pricing-toggle" />
              <label htmlFor="pricing-toggle"></label>
            </div>
            <span>Yearly</span>
            <span className="save">Save 25%</span>
          </div>
          <div className="wrapper">
        <div className="pricing-table gprice-single">
            <div className="head">
                 <h4 className="title">Free</h4> 
                 <p className="paragraphorgan">Organize across all 
                 apps by hand</p>
            </div>
            <div className="content">
                <div className="price">
                    <h1>$0</h1>
                </div>
                <ul>
                    <li><span className="checkmark">✔</span>Unlimited Product Updates</li>

                </ul>
                <div className="sign-up">
                    <a href="#" className="btn bordered radius">Signup Now</a>
                </div>
            </div>
        </div>
            <div className="pricing-table gprice-single" id="colorchange">
                <div className="head">
                    <h4 className="title" id="Standard">Standard</h4>
                    <p className="paragraphorgan" id="Organise">Organize across all 
                 apps by hand</p>
                </div>
                <div className="content">
                    <div className="price">
                        <h1>$9</h1>
                    </div>
                    <ul>
                    <li id="oneli"><span className="checkmark">✔</span>Unlimited Product Updates</li>            
                    <li id="oneli"><span className="checkmark">✔</span>Unlimited Product Updates</li>            
                    </ul>
                    <div className="sign-up">
                        <a href="#" className="btn bordered radius">Signup Now</a>
                    </div>
                </div>
            </div>
                <div className="pricing-table gprice-single">
                    <div className="head">
                        <h4 className="title">Premium</h4>
                        <p className="paragraphorgan">Organize across all 
                 apps by hand</p>
                    </div>
                    <div className="content">
                        <div className="price">
                            <h1>$19</h1>
                        </div>
                        <ul>
                        <li><span className="checkmark">✔</span>Unlimited Product Updates</li>
                        </ul>
                        <div className="sign-up">
                            <a href="#" className="btn bordered radius">Signup Now</a>
                        </div>
                    </div>
                </div>
    </div>
      
        </div>
      </div>
    );
  }
  