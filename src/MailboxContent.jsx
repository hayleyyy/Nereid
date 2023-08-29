import { Html } from "@react-three/drei";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function MailboxContent({ visible, isSent, setIsSent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(null);
  const testMode = false;

  // Basic email validation
  const validateEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendLetter = () => {
    if (testMode == true) {
      console.log("test mode ON");
      setIsSent(true);
    } else {
      if (name === "" || email === "" || message === "") {
        setError("All fields must be filled out");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (captcha !== "5") {
        setError("Please complete the captcha");
        return;
      }

      // Clear error and set as sent
      setError(null);
      sendEmail();
      setIsSent(true);
    }
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_v4lu949",
        "template_3lk604l",
        {
          from_name: name,
          reply_to: email,
          message: message,
        },
        "9Ilx2mU9r93ZatIwV"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    visible && (
      <Html
        transform
        occlude
        wrapperClass={`mailbox-content ${isSent ? "mail-sent" : ""}`}
        distanceFactor={1.7}
      >
        <div className="mail-wrapper">
          <article className="mail-letter">
            <div className="mail-side">
              <h1>Contact me</h1>
              <p>
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </p>
            </div>
            <div className="mail-side">
              <p>
                <label>name </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                <label>email </label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  name="reply_to"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label>2 + 3 = </label>
                <input
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                />
              </p>
              <p>
                <button
                  className="mail-button"
                  id="sendLetter"
                  onClick={handleSendLetter}
                >
                  Send
                </button>
              </p>
              {error && <p className="error">{error}</p>}
            </div>
          </article>
        </div>
        <p className="mail-message centered">
          Thanks! I'll get back to you soon!
        </p>
      </Html>
    )
  );
}
