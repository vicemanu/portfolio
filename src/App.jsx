import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Router from "./Router"
import AuthProvider from './contexts/auth'

function App() {
 
  return (
    <>
    <AuthProvider>
      <ToastContainer autoClose={3000}/>
        <Router/>
    </AuthProvider>
      
    </>
  )
}

export default App
