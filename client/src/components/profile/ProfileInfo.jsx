import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks.jsx";

export default function ProfileInfo({ profile, publicView = false }) {
  const sections = [
    ["About", profile.about],
    [
      "Experience",
      profile.experience
        ?.map((item) => `${item.title} · ${item.company}`)
        .join("\n"),
    ],
    [
      "Education",
      profile.education
        ?.map((item) => `${item.degree} · ${item.institution}`)
        .join("\n"),
    ],
  ];
  const hasContent =
    profile.introduction ||
    profile.skills?.length > 0 ||
    sections.some(([, content]) => content) ||
    profile.socialLinks?.length > 0;

  return (
    <div className="profile-info">
      {profile.introduction && (
        <p className="profile-intro">{profile.introduction}</p>
      )}
      {profile.skills?.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div className="skill-list">
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>
      )}
      {sections.map(
        ([title, content]) =>
          content && (
            <section key={title}>
              <h2>{title}</h2>
              <p>{content}</p>
            </section>
          ),
      )}
      <SocialLinks links={profile.socialLinks} />
      {!hasContent &&
        (publicView ? (
          <div className="profile-empty public">
            <p>This profile is just getting started. Check back soon.</p>
          </div>
        ) : (
          <div className="profile-empty">
            <p>Your profile is empty — add a headline, skills and story to stand out.</p>
            <Link className="button primary" to="/profile/edit">
              Complete your profile
            </Link>
          </div>
        ))}
    </div>
  );
}
