import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export default async function ProfilePage() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account?next=/profile");
  }

  return (
    <div className="max-w-2xl mx-auto py-16 space-y-4">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="rounded-lg border border-neutral-800 p-4">
        <p><span className="font-semibold">User ID:</span> {user.id}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
      </div>
    </div>
  );
}
