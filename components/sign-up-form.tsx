"use client";

import { createClient } from "@/lib/supabase/client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm(props: React.ComponentPropsWithoutRef<"main">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main {...props}>
      <section>
        <header>
          <h2>Sign up</h2>
          <p>Create a new account</p>
        </header>

        <form onSubmit={handleSignUp}>
          <fieldset>
            <legend>Account Information</legend>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="repeat-password">Repeat Password</label>
              <input
                id="repeat-password"
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>

            {error && (
              <p>
                <strong>Error:</strong> {error}
              </p>
            )}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating an account..." : "Sign up"}
            </button>
          </fieldset>
        </form>

        <footer>
          <p>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </footer>
      </section>
    </main>
  );
}
