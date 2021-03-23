import { resolve } from 'path' 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
		'/@/': resolve('./src'),
		'/@assets/': resolve('./src/assets'),
		'/@img': resolve('./src/assets/img'),
		'/@views/': resolve('./src/views'),
		'/@components/': resolve('./src/components'),
		'/@api/': resolve('./src/api'),
		'/@configs/': resolve('./src/configs'),
		'/@utils/': resolve('./src/utils')
	},
  plugins: [vue()]
})
