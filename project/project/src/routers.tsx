import { createBrowserRouter } from "react-router";
import About from "./components/About";
import HomePage from "./components/HomePage";
import AddRecipe from "./components/recipes/AddRecipe";
import AppLayout from "./components/AppLayout";
import { ShowRecipe } from "./components/recipes/ShowRecipe";
import { RecipesList } from "./components/recipes/RecipesList";

export const router = createBrowserRouter([{
  path: '/',
  element: <AppLayout />,
  children: [
    { path: '/Home', element: <HomePage />, errorElement: <h1>Error</h1> },
    { path: '/About', element: <About />, errorElement: <h1>Error</h1> },
    {
      path: '/RecipesList',
      element:
        <RecipesList />
      , children: [{
        path: ':id', element: <ShowRecipe />, errorElement: <h1>Error</h1>
      }]
      , errorElement: <h1>Error</h1>
    },
    {
      path: '/AddRecipe',
      element:
        <AddRecipe />
      , errorElement: <h1>Error</h1>,
      children: [{
        path: 'Home', element: <AppLayout />, errorElement: <h1>Error</h1>
      }]
    }
  ]
}]);

