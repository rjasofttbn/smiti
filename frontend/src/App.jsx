import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 1. Auth & Main
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard"; // Added this back

// 2. Shareholder Pages (Check if your folder is 'shareholder' or 'shareholders')
import ShareholdersPage from "./pages/shareholder/ShareholdersPage";
// import AddShareholderPage from "./pages/shareholder/AddShareholderPage";

// 3. Payment Pages (Check if your folder is 'payment' or 'payments')
import PaymentsPage from "./pages/payments/PaymentsPage"; // Added this back
// import AddPaymentPage from "./pages/payments/AddPaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login & Root */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Shareholders */}
        <Route path="/shareholders/list" element={<ShareholdersPage />} />
{/*         <Route path="/shareholders/add" element={<AddShareholderPage />} /> */}

        {/* Payments */}
        <Route path="/payments/list" element={<PaymentsPage />} />
{/*         <Route path="/payments/add" element={<AddPaymentPage />} /> */}

        {/* Catch-all: Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;