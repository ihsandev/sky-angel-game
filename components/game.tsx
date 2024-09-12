"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AirCraft } from "./aircraft";
import { Bird, BirdType } from "./bird";
import { Button } from "./button";
import { Cloud, CloudType } from "./clouds";
import { GameOver } from "./game-over";
import { Mountain } from "./mountain";
import { Parachute, ParachuteType } from "./parachute";
import { Star } from "./star";

const initialBirds: BirdType[] = [
  { x: 1000, y: 50 },
  { x: 1200, y: 100 },
  { x: 1400, y: 200 },
];

export const Game = () => {
  const router = useRouter();
  const [isStartGame, setIsStartGame] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerName, setPlayerName] = useState<string>("");
  const aircraftRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<(HTMLDivElement | null)[]>([]);
  const birdsRef = useRef<(HTMLDivElement | null)[]>([]);
  const parachuteRef = useRef<(HTMLDivElement | null)[]>([]);
  const starRef = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [fuel, setFuel] = useState<number>(10);
  const [timer, setTimer] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [collisionDetected, setCollisionDetected] = useState(false);
  const [birds, setBirds] = useState<BirdType[]>(initialBirds);
  const [clouds, setClouds] = useState<CloudType[]>([]);
  const [parachutes, setParachutes] = useState<ParachuteType[]>([]);
  const [starsDropping, setStarsDropping] = useState<
    { x: number; y: number }[]
  >([]);

  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    return interval;
  }, [isPaused]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isStartGame && !isPaused) {
      interval = startTimer();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStartGame, isPaused, startTimer]);

  const spawnClouds = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        const newCloud: CloudType = {
          x: 1024,
          y: Math.random() * 500,
        };
        setClouds((prev) => [...prev, newCloud]);
      }
    }, 4000);
  };

  const spawnBirds = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        const newBird: BirdType = {
          x: 1024,
          y: Math.random() * 500,
        };
        setBirds((prev) => [...prev, newBird]);
      }
    }, 8000);
  };

  useEffect(() => {
    const checkCollision = (): void => {
      const aircraft = aircraftRef.current;
      if (!aircraft) return;

      const aircraftLeft = aircraft.offsetLeft;
      const aircraftTop = aircraft.offsetTop;
      const aircraftRight = aircraftLeft + aircraft.offsetWidth;
      const aircraftBottom = aircraftTop + aircraft.offsetHeight;

      birds.forEach((bird, index) => {
        const birdElement = birdsRef.current[index];
        if (!birdElement) return;

        const birdLeft = birdElement.offsetLeft;
        const birdTop = birdElement.offsetTop;
        const birdRight = birdLeft + birdElement.offsetWidth;
        const birdBottom = birdTop + birdElement.offsetHeight;

        if (
          aircraftLeft < birdRight &&
          aircraftRight > birdLeft &&
          aircraftTop < birdBottom &&
          aircraftBottom > birdTop
        ) {
          setCollisionDetected(true);
        }
      });
    };

    const interval = isStartGame ? setInterval(checkCollision, 100) : null;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [birds, isStartGame]);

  const spawnParachutesAndStars = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        const newParachute = { x: Math.random() * 1024, y: 0 };
        const newStar = { x: Math.random() * 1024, y: 0 };
        setParachutes((prev) => [...prev, newParachute]);
        setStarsDropping((prev) => [...prev, newStar]);
      }
    }, 10000);
  };

  useEffect(() => {
    const checkCollisionWithItems = (): void => {
      if (isPaused) return;

      const aircraft = aircraftRef.current;
      if (!aircraft) return;

      const aircraftLeft = aircraft.offsetLeft;
      const aircraftTop = aircraft.offsetTop;
      const aircraftRight = aircraftLeft + aircraft.offsetWidth;
      const aircraftBottom = aircraftTop + aircraft.offsetHeight;

      // Check parachutes collision
      parachutes.forEach((parachute, index) => {
        const parachuteElement = parachuteRef.current[index];
        if (!parachuteElement) return;

        const parachuteLeft = parachuteElement.offsetLeft;
        const parachuteTop = parachuteElement.offsetTop;
        const parachuteRight = parachuteLeft + parachuteElement.offsetWidth;
        const parachuteBottom = parachuteTop + parachuteElement.offsetHeight;

        if (
          aircraftLeft < parachuteRight &&
          aircraftRight > parachuteLeft &&
          aircraftTop < parachuteBottom &&
          aircraftBottom > parachuteTop
        ) {
          setFuel((prev) => prev + 10); // Increase fuel by 10
          setParachutes(
            (prev) => prev.filter((_, i) => i !== index) // Remove collected parachute
          );
        }
      });

      // Check stars collision
      starsDropping.forEach((star, index) => {
        const starElement = starRef.current[index];
        if (!starElement) return;

        const starLeft = starElement.offsetLeft;
        const starTop = starElement.offsetTop;
        const starRight = starLeft + starElement.offsetWidth;
        const starBottom = starTop + starElement.offsetHeight;

        if (
          aircraftLeft < starRight &&
          aircraftRight > starLeft &&
          aircraftTop < starBottom &&
          aircraftBottom > starTop
        ) {
          setStars((prev) => prev + 1); // Increase star count by 1
          setStarsDropping(
            (prev) => prev.filter((_, i) => i !== index) // Remove collected star
          );
        }
      });
    };

    const interval = isStartGame
      ? setInterval(checkCollisionWithItems, 100)
      : null;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [parachutes, starsDropping, isStartGame, isPaused]);

  const handleGameOver = (): void => {
    setIsStartGame(false);
    setIsPaused(true);
    setIsGameOver(true);
  };

  const handleClose = (): void => {
    setIsStartGame(false);
    setIsPaused(true);
    setIsGameOver(false);
    setPlayerName("");
  };

  useEffect(() => {
    if (fuel === 0 || collisionDetected) {
      handleGameOver();
    }
  }, [collisionDetected, fuel]);

  const togglePauseGame = (): void => {
    setIsPaused((prev) => !prev);
  };

  const handleSpacebarPress = (event: KeyboardEvent): void => {
    if (event.code === "Space") {
      togglePauseGame();
    }
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPlayerName(event.target.value);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebarPress);
    return () => {
      window.removeEventListener("keydown", handleSpacebarPress);
    };
  }, []);

  const startPlayGame = (): void => {
    const randomPosition = [
      { x: 1000, y: Math.random() * 300 },
      { x: 1200, y: Math.random() * 300 },
      { x: 1400, y: Math.random() * 300 },
    ];
    setIsStartGame(true);
    setIsPaused(false);
    setPlayerName("");
    setIsGameOver(false);
    setFuel(10);
    setTimer(0);
    setStars(0);
    setCollisionDetected(false);
    setBirds(randomPosition);
    setClouds(randomPosition);
    setParachutes(randomPosition);
    setStarsDropping(randomPosition);
    spawnClouds();
    spawnBirds();
    spawnParachutesAndStars();
  };

  return (
    <div className="w-full bg-sky-200 h-full relative lg:max-w-5xl lg:max-h-[768px] overflow-hidden">
      {(isStartGame || isGameOver) && (
        <div className="absolute top-4 left-4 text-gray-800">
          <p className="text-lg font-semibold">
            ⏲ Time: <span className="font-bold text-blue-600">{timer}s</span>
          </p>
          <p className="text-lg font-semibold">
            ⛽ Fuel: <span className="font-bold text-red-600">{fuel}</span>
          </p>
          <p className="text-lg font-semibold">
            ⭐ Stars: <span className="font-bold text-yellow-500">{stars}</span>
          </p>
        </div>
      )}
      {!isStartGame && !isGameOver ? (
        <div className="flex flex-col justify-center items-center h-full -mt-8">
          <h1 className="mb-6 text-7xl font-extrabold from-sky-700 to-sky-500 bg-gradient-to-t bg-clip-text text-transparent">
            SKY ANGEL
          </h1>
          <Button
            title="Start Game"
            className="text-4xl"
            onClick={startPlayGame}
          />
          <Button
            title="Board Players"
            className="text-base absolute top-4 right-4"
            onClick={() => router.push("/board-players")}
          />
        </div>
      ) : isGameOver ? (
        <GameOver
          data={{ name: playerName, stars, time: timer }}
          startPlayGame={startPlayGame}
          handleNameChange={handleNameChange}
          onClose={handleClose}
        />
      ) : (
        <>
          <div className="absolute left-4 bottom-4 right-4 z-30 flex items-center gap-2">
            <Button
              className="text-sm p-1 w-auto"
              onClick={togglePauseGame}
              title={isPaused ? "Resume" : "Pause"}
            />
            <Button
              className="text-sm p-1 w-auto"
              onClick={handleClose}
              title="Close"
            />
          </div>
          <Cloud
            clouds={clouds}
            setClouds={setClouds}
            cloudsRef={cloudsRef}
            isPaused={isPaused}
          />
          <Parachute
            parachutes={parachutes}
            setParachutes={setParachutes}
            parachutesRef={parachuteRef}
            isPaused={isPaused}
          />
          <Star
            stars={starsDropping}
            setStars={setStarsDropping}
            starsRef={starRef}
            isPaused={isPaused}
          />
          <Bird
            birds={birds}
            setBirds={setBirds}
            birdsRef={birdsRef}
            isPaused={isPaused}
          />
          <AirCraft isStartGame={isStartGame} aircraftRef={aircraftRef} />
        </>
      )}
      <Mountain />
    </div>
  );
};
