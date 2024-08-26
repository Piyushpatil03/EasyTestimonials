import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = useSelector(
    (state: RootState) => state.authorization.accessToken
  );

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
