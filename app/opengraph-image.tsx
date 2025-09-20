/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { APP_CONFIG as Config } from "@/lib/app.config";

export const runtime = "edge";
export const alt = `${Config.og_img.name} - ${Config.og_img.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

//og:image generation
export default async function Image() {
  const baseUrl = Config.domain;

  const displayDomain = baseUrl
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");

  if (!Config.domain || !Config.og_img.name || !Config.og_img.title) {
    throw new Error(
      "Missing required configuration values for og-image, please check app.config"
    );
  }

  // Load fonts with proper edge runtime support
  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    style: "normal";
    weight: 400 | 300;
  }> = [];

  try {
    // Load fonts using fetch with absolute URLs (edge runtime compatible)
    const [dancingResponse, geistResponse] = await Promise.all([
      fetch(`${baseUrl}/fonts/dancing-script/DancingScript-Medium.ttf`).catch(
        () => null
      ),
      fetch(`${baseUrl}/fonts/geist/Geist-Light.woff`).catch(() => null),
    ]);

    if (dancingResponse?.ok) {
      const dancingBuffer = await dancingResponse.arrayBuffer();
      fonts.push({
        name: "Dancing Script",
        data: dancingBuffer,
        style: "normal" as const,
        weight: 400 as const,
      });
    }

    if (geistResponse?.ok) {
      const geistBuffer = await geistResponse.arrayBuffer();
      fonts.push({
        name: "Geist",
        data: geistBuffer,
        style: "normal" as const,
        weight: 300 as const,
      });
    }
  } catch {
    console.warn("Font files not found, using system fonts as fallback");
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          position: "relative",
          color: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "absolute",
            backgroundColor: "black",
            backgroundImage:
              "linear-gradient(#121212 1px, transparent 1px), linear-gradient(90deg, #121212 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            borderRadius: "10px",
            padding: "10px",
            fontFamily: fonts.some((f) => f.name === "Geist")
              ? "Geist"
              : "system-ui, sans-serif",
            backgroundColor: "#191919",
            border: "1px solid #333",
            fontSize: 30,
          }}
        >
          {displayDomain}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "-100px",
          }}
        >
          <img
            src={`${baseUrl}/peep.svg`}
            alt="Profile Logo"
            style={{
              width: "400px",
              height: "400px",
              filter:
                "drop-shadow(2px 0 0 antiquewhite) drop-shadow(-2px 0 0 antiquewhite) drop-shadow(0 2px 0 antiquewhite) drop-shadow(0 -2px 0 antiquewhite)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1
              style={{
                fontSize: 120,
                fontFamily: fonts.some((f) => f.name === "Dancing Script")
                  ? "Dancing Script"
                  : "serif",
                margin: 0,
                fontStyle: fonts.some((f) => f.name === "Dancing Script")
                  ? "normal"
                  : "italic",
              }}
            >
              {Config.og_img.name}
            </h1>
            <h2
              style={{
                fontSize: 50,
                fontFamily: fonts.some((f) => f.name === "Geist")
                  ? "Geist"
                  : "system-ui, sans-serif",
                margin: 0,
                opacity: 0.8,
              }}
            >
              {Config.og_img.title}
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
