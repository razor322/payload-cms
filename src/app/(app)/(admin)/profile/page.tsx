import { getProfile } from "@/lib/repositories/profile";
import { saveProfileAction } from "@/actions/site";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function ProfilePage() {
  const profile = await getProfile();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-black uppercase">Profile</h1>
      <ProfileForm action={saveProfileAction} defaults={profile ?? {}} />
    </div>
  );
}
