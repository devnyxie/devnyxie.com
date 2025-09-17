// Base components
import { Alert } from "./base/Alert";
import { Callout } from "./base/Callout";

// Re-export existing components that work well in MDX
import { Button } from "../button";
import Heading from "../heading";

export { Alert } from "./base/Alert";
export { Callout } from "./base/Callout";
export { Button } from "../button";
export { default as Heading } from "../heading";

// Create a components object for MDX provider
export const mdxComponents = {
  // Base components
  Alert,
  Callout,

  // Existing components
  Button,
  Heading,
};

export default mdxComponents;
