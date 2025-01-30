import { Dispatch, useEffect } from "react";
import { RecipeType } from "../../types/RecipeType";

export const ShowRecipe = ({recipe,setButton}:{recipe:RecipeType; setButton:Dispatch<boolean>})=>{
    
    // useEffect(()=>{
    //     setButton(false);
    // },[])
    // setButton(false);
    
    return(<>
        
        <div>
           <div> {recipe.description} - </div>
           <div>{recipe.instructions} - </div>
           <div>{recipe.products}</div> 
        </div>
    </>)
}