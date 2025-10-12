import { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPiggyBank } from "react-icons/fa";

const server = "https://server-finance-n8j3.onrender.com";

const categorias = [
  "Alimentación",
  "Entretenimiento",
  "Salud",
  "deudas",
  "sueldo",
  "extras",
  "Otros",
];

export default function NewTransaction() {
  const [type, setType] = useState("ingreso"); // Nuevo estado
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!amount || !description || !category) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    let finalAmount = parseFloat(amount);
    if (type === "gasto") finalAmount = -Math.abs(finalAmount);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${server}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: finalAmount,
          description,
          category,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al crear la transacción");
      } else {
        navigate("/transactions");
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
          <FaPiggyBank className="text-indigo-600 text-2xl" />
          <span className="font-bold text-xl text-indigo-700">Nueva Transacción</span>
        </div>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <select
          className="border rounded-lg p-2 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <input
          type="number"
          placeholder="Monto"
          className="border rounded-lg p-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <input
          type="text"
          placeholder="Descripción"
          className="border rounded-lg p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="border rounded-lg p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona categoría</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded-lg p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </motion.div>
  );
}