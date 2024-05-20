import { Navigation } from "swiper/modules";
import { useCallback, useRef } from "react";
import { IoIosPlay } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardSkeleton from "./CardSkeleton";
const Carousel = ({ Component, totalPages, page, data, setPage, loading }) => {
  const observer = useRef();
  const observeLastSlide = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page <= totalPages) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [page, loading, totalPages, setPage]
  );

  return (
    <Swiper
      className="relative mySwiper py-5"
      slidesPerView={1}
      slidesPerGroup={1}
      modules={[Navigation]}
      spaceBetween={20}
      breakpoints={{
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        1280: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
      }}
      navigation={{
        nextEl: ".swiper-next-btn",
        prevEl: ".swiper-prev-btn",
      }}
      allowTouchMove
    >
      {loading || data.length < 1
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index + 1}>
              <CardSkeleton />
            </SwiperSlide>
          ))
        : data.map((item, i) => {
            if (data.length == i + 1) {
              return (
                <SwiperSlide key={item.id}>
                  <div ref={observeLastSlide}>
                    {<Component reference={observeLastSlide} {...item} />}
                  </div>
                </SwiperSlide>
              );
            }

            return (
              <SwiperSlide key={item.id}>{<Component {...item} />}</SwiperSlide>
            );
          })}

      <button
        className={`swiper-prev-btn  absolute z-40 top-[40%] -translate-y-1/2 left-5 max-[320px]:left-1 swiper-btn `}
      >
        <IoIosPlay className="rotate-180" />
      </button>
      <button className="swiper-next-btn top-[40%] absolute z-40 -translate-y-1/2 right-5 max-[320px]:right-1 swiper-btn ">
        <IoIosPlay />
      </button>
    </Swiper>
  );
};

export default Carousel;
