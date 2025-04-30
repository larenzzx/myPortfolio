const Button = ({btn, link}) => {
    return (
        <a href={link} className="btn btn-primary">{btn}</a>
    );
};

export default Button