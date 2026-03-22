const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={`max-w-400 mx-auto px-4 ${className}`}>{children}</main>
  );
};

export default Container;
