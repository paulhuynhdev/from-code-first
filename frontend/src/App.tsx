import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { RegistrationPage } from "./pages/registrationPage";
import { UserProvider } from "./contexts/usersContext";
import { SpinnerProvider } from "./contexts/spinnerContext";

function App() {
  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <meta name="color-scheme" content="light only"></meta>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </SpinnerProvider>
  );
}

export default App;
