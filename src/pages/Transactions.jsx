import { useEffect, useState } from "react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const server = "https://server-finance-n8j3.onrender.com";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${server}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${server}/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Transacciones</h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
          onClick={() => navigate("/transactions/new")}
        >
          <FaPlus /> Nueva
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg">
          <thead>
            <tr className="bg-indigo-100 text-indigo-700">
              <th className="py-3 px-4 text-left">Monto</th>
              <th className="py-3 px-4 text-left">Descripción</th>
              <th className="py-3 px-4 text-left">Categoría</th>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">Cargando...</td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">Sin transacciones</td>
              </tr>
            ) : (
              transactions.map(tx => (
                <tr key={tx.id} className="border-b hover:bg-indigo-50 transition">
                  <td className="py-2 px-4">{tx.amount}</td>
                  <td className="py-2 px-4">{tx.description}</td>
                  <td className="py-2 px-4">{tx.category}</td>
                  <td className="py-2 px-4">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(tx.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}