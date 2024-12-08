'use client';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-white text-6xl font-bold z-10 select-none">{text}</h1>
    </div>
  );
};