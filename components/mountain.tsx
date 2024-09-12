import Image from "next/image";

export const Mountain = () => {
  return (
    <div className="absolute -bottom-6 flex justify-center w-full">
      <Image
        src="/mounting.png"
        alt="mounting"
        width={500}
        height={500}
        className="w-auto h-auto"
      />
    </div>
  );
};
