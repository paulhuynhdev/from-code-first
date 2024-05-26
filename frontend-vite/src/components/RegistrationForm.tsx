import React, { useState } from "react";
import { Link } from "react-router-dom";

export type RegistrationInput = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

interface RegistrationFormProps {
  onSubmit: (formDetails: RegistrationInput) => void;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { onSubmit } = props;

  const handleSubmit = () => {
    const formDetails = { email, username, firstName, lastName };
    onSubmit(formDetails);
  };

  return (
    <div className="registration-form">
      <div>Create Account</div>
      <input
        className="registration email"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="registration-input username"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="registration-input username"
        type="text"
        placeholder="first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        className="registration-input username"
        type="text"
        placeholder="last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <div>
        <div className="to-login">
          <div>Already have an account?</div>
          <Link to="/login">Login</Link>
        </div>
        <button
          onClick={() => handleSubmit()}
          className="submit-button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
