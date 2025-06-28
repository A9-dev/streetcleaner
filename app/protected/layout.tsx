import { AuthButton } from "@/components/auth-button";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>
        <nav>
          <div>
            <div>Nav</div>
            <AuthButton />
          </div>
        </nav>
        <div>{children}</div>
        <footer>Footer</footer>
      </div>
    </main>
  );
}
