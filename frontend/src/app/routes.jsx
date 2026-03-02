import { Navigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Login       from "../pages/auth/Login";
import Register    from "../pages/auth/Register";
import Dashboard   from "../pages/dashboard/Dashboard";
import IdeaDetails from "../pages/idea/IdeaDetails";
import ChatPage    from "../pages/chat/ChatPage";
import PitchDeck   from "../pages/pitch/PitchDeck";
import Settings    from "../pages/settings/Settings";

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 */
function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

/**
 * buildRoutes — returns the route config array consumed by createBrowserRouter
 * or used with <Routes> via useRoutes().
 * @param {boolean} isAuth
 */
export function buildRoutes(isAuth) {
  return [
    // Public
    { path: "/login",    element: <Login />    },
    { path: "/register", element: <Register /> },

    // Protected shell
    {
      path: "/",
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <PageLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true,          element: <Dashboard />   },
        { path: "ideas/:id",    element: <IdeaDetails /> },
        { path: "chat",         element: <ChatPage />    },
        { path: "pitch",        element: <PitchDeck />   },
        { path: "settings",     element: <Settings />    },
        { path: "*",            element: <Navigate to="/" replace /> },
      ],
    },
  ];
}
