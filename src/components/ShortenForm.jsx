import { useState } from "react";
import { createShort } from "../utils/storage";

import "./ShortenForm.css";


export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      try {
        const item = createShort(url, alias);
        setResult(item);
        setUrl("");
        setAlias("");
        // notify list to reload
        window.dispatchEvent(new CustomEvent("shortly:updated"));
      } catch (err) {
        setError(err.message || "Could not create short URL");
      } finally {
        setLoading(false);
      }
    }, 400); // Simulate async/animation
  };

  return (
    <section className="shorten-form animated-card">
      <form onSubmit={handleSubmit} className="shorten-form__form" aria-label="Shorten URL form">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          type="url"
          required
          className="shorten-form__input"
          aria-label="URL to shorten"
        />
        <input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="custom alias (optional)"
          className="shorten-form__input"
          aria-label="Custom alias"
        />
        <button type="submit" className="shorten-form__button" disabled={loading} aria-busy={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {error && <p className="shorten-form__error" role="alert">{error}</p>}

      {result && (
        <div className="shorten-form__result fade-in">
          <div>
            <p>
              Short URL:{" "}
              <a href={result.shortUrl} target="_blank" rel="noreferrer" className="shorten-form__shorturl">
                {result.shortUrl}
              </a>
            </p>
            <button className="shorten-form__copy" onClick={() => navigator.clipboard.writeText(result.shortUrl)}>
              Copy
            </button>
          </div>
          <div style={{ marginLeft: 12 }}>
            <QRCode value={result.shortUrl} level="M" size={120} />
          </div>
        </div>
      )}
    </section>
  );
}
