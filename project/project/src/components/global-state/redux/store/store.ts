import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { recipesSlice } from "./RecipeSlice";
import IsOpenModal from "./AddRecipeSlice";

export const store = configureStore({
    reducer: combineSlices(recipesSlice,IsOpenModal)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;