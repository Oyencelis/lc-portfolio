import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      hostname: 'https://oyencelis.vercel.app', // Replace with your actual domain
    }),
  ],
})
