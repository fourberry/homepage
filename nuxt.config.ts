// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },

    // ✅ 사용 모듈들 (nuxt/image 옵션 인라인)
    modules: ['@nuxtjs/tailwindcss', 'nuxt-swiper', ['@nuxt/image', { format: ['webp', 'avif'] }], '@vueuse/nuxt', 'unplugin-icons/nuxt', '@vueuse/motion/nuxt'],

    // ✅ 전역 CSS 등록 (Tailwind + 공통 SCSS)
    css: ['~/assets/css/tailwind.css', '~/assets/scss/common.scss'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    router: {
        options: {},
    },

    // ✅ SSG (Static Site Generation)
    routeRules: {
        '/**': { prerender: true },
    },

    // ✅ 전역 head/SEO
    app: {
        baseURL: '/',
        head: {
            titleTemplate: '%s (주)포베리',
            meta: [
                { name: 'theme-color', content: '#ffffff' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: '회사 소개 웹사이트' },
                { property: 'og:type', content: 'website' },
                { property: 'og:image', content: '/og/cover.png' },
            ],
            link: [
                { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64x64.png' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
                },
            ],
        },
    },
})
