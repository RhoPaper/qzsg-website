import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 引入自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 引入ElementPlus组件库
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 引入依赖分析插件
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 自动导入功能插件 - 优化Element Plus按需引入
    AutoImport({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass', // 使用sass样式，减少CSS体积
      })],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass', // 使用sass样式，减少CSS体积
      })],
    }),
    // 依赖分析插件
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.md'], // 添加对 .md 文件的支持
  optimizeDeps: {
    include: ['vue', 'vue-router'], // 移除marked，让它动态加载
    exclude: ['element-plus', 'highlight.js'] // 排除这些库，让它们按需加载
  },
  build: {
    // 启用代码分割
    rollupOptions: {
      output: {
        // 手动分块策略 - 进一步优化
        manualChunks: {
          // Vue相关库单独打包
          'vue-vendor': ['vue', 'vue-router'],
          // 工具库单独打包 - 进一步分割
          'markdown': ['marked'],
          // 分析工具单独打包
          'analytics': ['@microsoft/clarity']
        },
        // 资源文件命名优化
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // JS文件命名优化
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'] // 移除更多console
      }
    },
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 500, // 降低警告阈值
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 启用源码映射（生产环境建议关闭）
    sourcemap: false
  },
  // 开发服务器优化
  server: {
    // 启用HMR
    hmr: true,
    // 预加载优化
    preload: true
  }
})

