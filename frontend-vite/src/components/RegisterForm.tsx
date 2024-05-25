import React from "react";

type Props = {};

export const RegisterForm = (props: Props) => {
  return (
    <div class="registration-form">
      <div>Create Account</div>
      <input class="registration email" type="email" placeholder="email" />
      <input
        class="registatation-input username"
        type="text"
        placeholder="username"
      />
      <input
        class="registatation-input username"
        type="text"
        placeholder="first name"
      />
      <input
        class="registatation-input username"
        type="text"
        placeholder="last name"
      />
      <div>
        <div class="to-login">
          <div>Already have an account?</div>
          <a href="/login">Login</a>
        </div>
        <button class="submit-button" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};
