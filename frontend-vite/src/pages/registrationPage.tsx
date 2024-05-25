import React from "react";
import { Header } from "../components/header";
import { RegisterForm } from "../components/RegisterForm";

type Props = {};

export const RegistrationPage = (props: Props) => {
  return (
    <>
      <Header />
      <RegisterForm />
    </>
  );
};
