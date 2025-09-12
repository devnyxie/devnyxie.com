import fs from "fs";
import path from "path";

export async function getPortfolioImages(): Promise<string[]> {
  const portfolioImagesDir = path.join(process.cwd(), "public", "images", "portfolio");
  
  try {
    const files = fs.readdirSync(portfolioImagesDir);
    
    // Filter for image files and sort them
    const imageFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext);
      })
      .sort();
    
    return imageFiles;
  } catch (error) {
    console.error("Error reading portfolio images directory:", error);
    return [];
  }
}
