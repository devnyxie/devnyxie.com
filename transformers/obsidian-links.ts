import { defineTransformer } from "@nuxt/content";

function parseUrlAndWidth(urlWithWidth: string) {
  const [url, width] = urlWithWidth.split("|");
  return { url, width };
}

function isImageUrl(url: string) {
  return /\.(jpe?g|png|gif|svg|webp)$/.test(url.toLowerCase());
}

function isImageUrlInside(url: string) {
  return /\.(jpe?g|png|gif|svg|webp)/i.test(url.toLowerCase());
}

// todo: handle page relative links, like [[page-name|Page Name]]
function transformNodes(nodes: any[]): any[] {
  return nodes.map((node) => {
    if (Array.isArray(node)) {
      const [tag, attrs, ...children] = node;

      if (tag === "p") {
        let childrenOne = children[0];
        const obsidianLinkRegex = /!\[\[[^\[\]]+?\]\]/g; // non-greedy to match just one tag

        if (
          typeof childrenOne === "string" &&
          obsidianLinkRegex.test(childrenOne)
        ) {
          const match = childrenOne.match(obsidianLinkRegex);
          if (match && isImageUrlInside(match[0])) {
            let { url, width } = parseUrlAndWidth(match[0].slice(3, -2)); // remove ![[ and ]]
            console.log("obsidian link", url, width);
            if (!url.startsWith("/")) {
              // absolute obsidian links don't start with /, correct them
              url = `/${url}`;
            }
            const imgAttrs: Record<string, any> = { src: url, alt: "" };
            if (width) {
              imgAttrs.width = width;
            }

            // Split the string around the matched tag
            const parts = childrenOne.split(obsidianLinkRegex);

            // Replace children with parts and img tag inserted in the middle
            const newChildren = [];
            if (parts[0]) newChildren.push(parts[0]);
            newChildren.push(["img", imgAttrs]);
            if (parts[1]) newChildren.push(parts[1]);

            children.splice(0, children.length, ...newChildren);
            return ["img", imgAttrs];
          }
        }
      }
      // ![[https://example.com/image.png|300]], ![[https://example.com]]
      if (tag === "p" && children.length === 3) {
        const [first, second, third] = children;

        // Check if first and third are text nodes with "![" and "]"
        if (
          typeof first === "string" &&
          first === "![[" &&
          Array.isArray(second) &&
          second[0] === "a" &&
          typeof third === "string" &&
          third === "]]"
        ) {
          const rawUrl = second[2] || "";
          const { url, width } = parseUrlAndWidth(rawUrl);
          if (isImageUrl(url)) {
            // Build img attributes
            const imgAttrs: Record<string, any> = { src: url, alt: "" };
            if (width) {
              imgAttrs.width = width;
            }
            return ["img", imgAttrs];
          } else {
            // Replace with a tag
            return ["a", { href: url }, url];
          }
        }
      }
      // Recursively process children
      return [tag, attrs, ...transformNodes(children)];
    }

    return node;
  });
}

// Nuxt Obsidian Links Transformer
// from: ![https://example.com/image.png|300]
// to: <img src="path" width="300" alt="">
export default defineTransformer({
  name: "obsidian-links",
  extensions: [".md"],
  transform(file: any) {
    if (file.body?.type === "minimark") {
      console.log(JSON.stringify(file.body, null, 2));
      return {
        ...file,
        body: {
          ...file.body,
          value: transformNodes(file.body.value),
        },
      };
    }
    return file;
  },
});
