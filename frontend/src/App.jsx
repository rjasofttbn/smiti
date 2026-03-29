import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ShareholdersPage from "./pages/shareholder/ShareholdersPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import AddPaymentPage from "./pages/payments/AddPaymentPage";
import EditPaymentPage from "./pages/payments/EditPaymentPage";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Private Route
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login lang={lang} setLang={setLang} />} />

        {/* Dashboard Layout (Protected) */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout lang={lang} setLang={setLang} />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard lang={lang} />} />
          <Route path="/shareholders/list" element={<ShareholdersPage />} />
          <Route path="/payments/list" element={<PaymentsPage />} />
          <Route path="/payments/add" element={<AddPaymentPage />} />
          <Route path="/payments/edit/:id" element={<EditPaymentPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;