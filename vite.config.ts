import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // 相对路径：构建产物可直接部署到 GitHub Pages 的子路径（/funnylearn/）下
  base: './',
  plugins: [react(), tailwindcss()],
})
