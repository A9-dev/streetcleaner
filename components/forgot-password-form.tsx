"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {success ? (
        <div>
          <h2>Check Your Email</h2>
          <p>Password reset instructions sent</p>
          <p>
            If you registered using your email and password, you will receive a
            password reset email.
          </p>
        </div>
      ) : (
        <div>
          <h2>Reset Your Password</h2>
          <p>
            Type in your email and we&apos;ll send you a link to reset your
            password
          </p>
          <form onSubmit={handleForgotPassword}>
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
            {error && <p>{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send reset email"}
            </button>
            <div>
              Already have an account? <Link href="/auth/login">Login</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
