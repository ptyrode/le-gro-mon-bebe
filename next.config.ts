import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Autorise l'accès au serveur de dev depuis le réseau local (test sur mobile).
    // Ajoute ici les IP/hostnames depuis lesquels tu ouvres l'appli en dev.
    allowedDevOrigins: ['192.168.0.135'],
};

export default nextConfig;
