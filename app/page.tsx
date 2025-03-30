"use client"; 

import {  useState } from "react";

import { createTournament } from "./actions/createTournament";

export default function Home() {
  const [tournamentName, setTournamentName] = useState("");
  const [pairs, setPairs] = useState([{ player1: "", player2: "" }]);

  const addPair = () => {
    setPairs([...pairs, { player1: "", player2: "" }]);
  };

  const updatePair = (index: number, field: "player1" | "player2", value: string) => {
    const updatedPairs = [...pairs];
    updatedPairs[index][field] = value;
    setPairs(updatedPairs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el envío tradicional del formulario
    await createTournament(tournamentName, pairs);
  };

  return (
    <main>
      <h1>Crear Torneo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tournamentName">Nombre del Torneo:</label>
          <input 
            type="text" 
            id="tournamentName" 
            value={tournamentName} 
            onChange={(e) => setTournamentName(e.target.value)} 
            required 
          />
        </div>

        <h2>Parejas</h2>
        {pairs.map((pair, index) => (
          <div key={index}>
            <input 
              type="text" 
              placeholder="Jugador 1" 
              value={pair.player1} 
              onChange={(e) => updatePair(index, "player1", e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Jugador 2" 
              value={pair.player2} 
              onChange={(e) => updatePair(index, "player2", e.target.value)} 
              required 
            />
          </div>
        ))}

        <button type="button" onClick={addPair}>
          Añadir Pareja
        </button>

        <button type="submit">Crear Torneo</button>
      </form>
    </main>
  );
}

