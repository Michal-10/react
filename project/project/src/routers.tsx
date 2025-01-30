import { createBrowserRouter, Outlet } from "react-router";
import About from "./components/About";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { RecipeList } from "./components/recipes/RecipesList";
import { Provider } from "react-redux";
import store from "./components/global-state/redux/store/store";
import AddRecipe from "./components/recipes/AddRecipe";
import AppLayout from "./components/AppLayout";

export const router = createBrowserRouter([{
  path: '/',
  element: <AppLayout/>,
  children: [
    { path: '/Home', element: <HomePage />, errorElement: <h1>Error</h1> },
    { path: '/About', element: <About />, errorElement: <h1>Error</h1> },
    {
      path: '/RecipesList', element:
        <>
          <Provider store={store}>
            <RecipeList />
          </Provider>
        </>
      , errorElement: <h1>Error</h1>
    },
    { path: '/AddRecipe', element: <AddRecipe />, errorElement: <h1>Error</h1> }
  ]
},
  // { path: '/ShowUserNameAndAvatar', element: <MenuPage />, errorElement: <h1>Error</h1> }
]);

