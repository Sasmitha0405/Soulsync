import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Firebase login error:", err);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "40px 50px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #e94560, #a29bfe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            letterSpacing: "2px",
          }}
        >
          Soulsync
        </h1>
        <p style={{ color: "#bdc3c7", marginBottom: "32px", fontSize: "1.1rem" }}>
          Welcome back. Connect your soul.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#ecf0f1",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "none",
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.3)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <div style={{ marginBottom: "24px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#ecf0f1",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "none",
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.3)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#e74c3c",
                background: "rgba(231, 76, 60, 0.15)",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontSize: "0.95rem",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(90deg, #e94560, #a29bfe)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 20px rgba(233, 69, 96, 0.3)",
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-3px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "24px", color: "#95a5a6", fontSize: "0.9rem" }}>
          Don't have an account? <span style={{ color: "#a29bfe", cursor: "pointer" }}>Sign up</span>
        </p>
      </div>
    </div>
  );
}