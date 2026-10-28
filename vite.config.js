import {defineConfig} from 'vite';
export default defineConfig({root:'frontend',build:{outDir:'../dist',emptyOutDir:true},server:{host:'127.0.0.1',proxy:{'/api':{target:'http://127.0.0.1:5008',rewrite:path=>path.replace(/^\/api/,'/')}}}});
