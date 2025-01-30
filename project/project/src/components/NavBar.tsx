import { Link } from "react-router"
import { observer } from "mobx-react";
import LoginStore from "./global-state/mobX/LoginStore";

export default observer(() => {



    return (<>
        <nav style={{
            position: "absolute",
            top: "25px",
            right: "10px",
            display: "flex",
            gap: '10px',
            backgroundColor: "#f8f9fa",
            padding: "8px 12px",
            marginRight: '3%',
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}>
            <Link style={{ color: 'black' }} to="/Home" >Home </Link>
            <Link style={{ color: 'black' }} to="/About" > About</Link>
            <Link style={{ color: 'black' }} to="/RecipesList" > Recipes</Link>
            
            {/* { LoginStore.isLogin === 'after' &&
                <Link style={{ color: 'black' }} to="/AddRecipe" > add recipe</Link>
            } */}

        </nav>
    </>)
});