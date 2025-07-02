import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const { user, API } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const res_data = await response.json();
      if (response.ok) {
        setContact(defaultContactFormData);
        console.log(res_data);
        toast.success("Message send successfully");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      toast.error("Message not send");
      console.log(error);
    }
  };
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading mb-3">Contact Us</h1>
        </div>
        {/* CONTACT PAGE MAIN */}
        <div className="container grid grid-two-cols">
          {/* CONTACT CONTENT */}
          <section className="section-form">
            {/* REGISTRATION FORM */}

            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your Name"
                  required
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jhon@gmail.com"
                  required
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  required
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  cols="20"
                  rows="5"
                />
              </div>

              <br />
              <button type="submit" className="btn btn-submit">
                Send Message
              </button>
            </form>
          </section>
          <div className="contact-img">
            <img
              src="/images/support.png"
              alt="support.png"
              width="500"
              height="500"
            />
          </div>
        </div>
        <section className="mb-3 container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74843700725!2d72.41493388340731!3d23.02047409694801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1751472272234!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
