import Image from "next/image";
import { Button } from "./button";
import { useState } from "react";

interface IGameOver {
  data: {
    name: string;
    time: number;
    stars: number;
  };
  startPlayGame: () => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
}

export const GameOver = ({
  data,
  startPlayGame,
  handleNameChange,
  onClose,
}: Readonly<IGameOver>) => {
  const [loading, setLoading] = useState(false);

  const handleContinue = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      } else {
        startPlayGame();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="flex justify-center mb-4">
        <Image
          alt="gameover"
          src={"/game-over.png"}
          width={500}
          height={500}
          className="w-1/2 h-1/2"
        />
      </div>
      <form className="space-y-4">
        <input
          type="text"
          value={data.name}
          disabled={loading}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="border border-gray-300 p-2 rounded-full w-full text-center outline-yellow-400"
        />
        <div className="flex items-center gap-2 justify-center">
          <Button
            type="button"
            disabled={!data.name.trim() || loading}
            className={`${
              !data.name.trim() && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleContinue}
            title={loading ? "Submitting" : "Continue"}
          />
          <Button className="text-sm px-2" onClick={onClose} title="Cancel" />
        </div>
      </form>
    </div>
  );
};
