import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";

export default [
  {
    path: "/",
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
