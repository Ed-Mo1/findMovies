import React from "react";
import Featured from "../components/Featured";
import Premieres from "../components/Premieres";

const Home = () => {
  return (
    <div className="container mt-20 pe-0 space-y-20">
      <Featured />
      <Premieres />
    </div>
  );
};

export default Home;
