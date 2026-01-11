import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="p-8 bg-white/10 rounded-xl w-80">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input className="w-full mb-3 p-2 text-black" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input className="w-full mb-3 p-2 text-black" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button onClick={signup} className="w-full bg-green-600 p-2 rounded">Create</button>
      </div>
    </div>
  );
}
