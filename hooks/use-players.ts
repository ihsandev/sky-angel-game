import { PlayerType } from "@/types/players.type";
import { useEffect, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [loading, setLoading] = useState(false);

  const getPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/players");
      const dataJson = await response.json();
      const data = dataJson.data;
      setPlayers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return {
    players,
    loading,
  };
}
