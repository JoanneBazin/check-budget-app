import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Check Your Budget</h1>
      <div className="auth-btn">
        <Link to="/login" className="auth-btn__login">
          Connexion
        </Link>
        <Link to="/signup" className="auth-btn__signup">
          Inscription
        </Link>
      </div>
    </div>
  );
};
