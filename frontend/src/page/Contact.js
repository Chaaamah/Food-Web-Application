import React, { useState } from "react";

const Contact = () => {
  const [user, setUser] = useState({
    LName: "",
    FName: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", user);
  };

  return (
    <>
      <div className="contact_container">
        <div className="content">
          <h2>Contact us</h2>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Nom"
                value={user.LName}
                placeholder="Enter your last name"
                required
                autoComplete="off"
                onChange={handleChange}
              ></input>
              <input
                type="text"
                name="Prenom"
                value={user.FName}
                placeholder="Enter your first name"
                required
                autoComplete="off"
                onChange={handleChange}
              ></input>
              <input
                type="email"
                name="Email"
                value={user.Email}
                placeholder="Enter your E-mail"
                autoComplete="off"
                onChange={handleChange}
              ></input>
              <input
                type="text"
                name="Sujet"
                value={user.Subject}
                placeholder="Enter your subject"
                autoComplete="off"
                onChange={handleChange}
              ></input>
              <textarea
                name="Message"
                value={user.Message}
                placeholder="Your message"
                autoComplete="off"
                onChange={handleChange}
              ></textarea>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
