"use client";

import { useState } from "react";
import Auth from "@/components/Auth";
import MatrixInput from "@/components/MatrixInput";
import MatrixDisplay from "@/components/MatrixDisplay";
import StatsPanel from "@/components/StatsPanel";
import { factorizeMatrix, getMatrixStats } from "@/lib/matrix";
import { User, MatrixData, MatrixStats } from "@/lib/types";

export default function Dashboard() {
  const [session, setSession] = useState<{
    tokens: { goToken: string; nodeToken: string };
    user: User;
  } | null>(() => {
    if (typeof window !== "undefined") {
      const savedSession = localStorage.getItem("matrix_session");
      if (savedSession) {
        try {
          return JSON.parse(savedSession);
        } catch (e) {
          console.error("Error al parsear la sesión", e);
          localStorage.removeItem("matrix_session");
        }
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatrixData | null>(null);
  const [stats, setStats] = useState<MatrixStats | null>(null);
  const [error, setError] = useState("");

  const handleAuthSuccess = (
    tokens: { goToken: string; nodeToken: string },
    user: User,
  ) => {
    const newSession = { tokens, user };
    setSession(newSession);
    localStorage.setItem("matrix_session", JSON.stringify(newSession));
  };

  const handleLogout = () => {
    setSession(null);
    setResults(null);
    setStats(null);
    localStorage.removeItem("matrix_session");
  };

  const runAnalysis = async (matrix: number[][]) => {
    if (!session) return;
    setLoading(true);
    setError("");

    try {
      // 1. Get QR Factorization from Go API (Port 3030) using Go Token
      const factorization = await factorizeMatrix(
        matrix,
        session.tokens.goToken,
      );
      setResults(factorization.data);

      // 2. Get Stats from Node API (Port 3050) using Node Token
      const statistics = await getMatrixStats(
        factorization,
        session.tokens.nodeToken,
      );
      setStats(statistics.data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al procesar la matriz";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Auth onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-6 animate-in">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">
            Matrix<span className="text-primary">Quant</span>
          </h1>
          <p className="text-zinc-400">
            Factorización de Matrices y Análisis Estadístico Avanzado
          </p>
        </div>
        <div className="flex items-center gap-4 glass px-4 py-2 rounded-2xl border border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Sesión de
            </p>
            <p className="text-sm font-medium text-white">
              {session.user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="grid lg:grid-cols-12 gap-8">
        <section
          className="lg:col-span-5 animate-in"
          style={{ animationDelay: "0.1s" }}
        >
          <MatrixInput onFactorize={runAnalysis} loading={loading} />
          {error && (
            <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm">
              {error}
            </div>
          )}
        </section>

        <section
          className="lg:col-span-7 space-y-8 animate-in"
          style={{ animationDelay: "0.2s" }}
        >
          {results ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <MatrixDisplay title="Q" matrix={results.q} color="primary" />
                <MatrixDisplay title="R" matrix={results.r} color="accent" />
              </div>

              {stats && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white px-1">
                    Análisis Estadístico
                  </h3>
                  <StatsPanel stats={stats} />
                </div>
              )}
            </>
          ) : (
            <div className="h-full min-h-[400px] glass rounded-3xl border border-white/10 border-dashed flex flex-col items-center justify-center text-center p-12 opacity-50">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-2xl">
                ⌨️
              </div>
              <h3 className="text-xl font-medium text-zinc-300">
                Esperando Entrada
              </h3>
              <p className="text-zinc-500 max-w-xs mt-2">
                Ingresa los valores de la matriz y ejecuta el análisis para ver
                la factorización QR y las estadísticas.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center pt-12 text-zinc-600 text-xs uppercase tracking-[0.2em]">
        &copy; 2026 Pholguinc &bull;
      </footer>
    </div>
  );
}
