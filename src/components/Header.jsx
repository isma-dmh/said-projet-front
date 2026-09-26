import { Link, NavLink, useNavigate } from "react-router-dom";
import "../assets/styles/components/header.css";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header>
      <Link to="/" id="logo">
        <h2 className="comfortaa" >Aurae</h2>
      </Link>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Accueil
        </NavLink>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login-admin">Login</NavLink>
        )}
      </nav>
    </header>
  );
};
