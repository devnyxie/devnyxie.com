"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useServerStatus } from "@/app/hooks/useServerStatus";

function FooterServerStatusInner() {
  const { status, loading } = useServerStatus({ refreshInterval: 30000 });
  const { latency, isOnline } = status;

  const statusColor = isOnline
    ? latency < 100
      ? "bg-green-500"
      : latency < 200
      ? "bg-yellow-500"
      : "bg-orange-500"
    : "bg-red-500";

  const statusLabel = isOnline ? `Online · ${latency}ms` : "Offline";

  if (loading) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
        Checking…
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
      {statusLabel}
    </span>
  );
}

const FooterServerStatusLazy = dynamic(
  () => Promise.resolve(FooterServerStatusInner),
  { ssr: false, loading: () => null }
);

export function FooterServerStatus() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setTimeout(() => setMounted(true), 1500);
    } else {
      const handleLoad = () => setTimeout(() => setMounted(true), 1500);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!mounted) return null;

  return <FooterServerStatusLazy />;
}
