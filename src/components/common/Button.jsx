import Link from "next/link";

const Button = ({ path, children, className }) => {
  return (
    <Link
      href={`${path}`}
      className={className}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-secondary opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{children}</span>
    </Link>
  );
};

export default Button;
