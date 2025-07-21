import { CalendarPlus, History, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import "@/styles/components/layout/Bottombar.scss";

export const Bottombar = () => {
  return (
    <nav className="bottom-nav">
      <ul>
        <li>
          <NavLink
            to="/app"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LayoutDashboard />
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <CalendarPlus />
            <p>Nouveau mois</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <History />
            <p>Historique</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
