import { useState } from "react";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/signIn";

export default function App() {
  const [user, setUser] = useState({ name: "Javi" });

  return (
    <div>
      {user ? (
        <div>
          <SignIn />
        </div>
      ) : (
        <h1>No estas logueado</h1>
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
    </div>
  );
}
