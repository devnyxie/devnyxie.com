// Re-export all methods from articles and deep-dives for backward compatibility
export { getAllArticles, getArticleBySlug, getArticlesByTag } from "./articles";

export {
  getAllDeepDives,
  getDeepDiveBySlug,
  getDeepDivesByTag,
} from "./deep-dives";

// Legacy aliases for backward compatibility
export { getAllArticles as getAllPosts } from "./articles";
export { getArticleBySlug as getPostBySlug } from "./articles";
export { getArticlesByTag as getPostsByTag } from "./articles";
