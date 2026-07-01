"use client";

import { useActionState, useEffect } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
  }, [state]);

  return (
    <div className="admin-card login-card">
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center", fontFamily: "var(--font-title)" }}>
        Acceso Panel Admin
      </h2>
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="admin-form-group">
          <label htmlFor="password">Contraseña de Acceso</label>
          <input
            id="password"
            name="password"
            type="password"
            className="admin-input"
            required
            placeholder="Contraseña"
          />
        </div>
        {state?.error && (
          <p style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>
            {state.error}
          </p>
        )}
        <button type="submit" className="admin-btn" disabled={isPending} style={{ marginTop: "0.5rem" }}>
          {isPending ? "Autenticando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
