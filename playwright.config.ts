import { defineConfig } from '@playwright/test';


export default defineConfig({
  use: {
    baseURL: 'https://github.com',
    headless: false,
    
  },

});

