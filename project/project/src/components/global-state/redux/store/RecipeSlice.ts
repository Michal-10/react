import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeType } from "../../../../types/RecipeType";
import axios from "axios";
import { RootState } from "./store";

export const getRecipes = createAsyncThunk('recipes/get', async (_, thunkApi) => {
    try {
        const res = await axios.get("http://localhost:3000/api/recipes");
        return res.data as RecipeType[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const addRecipe = createAsyncThunk('recipes/add', async (recipe: RecipeType, thunkApi) => {
    try {
        const res = await axios.post("http://localhost:3000/api/recipes", recipe);
        return res.data as RecipeType[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const recipesSlice = createSlice({
    name:'recipes',
    initialState:{list :[] as RecipeType[],
        loading:true,
        error:null as string | null
    },
    reducers:{
    },
    extraReducers(builder){
        builder.
        addCase(getRecipes.pending,(state)=>{
            //לשים קומפוננטה שמתגלגלת
            state.loading=true;
            state.error=null;
        })
        .addCase(getRecipes.fulfilled,(state,action:PayloadAction<RecipeType[]>)=>{
            state.loading=false,
            state.error=null,
            state.list=action.payload
        })
        .addCase(getRecipes.rejected,(state)=>{
            state.loading = false,
            state.error = "Failed to load recipes"
        })
        .addCase(addRecipe.pending,(state)=>{
            //לשים קומפוננטה שמתגלגלת
            state.loading=true,
            state.error=null
        })
        .addCase(addRecipe.fulfilled,(state,action:PayloadAction<RecipeType[]>)=>{
            // state.loading=false,
            // state.error=null,
            state.list=action.payload
        })
        .addCase(addRecipe.rejected,(state)=>{
            state.loading = false,
            state.error = "Failed to add recipes"
        })
    }
});

export const selectRecipes = (state: RootState) => state.recipes;
export const { actions } = recipesSlice; // ייצוא הפעולות

export default recipesSlice;
