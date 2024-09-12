import { useCallback, useEffect } from "react";

export interface BirdType {
  x: number;
  y: number;
}

export const Bird = ({
  birdsRef,
  birds,
  setBirds,
  isPaused,
}: {
  birdsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  birds: BirdType[];
  setBirds: React.Dispatch<React.SetStateAction<BirdType[]>>;
  isPaused: boolean;
}) => {
  const moveBirds = useCallback(() => {
    setBirds((prevBirds) =>
      prevBirds.map((bird) => ({
        ...bird,
        x: bird.x - 10,
      }))
    );
  }, [setBirds]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(moveBirds, 100);
      return () => clearInterval(interval);
    }
  }, [moveBirds, isPaused]);

  return (
    <>
      {birds.map((bird: BirdType, idx: number) => (
        <div
          key={idx}
          ref={(el) => {
            birdsRef.current[idx] = el;
          }}
          className={`absolute w-[50px] h-[50px] z-10`}
          style={{
            left: `${bird.x}px`,
            top: `${bird.y}px`,
          }}
        >
          <iframe
            title="bird-animate"
            src="https://lottie.host/embed/40a037cf-7324-4ba9-82cf-716eec1b24b8/PVRrX3Sj7R.json"
            className={`w-auto h-auto`}
          />
        </div>
      ))}
    </>
  );
};
