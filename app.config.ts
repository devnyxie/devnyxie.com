export const APP_CONFIG = {
  domain: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  picture: {
    src: "/pfp/treejp.jpg",
    alt: "My profile picture",
  },
  meetingLink: "https://cal.com/tim-afanasiev",
  github_username: "devnyxie",
  email: "timbusinez@gmail.com",
  available: false,
  displayName: "timothee",
  employer: "Capgemini",
  server: {
    name: process.env.NEXT_PUBLIC_SERVER_NAME || "Home Lab",
    region:
      process.env.NEXT_PUBLIC_SERVER_REGION ||
      process.env.VERCEL_REGION ||
      "Unknown",
  },
  resumeLink: "/resume.pdf",
  og_img: {
    name: "Timothee",
    title: "Full Stack Developer",
  },
  rss: {
    title: "Tim Afanasiev - Blog",
    description:
      "Passionate about crafting elegant solutions and building impactful software. Based in Wrocław, available for both Frontend and Backend projects worldwide.",
    language: "en",
    authorName: "Tim Afanasiev",
    maxItems: 20,
  },
  features: {
    mentions: false,
  },
};

export function getConfig() {
  return APP_CONFIG;
}
