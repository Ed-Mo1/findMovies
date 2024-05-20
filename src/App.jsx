import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Error from "./components/Error";
const router = createBrowserRouter([
  {
    path: "/findMovies/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement:<Error/>,
      },
      {
        path:":mediaType/:id",
        element: <Details />,
        errorElement:<Error/>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
