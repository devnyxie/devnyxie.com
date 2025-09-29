"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useServerStatus } from "@/app/hooks/useServerStatus";

interface ServerStatusProps {
  refreshInterval?: number;
  enabled?: boolean;
}

export function ServerStatus({
  refreshInterval = 30000,
  enabled = true,
}: ServerStatusProps) {
  const { status, loading, error, refetch } = useServerStatus({
    refreshInterval,
    enabled,
  });

  const { latency, isOnline } = status;
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColor = isOnline
    ? latency < 100
      ? "bg-green-500"
      : latency < 200
      ? "bg-yellow-500"
      : "bg-orange-500"
    : "bg-red-500";

  const statusText = isOnline
    ? latency < 100
      ? "Excellent"
      : latency < 200
      ? "Good"
      : "Fair"
    : "Offline";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        initial={false}
        animate={{ scale: isExpanded ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className={`w-2 h-2 rounded-full ${statusColor}`}>
                <motion.div
                  className={`w-2 h-2 rounded-full ${statusColor}`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <Server className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="bg-card border border-border rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm min-w-[200px]"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColor}`}>
                    <motion.div
                      className={`w-2 h-2 rounded-full ${statusColor}`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {statusText}
                  </span>
                </div>
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <WifiOff className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="text-foreground font-mono">
                    {isOnline ? `${latency}ms` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Server:</span>
                  <span className="text-foreground">{status.server}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="text-foreground">{status.region}</span>
                </div>
                {error && (
                  <div className="flex justify-between text-xs">
                    <span className="text-red-500">Error:</span>
                    <span
                      className="text-red-500 text-right max-w-[100px] truncate"
                      title={error}
                    >
                      {error}
                    </span>
                  </div>
                )}
              </div>

              <motion.div
                className="mt-2 pt-2 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground text-center">
                    Last updated:{" "}
                    {new Date(status.timestamp).toLocaleTimeString()}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      refetch();
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
                    disabled={loading}
                    title="Refresh status"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${loading ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
