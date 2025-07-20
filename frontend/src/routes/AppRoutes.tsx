import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/public/Home";
import { PrivateAppLayout } from "../layouts/PrivateAppLayout";
import { Dashboard } from "../pages/app/Dashboard";
import { CreateBudget } from "../pages/app/CreateBudget";
import { History } from "../pages/app/History";
import { ProfileLayout } from "../layouts/ProfileLayout";
import { Profile } from "../pages/profile/Profile";
import { NotFound } from "../pages/NotFound";
import { RequireAuth } from "../components/auth/RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Home />} />

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path={"/app"} element={<PrivateAppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateBudget />} />
          <Route path="history" element={<History />} />
        </Route>

        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
