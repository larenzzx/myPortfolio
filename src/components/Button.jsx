const Button = ({ btn, link }) => {
  return (
    <a
      href={link}
      className="btn btn-primary rounded-xl transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
    >
      {btn}
    </a>
  );
};

export default Button;
