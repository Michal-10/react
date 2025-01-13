import { Link } from "react-router"




export default () => {
    return (<>
        <nav style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            display: "flex",
            gap:'10px',
            backgroundColor: "#f8f9fa",
            padding: "8px 12px",
            marginRight:'3%',
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}>
            <Link style={{ color: 'black'}} to="/Home" >Home </Link>
            <Link style={{ color: 'black' }} to="/About" > About</Link>
        </nav>
    </>)
}