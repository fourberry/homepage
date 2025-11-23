// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },

    // 사용 모듈
    modules: [
        '@nuxtjs/tailwindcss', 
        'nuxt-swiper', 
        ['@nuxt/image', { format: ['webp', 'avif'] }], 
        '@vueuse/nuxt', 
        'unplugin-icons/nuxt', 
        '@vueuse/motion/nuxt',
        '@nuxtjs/sitemap'
    ],

    site: {
        url: 'https://www.fourberry.co.kr', 
    },

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
            titleTemplate: '%s | AI 솔루션 & SI 전문 기업 (주)포베리',
            title: '홈',
            meta: [
                { name: 'theme-color', content: '#ffffff' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { charset: 'utf-8' },
                { 
                    name: 'description', 
                    content: 'IT와 AI의 결합으로 새로운 가치를 창출하는 포베리(Fourberry). 인공지능(AI) 솔루션 개발, SI/SM 시스템 통합, 빅데이터 분석 및 맞춤형 소프트웨어 컨설팅을 제공합니다.' 
                },
                { 
                    name: 'keywords', 
                    content: '포베리, Fourberry, AI, 인공지능, AI 솔루션, AI 개발, 딥러닝, 머신러닝, SI, SM, 시스템 통합, IT 컨설팅, 웹 개발' 
                },
                { name: 'naver-site-verification', content: 'dbb8fecd579367cf06f6d9c76589b36d6f59738a' },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: '(주)포베리' },
                { property: 'og:title', content: 'AI 솔루션 & SI 전문 기업 (주)포베리' },
                { property: 'og:description', content: '혁신적인 AI 기술과 안정적인 IT 서비스로 비즈니스의 성공을 돕습니다.' },
                { property: 'og:image', content: 'https://www.fourberry.co.kr/og/cover.png' },
                { property: 'og:url', content: 'https://www.fourberry.co.kr' },
            ],
            link: [
                { rel: 'canonical', href: 'https://www.fourberry.co.kr' },
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
