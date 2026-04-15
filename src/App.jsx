import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./hooks/useAlert";
import { AuthProvider } from "./hooks/useAuth";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import Routes from "./routes";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AlertProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AlertProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}
