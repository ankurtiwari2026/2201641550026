import { useEffect, useState } from "react";
import { loadUrls } from "../utils/storage";
import { useAuth } from "../context/useAuth";
import "./Statistics.css";

export default function Statistics() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(loadUrls());
  }, []);

  return (
    <div className="statistics-page">
      <h2>Statistics for {user?.username}</h2>
      <div className="statistics-list">
        {urls.length === 0 ? (
          <p>No links found.</p>
        ) : (
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Short</th>
                <th>Original</th>
                <th>Clicks</th>
                <th>Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((u) => (
                <tr key={u.id}>
                  <td><a href={u.shortUrl} target="_blank" rel="noreferrer">{u.code}</a></td>
                  <td className="statistics-table__original"><a href={u.originalUrl} target="_blank" rel="noreferrer">{u.originalUrl}</a></td>
                  <td>{u.clicks || 0}</td>
                  <td>{u.visits && u.visits.length > 0 ? new Date(u.visits[u.visits.length-1].ts).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
