import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";
import ProductDetails from "./components/ProductDetails";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
  const { state} = useContext(GlobalContext);
  return (
    <Router>
     <Layout>
     <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Route>
        {state.user?.role === "admin" && (
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        )}
      </Routes>
    </Layout>
    </Router>
  );
};


export default App;
