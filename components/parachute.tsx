import Image from "next/image";
import { useCallback, useEffect } from "react";

export interface ParachuteType {
  x: number;
  y: number;
}

export const Parachute = ({
  parachutesRef,
  parachutes,
  setParachutes,
  isPaused,
}: {
  parachutesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  parachutes: ParachuteType[];
  setParachutes: React.Dispatch<React.SetStateAction<ParachuteType[]>>;
  isPaused: boolean;
}) => {
  const moveParachutes = useCallback(() => {
    setParachutes((prevParachute) =>
      prevParachute.map((parachute) => ({
        ...parachute,
        y: parachute.y + 10,
      }))
    );
  }, [setParachutes]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(moveParachutes, 100);
      return () => clearInterval(interval);
    }
  }, [isPaused, moveParachutes, setParachutes]);

  return (
    <>
      {parachutes.map((parachute, index: number) => (
        <div
          key={index}
          ref={(el) => {
            parachutesRef.current[index] = el;
          }}
          className="absolute w-[140px] h-[140px] z-10"
          style={{ left: `${parachute.x}px`, top: `${parachute.y}px` }}
        >
          <Image
            src="/parachute-2.png"
            alt="parachute"
            width={100}
            height={100}
            className={`w-auto h-auto`}
          />
        </div>
      ))}
    </>
  );
};
