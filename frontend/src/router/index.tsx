import HomePage from "../pages/home";
import ErrorPage from "../pages/notFound";
import RegisterPage from "../pages/register";
import { useRoutes, RouteObject } from "react-router-dom";
import { ROUTES } from "../constants/endpoint";

const mainRoutes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <HomePage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
];

export default function Router() {
  const route = useRoutes(mainRoutes);
  return route;
}
