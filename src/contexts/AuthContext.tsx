import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [access_token, setAccess_token] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.pathname || "/home";

  const loginAction = async (data:any) => {
    try {
      const res = await apiService.loginUser(data);
      console.log("user", res.data);  
      if (res.data) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user)); 
        localStorage.setItem('currentRouteId',"1")
        setAccess_token(res.data.access_token);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (error:any) {
      const status = error.response?.status;
      if (status === 404) {
        toast.error("Utilisateur non trouvé");
        return;
      }
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setAccess_token("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user"); 
    navigate("/");
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if(access_token){
      setAccess_token(access_token);
      navigate(from);
    }else {
      navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ access_token, user, loginAction, logOut }}>
      {children}
     <Toaster position="top-center"/>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};