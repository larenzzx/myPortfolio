import { Link } from "react-router-dom";

const Button = ({ btn, link }) => {
  const className =
    "btn btn-primary rounded-xl transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30";

  if (link?.startsWith("/")) {
    return (
      <Link to={link} className={className}>
        {btn}
      </Link>
    );
  }

  return (
    <a
      href={link}
      className={className}
    >
      {btn}
    </a>
  );
};

export default Button;
