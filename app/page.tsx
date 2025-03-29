
import { supabase } from "./utils/supabase";


export default async function Home() {
  const { data: tournaments, error } = await supabase.from("tournament").select("*");

  if (error) return <p>Error al cargar los torneos</p>;
  
  return (
    <main>
      <a
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Deploy now
      </a>
      <div>
        <h1>Lista de Torneos</h1>
        <ul>
          {tournaments.map((tournament) => (
            <li key={tournament.id}>{tournament.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}