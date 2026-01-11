import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRouter = ({ children, role }) => {
   const { user } = useAuth();
   
   if(!user) return <Navigate to="/login" />;
   if(role && user.role !==role) return <Navigate to="/403" />;

   return children;
};

export default ProtectedRouter;