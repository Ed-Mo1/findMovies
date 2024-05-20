import { useEffect, useState } from "react";
import { getUpcoming } from "../utils/moviesApi";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";
import useLoading from "../hooks/useLoading";
const Premieres = () => {
  const loading = useLoading();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getUpcoming(page).then((data) => {
      setData((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    });
  }, [page]);
  return (
    <div>
      {loading ? (
        <div className="skeleton w-[40%] rounded py-4"></div>
      ) : (
        <h2 className="heading_lg text-yellow-600">
          Premieres and announcements
        </h2>
      )}

      <div className="mt-10">
        <Carousel
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          data={data}
          Component={MovieCard}
        />
      </div>
    </div>
  );
};

export default Premieres;
