import { APP_CONFIG } from "@/lib/app.config";

// Map your APP_CONFIG to the expected Config structure
export default {
  site: {
    url: "https://devnyxie.com", // Update with your actual domain
  },
  user: {
    name: APP_CONFIG.og_img.name,
    role: APP_CONFIG.og_img.title,
  },
};
