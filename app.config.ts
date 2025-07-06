export default defineAppConfig({
  global: {
    picture: {
      src: "/pfp.jpg",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/",
    email: "ui-pro@nuxt.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "black",
      neutral: "neutral",
    },
  },
});
