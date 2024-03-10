import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {

    const { userData } = useSelector(state => state.authReducer.login)
    const { isValid } = userData

    return isValid ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;