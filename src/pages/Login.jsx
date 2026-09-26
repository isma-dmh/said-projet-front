import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/login.css"

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorForm, setErrorForm] = useState({ email: "", password: "" });
  const [loading,setLoading] = useState(false);
  const { login, errorLog } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (form.email.trim() === "")
      newErrors.email = "L'email ne peut pas être vide";

    if (form.password.trim() === "")
      newErrors.password = "Le mot de passe ne peut pas être vide";

    setErrorForm(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setLoading(true)
      const success = await login(form.email.trim(), form.password.trim());
      setLoading(false)
      if (success) navigate("/");
    }
  };

  return (
    <div id="admin">
      <h1>Accès administrateur</h1>

      {errorLog && (
        <p className="auth-error">Email ou mot de passe incorrect !</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input email">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Introduire votre adresse email"
          />
          {errorForm.email && <p className="error-message">{errorForm.email}</p>}
        </div>
        <div className="input password">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Introduire votre mot de passe"
          />
          {errorForm.password && <p className="error-message">{errorForm.password}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Se connecter"}
        </button>
      </form>
    </div>
  );
};