import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  return (
    <>
      <section className="section-about">
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p>Welcome, {user ? `${user.username}` : "User"}</p>
            <h1>Why Choose Us?</h1>

            <p>
              Expertise: Our team consists of experienced IT professionals who
              are passionate about staying up-to-date with the latest industry
              trends.
            </p>

            <p>
              Customization: We understand that every business is unique. That's
              why we create solutions that are tailored to your specific needs
              and goals.
            </p>

            <p>
              Customer-Centric Approach: We prioritize your satisfaction and
              provide top-notch support to address your IT concerns.
            </p>

            <p>
              Affordability: We offer competitive pricing without compromising
              on the quality of our services.
            </p>

            <p>
              Reliability: Count on us to be there when you need us. We're
              committed to ensuring your IT environment is reliable and
              available 24/7.
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
              src="/images/about.png"
              alt="about.png"
              width="500"
              height="500"
            />
          </div>
        </div>
      </section>
    </>
  );
};
