import { RegistrationInput } from "./components/registrationForm";
import axios from "axios";

export const api = {
  posts: {
    getPosts: () => {
      return axios.post("http://localhost:3000/users?sort=recent");
    },
  },
  register: (input: RegistrationInput) => {
    return axios.post("http://localhost:3000/users/new", {
      ...input,
    });
  },
};
