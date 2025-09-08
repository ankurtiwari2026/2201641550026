import { useEffect, useState } from "react";
import { loadUrls, deleteShort } from "../utils/storage";
import AnalyticsModal from "./AnalyticsModal";

export default function ShortList() {
  const [urls, setUrls] = useState([]);
  const [selected, setSelected] = useState(null);

  const reload = () => setUrls(loadUrls());

  useEffect(() => {
    reload();
    const handler = () => reload();
    window.addEventListener("shortly:updated", handler);
    return () => window.removeEventListener("shortly:updated", handler);
  }, []);

  return (
    <section className="short-list">
      <h2>My Links</h2>
      {urls.length === 0 ? (
        <p>No links yet. Create one above!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Short</th>
              <th>Original</th>
              <th>Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u.id}>
                <td>
                  <a href={u.shortUrl} target="_blank" rel="noreferrer">
                    {u.code}
                  </a>
                </td>
                <td>
                  <a href={u.originalUrl} target="_blank" rel="noreferrer">
                    {u.originalUrl}
                  </a>
                </td>
                <td>{u.clicks || 0}</td>
                <td>
                  <button onClick={() => setSelected(u)}>Analytics</button>{" "}
                  <button
                    onClick={() => {
                      deleteShort(u.id);
                      reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selected && <AnalyticsModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
