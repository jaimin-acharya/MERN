/* eslint-disable react/no-unescaped-entities */
import { NavLink } from "react-router-dom";
import { Analytics } from "./Analytics";

export const HeroSection = () => {
  return (
    <>
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p>We are the World Best Smartphone Company</p>
            <h1>
              Welcome To <br /> Samsung
            </h1>
            <p>
              Samsung, South Korean company that is one of the World's largest
              producers of electronic devices. Samsung specializes in the
              production of a wide variety of consumer and industry electronics,
              including appliances, digital media devices, semiconductors,
              memory chips, and integrated systems.
            </p>
            <div className="btn btn-group">
              <NavLink to="/contact">
                <button className="btn">Connect Now</button>
              </NavLink>
              <NavLink to="/services">
                <button className="btn secondary-btn">Learn More</button>
              </NavLink>
            </div>
          </div>
          {/* HERO IMAGE */}
          <div className="hero-image">
            <img
              src="/images/home.png"
              alt="hero.png"
              width="500"
              height="500"
            />
          </div>
        </div>
      </section>

      <Analytics />

      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* HERO IMAGE */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="design.png"
              width="500"
              height="500"
            />
          </div>
          <div className="hero-content">
            <p>We are here to help you </p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take firt step towards a more efficient secure
              Smartphone? Contact Us today for a free consultation and let's
              disscuss how samsung can help your bussiness thrive in the digital
              age.
            </p>
            <div className="btn btn-group">
              <NavLink to="/contact">
                <button className="btn">Connect Now</button>
              </NavLink>
              <NavLink to="/services">
                <button className="btn secondary-btn">Learn More</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
