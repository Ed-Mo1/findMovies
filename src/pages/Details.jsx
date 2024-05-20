import { useParams } from "react-router-dom";
import { getDetails, getCredits } from "../utils/moviesApi";
import { useEffect, useState } from "react";
import Img from "../components/Img";
import vector from "../assets/Vector.svg";
const Details = () => {
  const { mediaType, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);

  const calcTime = (time) => {
    const hours = Math.floor(time / 60);
    const mins = time % 60;
    return hours > 0 && mins
      ? `${hours}h ${mins}m`
      : hours > 0 && mins < 0
      ? `${hours}h`
      : `${mins}m`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const controller = new AbortController();
    setLoading(true);
    const fetchData = async () => {
      await Promise.all([
        getDetails(mediaType, id, controller),
        getCredits(mediaType, id, controller),
      ])
        .then(([detailsData, creditsData]) => {
          setDetails(detailsData);
          setCredits(creditsData);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    fetchData();

    return () => controller.abort();
  }, [mediaType, id]);
  return (
    <>
      {!loading ? (
        <div className="linear-gradient mt-12">
          <div className="container py-24 flex flex-wrap  gap-10 justify-between items-center">
            <div>
              <h4 className="body uppercase text-yellow-600">
                {mediaType == "tv" ? "tv series" : "movie"}
              </h4>
              <h1 className="heading_xl text-gray-100 uppercase">
                {details?.original_title || details?.original_name}
              </h1>

              <div className="body_2 text-gray-100 flex items-center gap-5">
                <h5>
                  {details?.first_air_date?.slice(0, 4)}
                  {details?.release_date?.slice(0, 4)}
                </h5>

                {mediaType === "movie" && <h5>{calcTime(details?.runtime)}</h5>}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <img className="w-[48px] aspect-square" src={vector} />
              <h2 className="heading_lg text-gray-100">
                {details?.vote_average.toFixed(1)}
              </h2>

              <h5 className="caption text-gray-100 text-opacity-60 text-center">
                {details?.vote_count} <br /> ratings
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-12 py-32 skeleton"></div>
      )}

      <div className="container my-12">
        <div className="flex gap-10 flex-wrap ">
          <div className="basis-[30%] max-md:basis-full">
            {loading ? (
              <div className="skeleton aspect-[1/1.5] rounded"></div>
            ) : (
              <Img
                img={details?.poster_path}
                className="rounded-md object-contain "
              />
            )}
          </div>
          <div className="flex-1 space-y-12">
            <ul className="flex flex-wrap gap-2">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <li
                      className="skeleton py-3 px-4 w-20 p-5 rounded"
                      key={index}
                    ></li>
                  ))
                : details?.genres.map((genre) => (
                    <li
                      className="body_2 border border-gray-100 border-opacity-[12%] text-gray-100 py-2 px-3 rounded-full bg-gray-100 bg-opacity-[12%]"
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))}
            </ul>
            {loading ? (
              <div className="skeleton aspect-[2/.25] rounded"></div>
            ) : (
              <p className="body text-gray-100 max-w-[95%]">
                {details?.overview}
              </p>
            )}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="skeleton w-full max-w-[302px] aspect-[2/.2] rounded"
                    key={index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {mediaType === "movie" && (
                  <h3 className="body text-gray-100">
                    <span className="opacity-60">Director: </span>
                    {credits.crew?.map((credit) => {
                      if (credit.job === "Director") {
                        return <span key={credit.id}>{credit.name}</span>;
                      }
                    })}
                  </h3>
                )}
                {mediaType === "tv" && (
                  <h3 className="body text-gray-100">
                    <span className="opacity-60">Writer: </span>
                    {credits.crew?.map((credit) => {
                      if (credit.job === "Script Editor") {
                        return <span key={credit.id}>{credit.name}</span>;
                      }
                    })}
                  </h3>
                )}

                <h3 className="body leading-10 text-gray-100">
                  <span className="opacity-60">Stars: </span>
                  {credits.cast?.map(({ name, id }, i) => (
                    <span key={id}>
                      {i === credits.cast.length - 1 ? name : name + ", "}
                    </span>
                  ))}
                </h3>

                <h3 className="body text-gray-100">
                  <span className="opacity-60">Countries of Origin: </span>

                  {details?.production_countries.map(({ name, id }, i) => {
                    return details.production_countries.length - 1 === i ? (
                      <span key={id}>{name}</span>
                    ) : (
                      <span key={id}>{name} ,</span>
                    );
                  })}
                </h3>
                <h3 className="body text-gray-100">
                  <span className="opacity-60">release_date: </span>
                  <span>
                    {details?.release_date
                      ? new Date(details.release_date).toDateString().slice(4)
                      : null}

                    {details?.first_air_date
                      ? new Date(details.first_air_date).toDateString().slice(4)
                      : null}
                  </span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
