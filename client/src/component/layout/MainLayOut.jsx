import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar'


const MainLayOut = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default MainLayOut