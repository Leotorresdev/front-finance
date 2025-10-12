import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPiggyBank, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const server = "https://server-finance-n8j3.onrender.com";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${server}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, nombre }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al registrarse");
      } else {
        navigate("/login");
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
        <div className="flex items-center gap-2 mb-2 justify-center">
          <FaPiggyBank className="text-indigo-600 text-3xl" />
          <span className="font-bold text-2xl text-indigo-700">Sass Finance</span>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-2">Crear cuenta</h2>
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <div className="flex items-center border rounded-lg p-2 w-full bg-gray-50">
          <FaUser className="text-indigo-400 mr-2" />
          <input
            type="text"
            placeholder="Nombre"
            className="bg-transparent outline-none w-full"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-2 w-full bg-gray-50">
          <FaEnvelope className="text-indigo-400 mr-2" />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="bg-transparent outline-none w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center border rounded-lg p-2 w-full bg-gray-50">
          <FaLock className="text-indigo-400 mr-2" />
          <input
            type="password"
            placeholder="Contraseña"
            className="bg-transparent outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        <div className="text-center text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            className="text-indigo-600 font-semibold cursor-pointer hover:underline bg-transparent border-none p-0"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </button>
        </div>
      </form>
    </motion.div>
  );
}