import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main>
      <h1>Check Your Budget</h1>
      <div className="auth-actions">
        <Link to="/login" className="auth-actions__login">
          Connexion
        </Link>
        <Link to="/signup" className="auth-actions__signup">
          Inscription
        </Link>
      </div>
    </main>
  );
};
