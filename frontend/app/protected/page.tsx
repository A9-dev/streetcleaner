import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <div>
        <div>
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div>
        <h2>Your user details</h2>
        <pre>{JSON.stringify(data.user, null, 2)}</pre>
      </div>
    </div>
  );
}
