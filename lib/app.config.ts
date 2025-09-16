export const APP_CONFIG = {
  picture: {
    src: "/pfp_personal.jpg",
    alt: "My profile picture",
  },
  meetingLink: "https://cal.com/timbusinez/30min",
  github_username: "devnyxie",
  email: "timbusinez@gmail.com",
  available: true,
  server: {
    name: "Home Lab",
    region: "Warsaw, PL",
  },
  resumeLink: "/resume.pdf",
};

export function getConfig() {
  return APP_CONFIG;
}
