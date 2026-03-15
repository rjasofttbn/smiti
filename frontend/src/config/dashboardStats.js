// src/config/dashboardStats.js
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export const getDashboardStats = (data = {}) => [
  {
    title: "Total Collection (Month)",
    value: data.monthlyCollect || "৳ 0",
    icon: <AccountBalanceWalletIcon />,
    path: "/payments",
    color: "#2e7d32",
    bgColor: "#e8f5e9",
  },
  {
    title: "Total Due (Month)",
    value: data.monthlyDue || "৳ 0",
    icon: <PendingActionsIcon />,
    path: "/payments",
    color: "#d32f2f",
    bgColor: "#ffebee",
  },
  {
    title: "Total Collected",
    value: data.totalCollect || "৳ 0",
    icon: <PaymentsIcon />,
    path: "/payments",
    color: "#1976d2",
    bgColor: "#e3f2fd",
  },
  {
    title: "Total Shareholders",
    value: data.shareholders || "0",
    icon: <PeopleIcon />,
    path: "/shareholders",
    color: "#ed6c02",
    bgColor: "#fff3e0",
  },
  {
    title: "Total Fields",
    value: data.fields || "0",
    icon: <MapIcon />,
    path: "/fields",
    color: "#9c27b0",
    bgColor: "#f3e5f5",
  },
  {
    title: "Active Payments",
    value: data.active || "0",
    icon: <AssignmentTurnedInIcon />,
    path: "/payments",
    color: "#00838f",
    bgColor: "#e0f7fa",
  },
];