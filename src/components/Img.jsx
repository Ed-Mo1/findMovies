import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Img = ({ img, className }) => {
  return (
    <LazyLoadImage
      effect="blur"
      src={`https://image.tmdb.org/t/p/original/${img}`}
      className={` ${className} w-full object-contain rounded-lg`}
    />
  );
};

export default Img;
