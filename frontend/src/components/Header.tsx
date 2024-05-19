import { useEffect, useState } from "react";
import logo from "../assets/dddforumlogo.png";

type Props = { isRegistering?: boolean };

type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

function Header({ isRegistering = false }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

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
      {!isRegistering && !user && (
        <div id="header-action-button">
          <a href="/register" className="header-action-button">
            Join
          </a>
        </div>
      )}
      {user && (
        <div className="flex flex-col">
          <span>{user.username}</span>
          <span>
            <a href="#" onClick={handleLogout}>
              logout
            </a>
          </span>
        </div>
      )}
    </div>
  );
}

export default Header;
