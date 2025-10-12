import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { FaPiggyBank, FaChartPie, FaListAlt } from "react-icons/fa";
import Login from "./pages/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dasboard";
import Transactions from "./pages/Transactions";
import NewTransaction from "./pages/NewTransaction";
import NewGoal from "./pages/NewGoal";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// Modern navbar (solo visible si hay sesión)
function Navbar() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token) return null;
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { to: "/transactions", label: "Transacciones", icon: <FaListAlt /> },
    { to: "/transactions/new", label: "Nueva", icon: <FaPiggyBank /> },
  ];
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaPiggyBank className="text-3xl text-white" />
        <span className="text-white font-bold text-xl tracking-wide">Sass Finance</span>
      </div>
      <div className="flex gap-6">
        {navItems.map(item => (
          <a
            key={item.to}
            href={item.to}
            className={`flex items-center gap-2 text-white font-semibold px-3 py-2 rounded-lg transition ${
              location.pathname === item.to ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
        <Route path="/transactions/new" element={<PrivateRoute><NewTransaction /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/register" />} />
        <Route path="/goals/new" element={<PrivateRoute><NewGoal /></PrivateRoute>} />
      </Routes>
    </div>
  );
}