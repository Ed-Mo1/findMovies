import { useEffect, useState } from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { getSearchResults } from "../utils/moviesApi";
import SearchResults from "./SearchResults";

const Header = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchInProgress, setSearchInProgress] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setSearchResults([]);
    searchItem && setSearchInProgress(true);
    const timer = setTimeout(() => {
      if (searchItem) {
        getSearchResults(searchItem, controller)
          .then((data) => {
            setSearchResults(data?.results || []);
          })
          .finally(() => {
            setSearchInProgress(false);
          });
      }
    }, 1000);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchItem]);

  return (
    <div className="container pt-10">
      <div className="flex max-md:flex-col gap-5 items-center max-md:items-start">
        <Logo />
        <div className="flex ps-5 relative items-center max-md:w-full rounded text-black text-opacity-60 bg-gray-100 gap-2 flex-grow">
          <IoSearch className="text-xl" />
          <input
            type="text"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            placeholder="Search FindMovies"
            className="outline-none body_2 p-3 bg-transparent rounded flex-grow"
          />

          {searchItem && (
            <div className="absolute w-full z-50 top-[110%] left-0">
              <SearchResults
                setSearchItem={setSearchItem}
                data={searchResults}
                searchInProgress={searchInProgress}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
