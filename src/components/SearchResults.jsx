import ResultCard from "./ResultCard";

const SearchResults = ({ data, searchInProgress, setSearchItem }) => {
  return (
    <div className="bg-gray-900 p-5 rounded space-y-5">
      {searchInProgress ? (
        <div className="flex items-center justify-center gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="w-10 aspect-square rounded-full bg-gray-100 bg-opacity-60 linerar-gradient skeleton"
            />
          ))}
        </div>
      ) : data.length > 0 ? (
        data
          .filter((item) => item.poster_path)
          .map((item) => (
            <ResultCard
              setSearchItem={setSearchItem}
              key={item?.id}
              {...item}
            />
          ))
      ) : (
        <h1 className="text-white text-center heading_md">No results found</h1>
      )}
    </div>
  );
};

export default SearchResults;
