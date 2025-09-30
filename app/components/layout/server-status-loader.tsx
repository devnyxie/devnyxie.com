"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import ServerStatus with no SSR to prevent it from affecting SEO
const ServerStatusLazy = dynamic(
  () => import('@/app/components/layout/server-status').then(mod => ({ default: mod.ServerStatus })),
  { 
    ssr: false,
    loading: () => null // No loading state needed as it appears gradually
  }
);

export function ServerStatusLoader() {
  const [mounted, setMounted] = useState(false);
  
  // Only load the component after the page has completely loaded
  useEffect(() => {
    // Check if the page has fully loaded
    if (document.readyState === 'complete') {
      // Add a delay to ensure critical page elements are interactive first
      setTimeout(() => setMounted(true), 1500);
    } else {
      // Wait for the page to fully load
      const handleLoad = () => {
        setTimeout(() => setMounted(true), 1500);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  // Only render when mounted (client-side and after delay)
  if (!mounted) return null;
  
  return <ServerStatusLazy refreshInterval={30000} />;
}

export default ServerStatusLoader;
