"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div {...props}>
      <div>
        <div>
          <h2>Login</h2>
          <p>Enter your email below to login to your account</p>
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div>
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
                <div>
                  <label htmlFor="password">Password</label>
                  <a href="/auth/forgot-password">Forgot your password?</a>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p>{error}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div>
              Don&apos;t have an account? <a href="/auth/sign-up">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
