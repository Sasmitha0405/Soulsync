import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="p-8 bg-white/10 rounded-xl w-80">
        <h2 className="text-xl mb-4">Reset Password</h2>
        <input className="w-full mb-3 p-2 text-black" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <button onClick={()=>sendPasswordResetEmail(auth,email)} className="w-full bg-purple-600 p-2 rounded">
          Send link
        </button>
      </div>
    </div>
  );
}
