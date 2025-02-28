import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/pages/Home"
import Cart from "./components/pages/Cart"

function App() {



  return (
    <>
      <Router>
        <Layout>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>}/>

          </Routes>
        </Layout>
      </Router>
    </>
  )
}

export default App
