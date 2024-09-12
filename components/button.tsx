import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
}

export const Button = ({
  title,
  className,
  ...props
}: Readonly<IButtonProps>) => {
  return (
    <button
      className={`from-yellow-400 to-yellow-500 bg-gradient-to-b hover:from-yellow-300 hover:to-yellow-400 border-2 border-white min-w-40 text-white text-xl font-bold py-2 px-10 rounded-full ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};
