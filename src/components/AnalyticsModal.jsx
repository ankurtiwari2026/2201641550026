import { useMemo } from "react";
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

export default function AnalyticsModal({ item, onClose }) {
  const visits = item.visits || [];

  // prepare last-7-days labels
  const labels = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      arr.push(d.toISOString().slice(0, 10));
    }
    return arr;
  }, []);

  const counts = labels.map((date) => visits.filter((v) => v.ts.slice(0, 10) === date).length);

  const data = {
    labels,
    datasets: [
      {
        label: "Clicks",
        data: counts,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          ✕
        </button>
        <h3>Analytics for {item.code}</h3>
        <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
        <p>Total clicks: {item.clicks || 0}</p>

        <div style={{ maxWidth: "100%", marginTop: 12 }}>
          <Bar data={data} />
        </div>

        <h4 style={{ marginTop: 12 }}>Recent visits</h4>
        <ul>
          {visits
            .slice()
            .reverse()
            .slice(0, 20)
            .map((v, idx) => (
              <li key={idx}>
                {new Date(v.ts).toLocaleString()} {v.referrer ? ` — ref: ${v.referrer}` : ""}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
