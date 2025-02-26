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

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar">
        {state.user ? (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            {state.user.role === "admin" && <Link to="/admin" className="nav-link">Admin</Link>}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <><h3>Please Login </h3></>
        )}
      </nav>

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
    </>
  );
};

export default App;
