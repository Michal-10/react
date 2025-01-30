import { createBrowserRouter, Outlet } from "react-router";
import About from "./components/About";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

export const router = createBrowserRouter([{
    path: '/',
      element: <><NavBar/><Outlet /></>,
      children : [
      {path: '/Home', element: <HomePage/>,errorElement:<h1>Error</h1>},
      {path: '/About', element: <About/>,errorElement:<h1>Error</h1>}
]}]);

