import React from 'react'
import AppRouter from './routes/AppRouter'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <ToastContainer />
    <AppRouter/>
    </>
  )
}

export default App