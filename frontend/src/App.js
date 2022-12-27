import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { isUserLogedApi } from "./api/auth";
import SignIn from "./pages/signIn";
import Routing from "./routes/Routing";
import { AuthContext } from "./utils/context";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [checkRefresh, setCheckRefresh] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setCheckRefresh(false);
    setLoadUser(true);
  }, [checkRefresh]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <div>
          <Routing setCheckRefresh={setCheckRefresh} />
        </div>
      ) : (
        <SignIn setCheckRefresh={setCheckRefresh} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
}
