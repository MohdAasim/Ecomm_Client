import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* eslint-disable */
export default defineConfig(({mode}) => {
  // console.log(`Running Vite in ${mode} mode`);
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
    },
  };
});
