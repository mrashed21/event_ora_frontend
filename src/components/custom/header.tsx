const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title} </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;
