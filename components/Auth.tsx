"use client";

import { useState } from "react";
import { loginGo, loginNode, registerGo, registerNode } from "@/lib/auth";
import { User } from "@/lib/types";

interface AuthProps {
  onSuccess: (
    tokens: { goToken: string; nodeToken: string },
    user: User,
  ) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTabChange = (tab: "login" | "register") => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (activeTab === "login") {
        const [goRes, nodeRes] = await Promise.all([
          loginGo(email, password),
          loginNode(email, password),
        ]);

        onSuccess(
          {
            goToken: goRes.data.token,
            nodeToken: nodeRes.token,
          },
          goRes.data.user,
        );
      } else {
        await Promise.all([
          registerGo(email, password),
          registerNode(email, password),
        ]);

        setSuccess(
          "¡Cuentas creadas exitosamente! Redirigiendo al inicio de sesión...",
        );
        setTimeout(() => {
          handleTabChange("login");
        }, 2000);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error durante la autenticación dual";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-in">
      {/* Navegación por Pestañas */}
      <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6">
        <button
          onClick={() => handleTabChange("login")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            activeTab === "login"
              ? "bg-primary text-black shadow-lg"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => handleTabChange("register")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
            activeTab === "register"
              ? "bg-accent text-white shadow-lg"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Crear Cuenta
        </button>
      </div>

      <div className="p-8 glass rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 blur-[100px] opacity-20 rounded-full transition-colors ${activeTab === "login" ? "bg-primary" : "bg-accent"}`}
        ></div>

        <div className="mb-8 relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            {activeTab === "login" ? "Bienvenido" : "Comenzar"}
          </h2>
          <p className="text-zinc-400 text-sm">
            {activeTab === "login"
              ? "Accede a tu panel de factorización de matrices"
              : "Crea una cuenta para empezar tu análisis"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9.88 9.88L4.62 4.62" />
                    <path d="M1 1l22 22" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <path d="M12 15a3 3 0 1 0-3-3" />
                    <path d="M12 15h.01" />
                    <path d="M22 2L2 22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-medium flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                !
              </span>
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-medium flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                ✓
              </span>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-4 text-sm font-bold rounded-2xl shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4 ${
              activeTab === "login"
                ? "bg-primary text-black hover:bg-cyan-400"
                : "bg-accent text-white hover:opacity-90"
            }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : activeTab === "login" ? (
              "Entrar al Panel"
            ) : (
              "Registrar Cuenta"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
