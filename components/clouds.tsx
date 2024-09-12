import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export interface CloudType {
  x: number;
  y: number;
}

export const Cloud = ({
  cloudsRef,
  clouds,
  setClouds,
  isPaused,
}: {
  cloudsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  clouds: CloudType[];
  setClouds: React.Dispatch<React.SetStateAction<CloudType[]>>;
  isPaused: boolean;
}) => {
  const [cloudSize, setCloudSize] = useState<number>(150);

  const getRandomSize = (): number => {
    return 100 + Math.random() * 100;
  };

  const moveClouds = useCallback(() => {
    setClouds((prevBirds) =>
      prevBirds.map((cloud) => ({
        ...cloud,
        x: cloud.x - 10,
      }))
    );
  }, [setClouds]);

  const changeCloudSize = useCallback(() => {
    setCloudSize(getRandomSize());
  }, [setCloudSize]);

  useEffect(() => {
    if (!isPaused) {
      const intervalSize = setInterval(changeCloudSize, 10000);
      return () => {
        clearInterval(intervalSize);
      };
    }
  }, [changeCloudSize, isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const intervalMove = setInterval(moveClouds, 100);
      return () => {
        clearInterval(intervalMove);
      };
    }
  }, [isPaused, moveClouds]);

  return (
    <>
      {clouds.map((bird: CloudType, idx: number) => (
        <div
          key={idx}
          ref={(el) => {
            cloudsRef.current[idx] = el;
          }}
          className={`absolute z-10`}
          style={{
            left: `${bird.x}px`,
            top: `${bird.y}px`,
            width: `${cloudSize}px`,
            height: `${cloudSize}px`,
          }}
        >
          <Image
            src="/cloud.png"
            alt="cloud"
            width={cloudSize}
            height={cloudSize}
            className={`w-auto h-auto`}
          />
        </div>
      ))}
    </>
  );
};
