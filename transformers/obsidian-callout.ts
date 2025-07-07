// ~/content/transforms/obsidian-callout.ts
import { defineTransformer } from "@nuxt/content";

export default defineTransformer({
  name: "obsidian-callout",
  extensions: [".md"],
  transform(file) {
    if (!file.body) {
      return file;
    }

    // Regex to match one callout block:
    //   > [!TYPE] optional title
    //   > line1
    //   > line2
    const calloutRegex = /^> \[!(\w+)\](?: (.*))?\n((?:> .+\n)+)/gm;

    // Replace callout blocks with HTML structure
    file.body = (file.body as string).replace(
      calloutRegex,
      (_, type, title, content) => {
        // console.log(
        //   `(obsidian-callout) Transforming callout: type=${type}, title=${title}`
        // );
        // Clean up content by removing leading '> ' and trimming whitespace
        content = content.replace(/^> /gm, "").trim();

        // Split content into paragraphs
        const paragraphs = content
          .split("\n\n")
          .map((p: any) => `<p>${p}</p>`)
          .join("\n");

        // Return the HTML structure
        return `<callout class="callout-${type.toLowerCase()}">
  ${title ? `<h4>${title}</h4>` : ""}
  ${paragraphs}
</callout>`;
      }
    );

    return file;
  },
});
