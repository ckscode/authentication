import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
  plugins: [react()],
  server:{
    https:{

      key:fs.readFileSync("./localhost.key"),
      cert:fs.readFileSync("./localhost.crt"),

    },

  },

 }
})
