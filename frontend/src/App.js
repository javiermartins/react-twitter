import { useState } from "react";
import SignIn from "./pages/signIn";

export default function App() {
  const [user, setUser] = useState({name: "Javi"});

  return (
    <div>
      {user ? (
        <div>
          <SignIn />
        </div>
      ) : (
        <h1>No estas logueado</h1>
      )}
    </div>
  );
}
