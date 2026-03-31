import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mode production strict pour React (détecte les erreurs tôt)
  reactStrictMode: true,

  // Build standalone pour Docker → image finale légère et indépendante
  output: "standalone",

  // Compression des pages côté serveur (gzip/brotli)
  compress: true,
};

export default nextConfig;
