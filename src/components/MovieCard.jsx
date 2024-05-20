import vector from "../assets/Vector.svg";
import Img from "./Img";
import { useNavigate } from "react-router-dom";
const MovieCard = ({
  poster_path,
  title,
  name,
  vote_average,
  id,
  media_type = "movie",
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/findMovies/${media_type}/${id}`, {
          replace: true,
        })
      }
      className=" hover:-translate-y-4 group  transition duration-500 cursor-pointer"
    >
      <div className="aspect-[1/1.5] relative  group-hover:before:bg-opacity-0 before:transition before:w-full before:h-full before:z-20 before:inset-0 before:absolute before:bg-black before:opacity-[24%]">
        <Img img={poster_path} />
        <div className="absolute z-30 bottom-0 flex items-center gap-1 left-0 p-2 bg-black rounded">
          <img src={vector} alt="" />
          <span className="text-white">{vote_average.toFixed(1)}</span>
        </div>
      </div>
      <h3 className="body_2 text-center text-gray-100">{title || name}</h3>
    </div>
  );
};

export default MovieCard;
