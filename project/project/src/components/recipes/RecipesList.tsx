import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../global-state/redux/store/store';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRecipes } from '../global-state/redux/store/RecipeSlice';
import { RecipeType } from '../../types/RecipeType';
import { ShowRecipe } from './ShowRecipe';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export const RecipeList = () => {

    const [showRecipe, setShowRecipe] = useState<boolean>(false);
    const [currentRecipe, setCurrentRecipe] = useState<RecipeType>({} as RecipeType);

    const dispatch = useDispatch<AppDispatch>();
    const listRecipes = useSelector((state: RootState) => state.recipes.list);

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    const handleSubmit = (recipe: RecipeType) => {
        setShowRecipe(true); //true
        setCurrentRecipe(recipe);
    }

    return (<>
        
        <List sx={{ color: "black", direction: "rtl" }}>
            {listRecipes.map((item: RecipeType, index) => (
                <ListItemButton key={index} onClick={() => handleSubmit(item)} >
                    <ListItemIcon >
                        <RestaurantIcon sx={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ textAlign: "right" }} />
                </ListItemButton>
            ))}
        </List>

        {showRecipe && <ShowRecipe recipe={currentRecipe} setButton={setShowRecipe} />}
    </>)
};

