import { FaRobot, FaLightbulb } from "react-icons/fa";
import { useState } from "react";

const server = "https://server-finance-n8j3.onrender.com";
export default function AIAdvisor({ dashboard, goals, alerts }) {
  const [aiAdvice, setAIAdvice] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const getAIAdvice = async () => {
    setLoadingAI(true);
    const saldo = dashboard?.ingresos - dashboard?.gastos;
    const resumen = `
      Mi saldo disponible es ${saldo}.
      Ingresos: ${dashboard?.ingresos ?? 0}
      Gastos: ${dashboard?.gastos ?? 0}
      Metas: ${goals.map(g => `${g.title} (${g.amount} hasta ${g.deadline})`).join(", ")}
      Alertas: ${alerts.map(a => a.message).join(", ")}
    `;
    try {
      const res = await fetch(`${server}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumen })
      });
      const data = await res.json();
      setAIAdvice(data.advice || "No se pudo obtener recomendación.");
    } catch {
      setAIAdvice("No se pudo obtener recomendación.");
    }
    setLoadingAI(false);
  };

  // Formatea el texto en lista si detecta guiones o numeración
  const renderAdvice = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter(l => l.trim());
    // Detecta si son recomendaciones tipo lista
    if (lines.length > 1 && (lines[0].startsWith('-') || lines[0].match(/^\d+\./))) {
      return (
        <ul className="list-disc pl-6 space-y-2">
          {lines.map((line, idx) => (
            <li key={idx} className="text-lg">{line.replace(/^[-\d\.]+\s*/, "")}</li>
          ))}
        </ul>
      );
    }
    return <span className="text-lg">{text}</span>;
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 mb-2">
        <FaRobot className="text-indigo-600 text-2xl" />
        <span className="font-bold text-xl text-indigo-700">Recomendaciones Inteligentes</span>
      </div>
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
        onClick={getAIAdvice}
        disabled={loadingAI}
      >
        {loadingAI ? "Consultando IA..." : "Obtener recomendación"}
      </button>
      {aiAdvice && (
        <div className="bg-gradient-to-r from-indigo-100 to-blue-50 text-indigo-900 rounded-xl p-6 mt-2 shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-yellow-400 text-2xl" />
            <span className="font-bold text-lg">Sugerencias para ti:</span>
          </div>
          {renderAdvice(aiAdvice)}
        </div>
      )}
    </div>
  );
}