import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import "@/styles/components/layout/Header.scss";
import { useLogoutMutation } from "@/hooks/queries/mutations";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error } = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    mutate(undefined, { onSuccess: () => navigate("/") });
  };
  return (
    <header>
      {isOpen ? (
        <div className="header-nav">
          <div className="close-btn">
            <button
              aria-label="Fermer le menu"
              className="close-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X />
            </button>
          </div>
          <nav>
            <ul className="nav-items">
              <li>
                <NavLink
                  to="/app"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Gérer mes budgets
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Profil
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} disabled={isPending}>
                  Déconnexion
                </button>
              </li>
              {error && <p>{error.message}</p>}
            </ul>
          </nav>
        </div>
      ) : (
        <button
          className="burger-menu-icon"
          aria-label="Ouvrir le menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AlignJustify />
        </button>
      )}
    </header>
  );
};
