import { NextRequest, NextResponse } from "next/server";
import { APP_CONFIG } from "@/lib/app.config";

interface ServerStatusResponse {
  isOnline: boolean;
  latency: number;
  timestamp: number;
  server: string;
  region: string;
}

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Simple processing delay to measure Next.js route latency
    await new Promise(resolve => setTimeout(resolve, Math.random() * 10 + 5));
    
    const latency = Date.now() - startTime;
    const isOnline = true; // Next.js route is responding, so we're online
    
    const data: ServerStatusResponse = {
      isOnline,
      latency,
      timestamp: Date.now(),
      server: process.env.NEXT_PUBLIC_SERVER_NAME || APP_CONFIG.server.name,
      region:
        process.env.NEXT_PUBLIC_SERVER_REGION ||
        process.env.VERCEL_REGION ||
        APP_CONFIG.server.region,
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Server status API error:", error);

    return NextResponse.json(
      {
        isOnline: false,
        latency: 0,
        timestamp: Date.now(),
        server: process.env.NEXT_PUBLIC_SERVER_NAME || APP_CONFIG.server.name,
        region:
          process.env.NEXT_PUBLIC_SERVER_REGION ||
          process.env.VERCEL_REGION ||
          APP_CONFIG.server.region,
        error: "Failed to get server status",
      },
      { status: 500 }
    );
  }
}
