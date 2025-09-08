import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findByCode, recordVisit } from "../utils/storage";

export default function RedirectPage() {
  const { code } = useParams();
  const [found, setFound] = useState(true);

  useEffect(() => {
    const item = findByCode(code);
    if (!item) {
      setFound(false);
      return;
    }
    // record visit and then redirect (localStorage writes are synchronous)
    recordVisit(code);
    // use replace so back button doesn't take user to the redirect page
    window.location.replace(item.originalUrl);
  }, [code]);

  if (!found) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Not found</h2>
        <p>That short URL does not exist in this app.</p>
        <Link to="/">Go home</Link>
      </div>
    );
  }

  return <div style={{ padding: 20 }}>Redirecting…</div>;
}
// Compare this snippet from 2201641550026/src/components/ShortList.jsx: