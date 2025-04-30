interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <main className={`space-y-10 p-8 rounded-xl bg-gray-0 ${className}`}>
      {children}
    </main>
  );
};

export default Card;
