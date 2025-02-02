
import { RouterProvider } from 'react-router'
import './App.css'
import store from './components/global-state/redux/store/store'
import { router } from './routers'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>)
}

export default App
