
export const getAvatarInitial = (fullName) => {
  if (!fullName?.trim()) return "";

  return fullName
    .trim()
    .split(/\s+/)
    .at(-1)
    ?.charAt(0)
    .toUpperCase();
};