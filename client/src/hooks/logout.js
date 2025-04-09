/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router-dom"

export const logout = () => {
     const navigate = useNavigate();

     localStorage.removeItem('token')
     navigate("/sign");
}