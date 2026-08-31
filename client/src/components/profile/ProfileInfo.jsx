import SocialLinks from "./SocialLinks.jsx";
export default function ProfileInfo({ profile }) {
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
    </div>
  );
}
