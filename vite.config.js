import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  server: {
    // Permite que o Vite escute no IP do host para acessos externos
    host: '0.0.0.0',  // Faz com que o Vite escute em todas as interfaces de rede
    port: 5173,
    watch: {
      usePolling: true,
    },  // Certifique-se de que está usando a mesma porta no Docker Compose
    hmr: {
      protocol: 'ws',  // WebSocket
      host: 'localhost',  // O host que deve ser usado para conectar o WebSocket
      port: 5173,  // Porta que o Vite está usando
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
