import { AuthButton } from "@/components/auth-button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <nav>
          <div>
            <div>
              <Link href={"/"}>Next.js Supabase Starter</Link>
            </div>
            <AuthButton />
          </div>
        </nav>
        <div>
          <h1>Main</h1>
        </div>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </main>
  );
}
