import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../global-state/redux/store/store';
import { Grid, List, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getRecipes } from '../global-state/redux/store/RecipeSlice';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, Outlet } from 'react-router';

export const RecipesList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const listRecipes = useSelector((state: RootState) => state.recipes.list);

    useEffect(() => {
        dispatch(getRecipes());
    }, []);

    return (<>

        <div style={{maxHeight: "calc(100vh - 100px)", overflowY: "auto", scrollPaddingRight: "10px", height: "100vh" }}>
            <Grid container sx={{ height: "100%", paddingLeft: '3%', paddingRight: '5%' }}>
                <Grid item xs={3} sx={{backgroundColor: "rgba(255, 255, 255, 0.7)", borderLeft: "1px solid #ddd", padding: 2, height: "100%", overflowY: "auto" }}>
                    <List sx={{ color: "black" }}>
                        {Array.isArray(listRecipes) ? listRecipes.map((item, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon sx={{ paddingLeft: '2vw' }}>
                                    <RestaurantIcon sx={{ color: "rosybrown" }} />
                                </ListItemIcon>
                                <Link to={`/RecipesList/${item.id}`} style={{ paddingLeft: '2vw', textDecoration: "none", color: "black" }}>
                                    {item.title}
                                </Link>
                            </ListItemButton>
                        )) : <Typography sx={{ color: "rosybrown", alignItems: "center", justifyContent: "center" }} >Loading...</Typography>}
                    </List>
                </Grid>

                <Grid item xs={9} sx={{ padding: 3, height: "100%", display: 'flex', flexDirection: 'row' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    </>)
};

