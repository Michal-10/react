import NavBar from './NavBar'
import { Outlet } from 'react-router'
import MenuPage from './MenuPage'

export default () => {
    return (<>
        <MenuPage />
        <NavBar />
        <Outlet />
    </>)
}
