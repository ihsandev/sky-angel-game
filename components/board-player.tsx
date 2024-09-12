"use client";

import { usePlayers } from "@/hooks/use-players";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { Mountain } from "./mountain";

export const BoardPlayers = () => {
  const router = useRouter();
  const { players, loading } = usePlayers();

  return (
    <div className="flex justify-center mt-10 h-full">
      <Button
        className="text-sm p-1 w-auto absolute top-4 left-4"
        onClick={() => router.back()}
        title="Back"
      />
      <div className="bg-white w-full mx-10 min-h-1/2 max-h-[500px] overflow-y-auto p-8 bg-opacity-50 rounded-xl">
        <h1 className="font-bold text-2xl text-center text-sky-700">
          Board Players
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-sky-700"></div>
          </div>
        ) : (
          <table className="w-full mt-10">
            <thead>
              <tr>
                <th className="text-left font-bold text-sky-700">Name</th>
                <th className="text-left font-bold text-sky-700">Stars</th>
                <th className="text-left font-bold text-sky-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td className="text-sky-700">{player.name}</td>
                  <td className="text-sky-700">{player.stars}</td>
                  <td className="text-sky-700">{player.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Mountain />
    </div>
  );
};
