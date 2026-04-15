import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import PasswordRecover from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Term from "../pages/Term/Term";

export function UnloggedRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="cadastro" element={<Register />} />

      <Route path="recover" element={<PasswordRecover />} />
      <Route path="recover/reset" element={<ResetPassword />} />

      <Route path="term" element={<Term />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
