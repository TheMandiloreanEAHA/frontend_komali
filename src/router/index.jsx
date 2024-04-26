import { createBrowserRouter } from "react-router-dom";

import LayoutMenu from "../Layout/LayoutMenu";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Paquetes from "../pages/menu/Paquetes";
import Antojitos from "../pages/menu/Antojitos";
import Guarniciones from "../pages/menu/Guarniciones";
import Sandwiches from "../pages/menu/Sandwiches";
import Bebidas from "../pages/menu/Bebidas";
import Postres from "../pages/menu/Postres";
import Otros from "../pages/menu/Otros";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/menu",
    element: <LayoutMenu />,
    children: [
      {
        index: true,
        element: <Paquetes />,
      },
      {
        path: "/menu/antojitos",
        element: <Antojitos />,
      },
      {
        path: "/menu/guarniciones",
        element: <Guarniciones />,
      },
      {
        path: "/menu/sandwiches",
        element: <Sandwiches />,
      },
      {
        path: "/menu/bebidas",
        element: <Bebidas />,
      },
      {
        path: "/menu/postres",
        element: <Postres />,
      },
      {
        path: "/menu/otros",
        element: <Otros />,
      },
    ],
  },
]);
