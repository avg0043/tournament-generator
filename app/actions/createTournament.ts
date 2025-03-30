"use server";

import { supabase } from "../utils/supabase";

export async function createTournament(tournamentName: string, pairs: { player1: string; player2: string }[]) {

  console.log({
    tournamentName,
    pairs, 
  })

  const { data: tournament, error } = await supabase
    .from("tournament")
    .insert([{ name: tournamentName }])
    .select()
    .single();

  console.log("Tournament data:", tournament);

  if (error) return { error: error.message };

  console.log("Tournament created:", tournament);

  const formattedPairs = pairs.map((pair) => ({
    tournament_id: tournament.id,
    player1: pair.player1,
    player2: pair.player2,
  }));

  const { error: pairsError } = await supabase.from("pair").insert(formattedPairs);

  if (pairsError) return { error: pairsError.message };

  return { success: "Torneo creado con éxito" };
}