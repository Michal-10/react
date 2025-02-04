import { RecipeType } from "../../types/RecipeType";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../global-state/redux/store/store";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import CheckIcon from '@mui/icons-material/Check';

export const ShowRecipe = () => {

    const { id } = useParams();
    const { list: recipesList, loading } = useSelector((state: RootState) => state.recipes);
    let recipe: RecipeType | undefined;

    if (id) {
        recipe = recipesList.find(recipe => recipe.id === parseInt(id));
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            padding: 0,
                            margin: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            boxShadow: 3,
                            opacity: 0.85
                        }}>

                        {loading ? (
                            <Box sx={{ textAlign: "center", padding: 4 }}>
                                <CircularProgress size={50} />
                                <Typography sx={{ marginTop: 2 }}>Loading recipe...</Typography>
                            </Box>
                        ) : (
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h4" component="h1" gutterBottom>
                                    {recipe!.title} <RestaurantIcon />
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Description:</strong> {recipe!.description}
                                </Typography>
                                <Typography sx={{ marginTop: 1, marginBottom: 1 }} variant="body1" gutterBottom>
                                    <strong>Ingredients:</strong>
                                </Typography>
                                <div>
                                    {Array.isArray(recipe!.ingredients) ? recipe!.ingredients.map((ingredient, index) => (
                                        <Typography key={index} variant="body2">
                                            <CheckIcon /> {ingredient}
                                        </Typography>
                                    )) : recipe!.ingredients}
                                </div>
                                <Typography sx={{ marginTop: 1, marginBottom: 1 }} variant="body1" gutterBottom>
                                    <strong>Instructions:</strong> {recipe!.instructions}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                    <EmojiFoodBeverageIcon />
                                    <Typography variant="h6" sx={{ marginLeft: 1 }}>Appetite! 😋😊</Typography>
                                </Box>
                            </Paper>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}