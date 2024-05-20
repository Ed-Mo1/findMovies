import { useNavigate } from "react-router-dom";

const ResultCard = ({
  setSearchItem,
  media_type,
  title,
  first_air_date,
  name,
  release_date,
  poster_path,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        setSearchItem("");
        navigate(`/findMovies/${media_type}/${id}`, {
          replace: true,
        });
      }}
      className="flex cursor-pointer  gap-5 items-start"
    >
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt="img"
        className="w-16 aspect-[1/1.5] object-cover rounded"
      />
      <div className="space-y-4">
        <h3 className="heading_md text-gray-100">{title || name}</h3>
        <span className="body_2  text-gray-100 text-opacity-60">
          {release_date || first_air_date}
        </span>
      </div>
    </div>
  );
};

export default ResultCard;
