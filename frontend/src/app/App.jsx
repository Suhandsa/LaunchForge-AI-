import { useRoutes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { buildRoutes } from "./routes";
import Loader from "../components/common/Loader";
import { IdeaProvider } from "../context/IdeaContext";

export default function App() {
  const { isAuth, loading } = useAuth();

  // Show fullscreen spinner while verifying token on mount
  if (loading) return <Loader type="fullscreen" text="Starting LaunchForge…" />;

  const routes = buildRoutes(isAuth);
  const element = useRoutes(routes);

  return (
    <IdeaProvider>
      {element}
    </IdeaProvider>
  );
}