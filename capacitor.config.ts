import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1528f6b6069642b5ba0aaf4c982c64fc',
  appName: 'prompt-to-app-portal',
  webDir: 'dist',
  server: {
    url: "https://1528f6b6-0696-42b5-ba0a-af4c982c64fc.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID_HERE',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;