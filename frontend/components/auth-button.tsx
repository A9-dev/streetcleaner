import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div>
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div>
      <button>
        <Link href="/auth/login">Sign in</Link>
      </button>
      <button>
        <Link href="/auth/sign-up">Sign up</Link>
      </button>
    </div>
  );
}
