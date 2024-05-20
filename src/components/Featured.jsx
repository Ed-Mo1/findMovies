import { useEffect, useRef, useState } from "react";
import { getTrending } from "../utils/moviesApi";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";
import useLoading from "../hooks/useLoading";

const Featured = () => {
  const loading = useLoading();
  const mediaTypes = [
    { type: "movie", name: "Movies" },
    { type: "tv", name: "Series" },
  ];
  const mediaRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentType, setCurrentType] = useState("movie");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mediaRef.current !== currentType) {
      setData([]);
      setPage(1);
      mediaRef.current = currentType;
    }
  }, [currentType]);

  useEffect(() => {
    getTrending(currentType, page).then((res) => {
      setTotalPages(res.total_pages);
      setData((prev) => [...prev, ...res.results]);
    });
  }, [currentType, page]);

  return (
    <div>
      {loading ? (
        <div className="skeleton w-[40%] rounded py-4"></div>
      ) : (
        <h2 className="heading_lg text-yellow-600">Featured Today</h2>
      )}

      {loading ? (
        <div className="skeleton w-[35%] mt-10 rounded py-4"></div>
      ) : (
        <ul className="flex gap-5 ps-5 border-b-[0.5px] border-opacity-60 border-white mt-10">
          {mediaTypes.map((type) => (
            <li
              key={type.type}
              className={`relative transition duration-500 text-gray-100 body cursor-pointer pb-2 ${
                type.type === currentType
                  ? "before:absolute before:left-0 before:bottom-[-7%] before:rounded-full before:h-1 before:w-full before:bg-gray-100"
                  : "text-opacity-60"
              }`}
              onClick={() => setCurrentType(type.type)}
            >
              {type.name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        <Carousel
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          loading={loading}
          data={data}
          Component={MovieCard}
        />
      </div>
    </div>
  );
};

export default Featured;
