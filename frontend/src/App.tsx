import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { SessionLoader } from "./components/auth/SessionLoader";

function App() {
  return (
    <BrowserRouter>
      <SessionLoader />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
