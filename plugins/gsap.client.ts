// plugins/gsap.client.ts

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
    // 앱 전체에서 단 한 번만 GSAP 플러그인을 등록합니다.
    gsap.registerPlugin(ScrollTrigger)
})