import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import { Provider } from 'mobx-react'
import store from './global-state/redux/store/store'

export default () => {
    return (<>
        {/* <Provider store={store}> */}
            <NavBar />
            <Outlet />
        {/* </Provider> */}
    </>)
}
