/**
 * Providers — wraps the app in all global context providers.
 * Add new providers here (e.g. ThemeProvider, QueryClientProvider).
 */
import { AuthProvider } from "../../context/AuthContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {/* Add future providers here */}
      {children}
    </AuthProvider>
  );
}
