import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import URL from './components/URL'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<URL/>}/>
      </Routes>
    </BrowserRouter>  
    
  )
}

export default App
