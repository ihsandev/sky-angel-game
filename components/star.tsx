import Image from "next/image";
import { useCallback, useEffect } from "react";

export interface StarType {
  x: number;
  y: number;
}

export const Star = ({
  starsRef,
  stars,
  setStars,
  isPaused,
}: {
  starsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  stars: StarType[];
  setStars: React.Dispatch<React.SetStateAction<StarType[]>>;
  isPaused: boolean;
}) => {
  const moveStars = useCallback(() => {
    setStars((prevStar) =>
      prevStar.map((star) => ({
        ...star,
        y: star.y + 10,
      }))
    );
  }, [setStars]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(moveStars, 100);
      return () => clearInterval(interval);
    }
  }, [isPaused, moveStars, setStars]);

  return (
    <>
      {stars.map((star, index: number) => (
        <div
          key={index}
          ref={(el) => {
            starsRef.current[index] = el;
          }}
          className="absolute w-[50px] h-[50px] z-10"
          style={{ left: `${star.x}px`, top: `${star.y}px` }}
        >
          <Image
            src="/star.png"
            alt="star"
            width={100}
            height={100}
            className={`w-auto h-auto`}
          />
        </div>
      ))}
    </>
  );
};
