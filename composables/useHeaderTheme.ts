// composables/useHeaderTheme.ts
import { useState } from '#app'

// 1. 'transparent' 타입을 HeaderTheme에 추가합니다.
export type HeaderTheme = 'light' | 'dark' | 'transparent'

export const useHeaderTheme = () => {
    // Nuxt의 useState를 사용해 앱 전역에서 상태를 공유합니다.
    // 기본 테마를 'light'로 설정합니다.
    const theme = useState<HeaderTheme>('header-theme', () => 'light')

    const setHeaderTheme = (newTheme: HeaderTheme) => {
        theme.value = newTheme
    }

    return {
        theme, // 2. AppHeader.vue에서 이 값을 읽어갈 수 있도록 노출합니다.
        setHeaderTheme,
    }
}
