import union from "../assets/Union.svg";
const Error = () => {
  return (
    <div className="min-h-screen space-y-4 grid place-content-center">
      <img className="w-full" src={union} alt="" />

      <h2 className="heading_lg text-gray-100 text-center">Oops....</h2>
      <p className="body text-center text-gray-100">Something went wrong.</p>

      <button
        onClick={() => location.reload()}
        className="py-2 px-4 mx-auto rounded hovrt:bg-[#FFEB3B] transition bg-yellow-600 w-fit"
      >
        Refresh
      </button>
    </div>
  );
};

export default Error;
