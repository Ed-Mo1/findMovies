import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() =>
        navigate("/findMovies/", {
          replace: true,
        })
      }
      className="cursor-pointer"
      src={logo}
      alt="logo"
    />
  );
};

export default Logo;
