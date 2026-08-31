import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "../../hooks/useProfile.js";
import {
  updateMyProfile,
  updateMySkills,
} from "../../services/profileService.js";
import ProfileForm from "../../components/profile/ProfileForm.jsx";
import { Loading, Empty } from "../../components/common/UI.jsx";
export default function EditProfile() {
  const { profile, loading, error } = useProfile();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  if (error) return <Empty>{error}</Empty>;
  const save = async ({ skills, ...payload }) => {
    setSaving(true);
    try {
      await updateMyProfile(payload);
      if (skills.length) await updateMySkills(skills);
      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="page profile-page">
      <header>
        <div>
          <p className="eyebrow">Digital identity</p>
          <h1>Edit profile</h1>
        </div>
      </header>
      <ProfileForm profile={profile} onSubmit={save} saving={saving} />
    </div>
  );
}
