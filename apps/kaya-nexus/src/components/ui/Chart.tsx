import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * Composant Chart universel pour afficher des graphiques (barres, lignes, etc.) avec Chart.js
 * @param {object} props
 * @param {object} props.data - Données chart.js (obligatoire)
 * @param {object} [props.options] - Options chart.js
 * @param {string} [props.type] - Type de graphique ("bar", "line"...)
 * @returns {JSX.Element|null}
 * @example
 * <Chart type="bar" data={data} options={options} />
 */
export default function Chart({ data, options = {}, type = "bar" }: { data: any; options?: any; type?: string }) {
  if (type === "bar") return <Bar data={data} options={options} />;
  // Extension facile pour d'autres types (line, pie...)
  return null;
}
