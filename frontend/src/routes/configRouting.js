import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import User from "../pages/user/User";
import Users from "../pages/Users/Users";

export default [
  {
    path: "/",
    page: Home,
  },
  {
    path: "/users",
    page: Users,
  },
  {
    path: "/:id",
    page: User,
  },
  {
    path: "*",
    page: Error404,
  },
];
