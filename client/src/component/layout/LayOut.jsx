import React from 'react'
import { Outlet } from 'react-router-dom'
import MainLayOut from './MainLayOut'
import NavBarHome from '../afterRegisterComponents/NavBarHome'
import DashBoard from '../afterRegisterComponents/DashBoard'

const LayOut = () => {
  return (
    <>
    <NavBarHome/>
    <Outlet/>
    </>
  )
}

export default LayOut