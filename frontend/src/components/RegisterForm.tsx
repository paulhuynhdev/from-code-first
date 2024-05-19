import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type ValidationError = {
  message: string;
  response: {
    data: {
      error: string;
    };
  };
};
function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/users/new`, {
        email,
        username,
        firstName,
        lastName,
      });

      if (response.status === 201) {
        toast.success("Success! Redirecting home.");
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        console.log("Registration failed with status", response.status);
      }
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };

  return (
    <form className="content-container" onSubmit={handleSubmit}>
      <div className="registration-form">
        <div>Create Account</div>
        <input
          className="registration email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registatation-input username"
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="registatation-input username"
          type="text"
          value={firstName}
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="registatation-input username"
          type="text"
          placeholder="last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div>
          <div className="to-login">
            <div>Already have an account?</div>
            <a href="/login">Login</a>
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
