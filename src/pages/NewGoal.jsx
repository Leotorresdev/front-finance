import { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaBullseye } from "react-icons/fa";

const server = "https://server-finance-n8j3.onrender.com";

export default function NewGoal() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !amount || !deadline) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          deadline,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la meta");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Error de conexión", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaBullseye className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl text-indigo-700">Nueva Meta Mensual</span>
        </div>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <input
          type="text"
          placeholder="Título de la meta"
          className="border rounded-lg p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto objetivo"
          className="border rounded-lg p-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <input
          type="date"
          className="border rounded-lg p-2 w-full"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Meta"}
        </button>
      </form>
    </motion.div>
  );
}