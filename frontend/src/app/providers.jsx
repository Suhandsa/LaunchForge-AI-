/**
 * Providers — wraps the app in all global context providers.
 * Add new providers here (e.g. ThemeProvider, QueryClientProvider).
 */
import { AuthProvider } from "../../context/AuthContext";
import { IdeaProvider } from "../../context/IdeaContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <IdeaProvider>
        {children}
      </IdeaProvider>
    </AuthProvider>
  );
}
