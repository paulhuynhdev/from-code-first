import Header from "../../components/Header";

function RegisterPage() {
  return (
    <>
      <Header isRegistering={true} />
      <div className="content-container">
        <div className="registration-form">
          <div>Create Account</div>
          <input
            className="registration email"
            type="email"
            placeholder="email"
          />
          <input
            className="registatation-input username"
            type="text"
            placeholder="username"
          />
          <input
            className="registatation-input username"
            type="text"
            placeholder="first name"
          />
          <input
            className="registatation-input username"
            type="text"
            placeholder="last name"
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
      </div>
    </>
  );
}

export default RegisterPage;
