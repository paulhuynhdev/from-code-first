import {
  RegistrationForm,
  RegistrationInput,
} from "../components/RegistrationForm";
import { ToastContainer, toast } from "react-toastify";
import { Layout } from "../components/layout";
import { useSpinner } from "../contexts/spinnerContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/usersContext";
import { api } from "../api";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
};

function validateForm(input: RegistrationInput): ValidationResult {
  if (input.email.indexOf("@") === -1)
    return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2)
    return { success: false, errorMessage: "Username invalid" };
  return { success: true };
}

export const RegistrationPage = () => {
  const { setUser } = useUser();
  const spinner = useSpinner();
  const navigate = useNavigate();

  const handleSubmitRegistrationForm = async (input: RegistrationInput) => {
    const validationResult = validateForm(input);

    if (!validationResult.success) {
      return toast.error(validationResult.errorMessage);
    }
    spinner.activate();
    try {
      const response = await api.register(input);
      setUser(response.data.data);
      console.log("setting data", response.data.data);
      spinner.deactivate();
      toast("Success! Redirecting home.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      spinner.deactivate();
      return toast.error("Some backend error occurred");
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <RegistrationForm
        onSubmit={(input: RegistrationInput) =>
          handleSubmitRegistrationForm(input)
        }
      />
    </Layout>
  );
};
