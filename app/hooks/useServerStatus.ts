"use client";

import { useState, useEffect, useCallback } from "react";

interface ServerStatus {
  isOnline: boolean;
  latency: number;
  timestamp: number;
  server: string;
  region: string;
  error?: string;
}

interface UseServerStatusOptions {
  refreshInterval?: number; // in milliseconds
  enabled?: boolean;
}

export function useServerStatus({ 
  refreshInterval = 30000, // 30 seconds default
  enabled = true 
}: UseServerStatusOptions = {}) {
  const [status, setStatus] = useState<ServerStatus>({
    isOnline: true,
    latency: 0,
    timestamp: Date.now(),
    server: "Home Lab",
    region: "Wrocław, PL",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!enabled) return;

    try {
      const response = await fetch("/api/server-status", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: ServerStatus = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch server status:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setStatus(prev => ({ ...prev, isOnline: false, latency: 0 }));
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchStatus(); // Initial fetch

    if (!enabled || !refreshInterval) return;

    const interval = setInterval(fetchStatus, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchStatus, refreshInterval, enabled]);

  return {
    status,
    loading,
    error,
    refetch: fetchStatus,
  };
}