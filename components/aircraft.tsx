import Image from "next/image";
import { KeyboardEvent, useEffect } from "react";

export const AirCraft = ({
  isStartGame,
  aircraftRef,
}: {
  isStartGame: boolean;
  aircraftRef: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    const handleKeyDown: EventListener = (event: Event): void => {
      const keyboardEvent = event as unknown as KeyboardEvent;
      const aircraft = aircraftRef.current;
      if (!aircraft) return;

      const stepSize = 20;

      const currentLeft = aircraft.offsetLeft;
      const currentTop = aircraft.offsetTop;

      switch (keyboardEvent.key) {
        case "ArrowUp":
          if (currentTop > 0) aircraft.style.top = `${currentTop - stepSize}px`;
          break;
        case "ArrowDown":
          if (currentTop + aircraft.offsetHeight < window.innerHeight)
            aircraft.style.top = `${currentTop + stepSize}px`;
          break;
        case "ArrowLeft":
          if (currentLeft > 0)
            aircraft.style.left = `${currentLeft - stepSize}px`;
          break;
        case "ArrowRight":
          if (currentLeft + aircraft.offsetWidth < window.innerWidth)
            aircraft.style.left = `${currentLeft + stepSize}px`;
          break;
      }
    };

    if (isStartGame) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aircraftRef, isStartGame]);
  return (
    <div ref={aircraftRef} className="absolute w-[150px] z-10 top-1/4">
      <Image
        src="/aircraft-2.png"
        alt="aircraft"
        width={500}
        height={500}
        className="w-auto h-auto"
      />
    </div>
  );
};
