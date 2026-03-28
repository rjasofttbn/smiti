import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ShareholdersPage from "./pages/shareholder/ShareholdersPage";
// import AddShareholderPage from "./pages/shareholder/AddShareholderPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import AddPaymentPage from "./pages/payments/AddPaymentPage";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login lang={lang} setLang={setLang} />} />

        {/* Dashboard Layout (ONLY ONCE) */}
        <Route element={<DashboardLayout lang={lang} setLang={setLang} />}>

          <Route path="/dashboard" element={<Dashboard lang={lang} />} />

          <Route path="/shareholders/list" element={<ShareholdersPage />} />

          <Route path="/payments/list" element={<PaymentsPage />} />
          <Route path="/payments/add" element={<AddPaymentPage />} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;