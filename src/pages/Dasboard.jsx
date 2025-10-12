import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaBell, FaChartPie, FaBullseye, FaWallet } from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import AIAdvisor from "../components/AIAdvisor";

const server = "https://server-finance-n8j3.onrender.com"

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${server}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setDashboard(data);
      });
    fetch(`${server}/alerts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAlerts(data));
    fetch(`${server}/goals`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  // Loader mientras llegan los datos
  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-indigo-600 font-bold text-xl">Cargando dashboard...</span>
      </div>
    );
  }

  const ingresos = dashboard.ingresos;
  const gastos = dashboard.gastos;
  const saldo = ingresos - gastos;
  const categorias = Object.entries(dashboard.porCategoria);
  const graficaMeses = dashboard.graficaMeses;

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Alertas pequeñas y discretas */}
      <div className="flex flex-wrap gap-2 mb-4">
        {alerts.map((alert, i) => (
          <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <FaBell className="text-yellow-500" /> {alert.message}
          </span>
        ))}
      </div>

      {/* Tarjetas resumen con saldo final destacado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-xl p-6 flex flex-col items-center border-4 border-green-500" whileHover={{ scale: 1.04 }}>
          <FaWallet className="text-white text-3xl mb-2" />
          <span className="text-white font-bold text-lg mb-2">Saldo Disponible</span>
          <div className="text-3xl font-extrabold text-white">${saldo}</div>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center" whileHover={{ scale: 1.03 }}>
          <FaArrowUp className="text-green-500 text-3xl mb-2" />
          <div className="text-gray-500">Ingresos</div>
          <div className="text-2xl font-bold text-green-600">{ingresos}</div>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center" whileHover={{ scale: 1.03 }}>
          <FaArrowDown className="text-red-500 text-3xl mb-2" />
          <div className="text-gray-500">Gastos</div>
          <div className="text-2xl font-bold text-red-600">{gastos}</div>
        </motion.div>
        <motion.div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center" whileHover={{ scale: 1.03 }}>
          <FaChartPie className="text-indigo-500 text-3xl mb-2" />
          <div className="text-gray-500">Categorías</div>
          <div className="text-2xl font-bold text-indigo-600">{categorias.length}</div>
        </motion.div>
      </div>

      {/* Gráficas mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="font-bold text-indigo-700 mb-4">Gastos por Categoría</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorias.map(([name, value]) => ({ name, value }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categorias.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="font-bold text-indigo-700 mb-4">Ingresos vs Gastos por Mes</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graficaMeses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ingresos" fill="#6366F1" name="Ingresos" />
              <Bar dataKey="gastos" fill="#EF4444" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sección de metas mensuales */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-100 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaBullseye className="text-indigo-600 text-2xl" />
            <span className="font-bold text-xl text-indigo-700">Metas Mensuales</span>
          </div>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
            onClick={() => navigate("/goals/new")}
          >
            Agregar Meta
          </button>
        </div>
        {goals.length === 0 ? (
          <div className="text-gray-400">No tienes metas registradas.</div>
        ) : (
          <ul className="divide-y divide-indigo-100">
            {goals.map(goal => (
              <li key={goal.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold text-indigo-700">{goal.title}</span>
                  <span className="ml-2 text-gray-500">Meta: <span className="font-bold text-green-600">${goal.amount}</span></span>
                </div>
                <div className="text-gray-500 mt-2 md:mt-0">
                  Fecha límite: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Agente de IA para recomendaciones */}
      <AIAdvisor dashboard={dashboard} goals={goals} alerts={alerts} />
    </motion.div>
  );
}