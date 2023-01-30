import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import { useNavigate } from "solid-start";
import { login_post, logout_get, me_get, signup_post } from "~/lib/auth";
import { useToast } from "./toast";

const AuthContext = createContext();

const AuthProvider = props => {
  const [auth, setAuth] = createSignal(null);
  const { onCreateToast } = useToast();
  const navigate = useNavigate();

  createEffect(() => {
    if (auth()) {
      navigate("/");
    } else {
      navigate("/login");
    }
  });

  onMount(async () => {
    try {
      const { error, data } = await me_get();
      if (error) {
        return setAuth(null);
      }
      return setAuth(data);
    } catch (err) {
      throw err;
    }
  });

  const login = async (email, password) => {
    const { error, errors, data } = await login_post(email, password);
    if (error) return { error, errors };
    setAuth(data);
    return onCreateToast("success", "Login successfully");
  };

  const signup = async (username, email, password) => {
    const { error, errors, data } = await signup_post(
      username,
      email,
      password
    );
    if (error) return { error, errors };
    setAuth(data);
    return onCreateToast("success", "Signup successfully");
  };

  const logout = async () => {
    const { data } = await logout_get();
    if (data) {
      setAuth(null);
      return onCreateToast("success", "Logout successfully");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
