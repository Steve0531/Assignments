import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const PrivateRoute = () => {
  const { state } = useContext(GlobalContext);

  return state.user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
