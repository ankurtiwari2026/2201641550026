import ShortenForm from "../components/ShortenForm";
import ShortList from "../components/ShortList";

export default function Home() {
  return (
    <div className="app">
      <header>
        <h1>Shortly — client-side URL shortener</h1>
        <p>Shorten links and view basic analytics (stored in your browser)</p>
      </header>

      <main>
        <ShortenForm />
        <ShortList />
      </main>
    </div>
  );
}
