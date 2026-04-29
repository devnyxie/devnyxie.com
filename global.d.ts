// Allow importing CSS files as side-effects (e.g. import "@/app/assets/md.css")
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
