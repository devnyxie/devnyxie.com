export const APP_CONFIG = {
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://www.devnyxie.com",
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
  og_img: {
    name: "Timothee",
    title: "Full Stack Developer",
  },
};

export function getConfig() {
  return APP_CONFIG;
}
