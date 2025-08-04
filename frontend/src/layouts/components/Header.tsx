import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
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
      <div className="app-header">
        {isOpen ? (
          <div className="app-header__content">
            <div className="close-btn">
              <button
                aria-label="Fermer le menu"
                className="close-btn"
                onClick={() => setIsOpen(!isOpen)}
              >
                <X className="close-icon" />
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
                  <button
                    onClick={handleLogout}
                    className="gray-500"
                    disabled={isPending}
                  >
                    Déconnexion
                  </button>
                </li>
                {error && <p>{error.message}</p>}
              </ul>
            </nav>
          </div>
        ) : (
          <button
            className="app-header__burger-menu"
            aria-label="Ouvrir le menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AlignJustify className="burger-icon" />
          </button>
        )}
      </div>
    </header>
  );
};
