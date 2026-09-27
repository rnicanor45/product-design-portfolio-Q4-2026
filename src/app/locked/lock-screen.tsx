"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export function LockScreen({ next }: { next: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }

      window.location.assign(next);
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-1 items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-fg">
          This portfolio is private
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter the password to view it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-fg outline-none transition-colors focus-visible:border-link"
            placeholder="Password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "password-error" : undefined}
          />

          {error ? (
            <p id="password-error" role="alert" className="text-sm text-red-500">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="gradient-fill mt-1 w-full rounded-full px-4 py-3 text-sm font-medium transition-opacity disabled:opacity-60"
          >
            {submitting ? "Checking…" : "Unlock"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
