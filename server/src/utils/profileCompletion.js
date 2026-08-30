export const calculateProfileCompletion = (profile) => {
  let score = 0;

  // 1. Basic Info (Name, Display Name, Designation) -> 20 points
  if (profile.firstName && profile.lastName) score += 10;
  if (profile.designation) score += 10;

  // 2. Profile Photo -> 15 points
  if (profile.profilePhoto?.url || (typeof profile.profilePhoto === 'string' && profile.profilePhoto)) {
    score += 15;
  }

  // 3. Headline / Introduction -> 10 points
  if (profile.introduction && profile.introduction.trim().length > 10) {
    score += 10;
  }

  // 4. About / Bio -> 15 points
  if (profile.about && profile.about.trim().length > 20) {
    score += 15;
  }

  // 5. Experience (at least 1 entry) -> 15 points
  if (Array.isArray(profile.experience) && profile.experience.length > 0) {
    score += 15;
  }

  // 6. Skills (at least 3 skills) -> 10 points
  if (Array.isArray(profile.skills) && profile.skills.length >= 3) {
    score += 10;
  } else if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    score += 5;
  }

  // 7. Education (at least 1 entry) -> 10 points
  if (Array.isArray(profile.education) && profile.education.length > 0) {
    score += 10;
  }

  // 8. Social Links (at least 1 link) -> 5 points
  if (Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0) {
    score += 5;
  }

  return Math.min(score, 100);
};
