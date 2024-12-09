        import Image from "next/image";

        export default function Office() {
          const contactItems = [
            {
              id: 1,
              icon: "/icn settings .icn-xl.png", 
              email1: "georgia.young@example.com",
              email2: "georgia.young@ple.com",
              buttonText: "Submit Request",
            },
            {
              id: 2,
              icon: "/icn settings .icn-xl (1).png", 
              email1: "georgia.young@example.com",
              email2: "georgia.young@ple.com",
              buttonText: "Submit Request",
            },
            {
              id: 3,
              icon: "/icn settings .icn-xl (2).png", 
              email1: "georgia.young@example.com",
              email2: "georgia.young@ple.com",
              buttonText: "Submit Request",
            },
          ];
        
          return (
            <div className="contact-section">
              <h5 className="contact-subheading">VISIT OUR OFFICE</h5>
              <h1 className="contact-heading">We help small businesses with big ideas</h1>
              <div className="contact-cards">
                {contactItems.map((item) => (
                  <div
                    key={item.id}
                    className={`contact-card ${
                      item.id === 2 ? "contact-card-dark" : ""
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt="Icon"
                      width={50}
                      height={50}
                      className="contact-card-icon"
                    />
                    <p className="contact-card-email">{item.email1}</p>
                    <p className="contact-card-email">{item.email2}</p>
                    <p className="contact-card-support">Get Support</p>
                    <button className="contact-card-button">{item.buttonText}</button>
                  </div>
                ))}
              </div>
            </div>
          );
        }
