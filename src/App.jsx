import Router from "./Router"
import AuthProvider from './contexts/auth'

function App() {
 
  return (
    <>
    <AuthProvider>
        <Router/>
    </AuthProvider>
      
    </>
  )
}

export default App
