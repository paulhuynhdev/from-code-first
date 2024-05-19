import logo from "../assets/dddforumlogo.png";

type Props = { isRegistering: boolean };

function Header({ isRegistering = false }: Props) {
  return (
    <div className="flex align-center">
      <div className="max-w-16">
        <img src={logo} />
      </div>
      <div className="flex items-start flex-col">
        <h1>Domain-Driven Designers</h1>
        <h3>Where awesome domain driven designers are made</h3>
        <a href="/submit">submit</a>
      </div>

      {!isRegistering && (
        <div id="header-action-button">
          <a href="/register" className="header-action-button">
            Join
          </a>
        </div>
      )}
    </div>
  );
}

export default Header;
