import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from '#app'

type SectionId = 'about' | 'projects' | 'services' | 'contact'

const SECTION_TITLES: Record<SectionId, string> = {
    about: '회사 소개',
    projects: '구축/운영 사례',
    services: '솔루션',
    contact: '문의하기',
}

export function useSectionTitle() {
    const route = useRoute()
    const currentId = useState<SectionId | null>('current-section-id', () => null)
    let io: IntersectionObserver | null = null

    const title = computed(() => {
        if (currentId.value && SECTION_TITLES[currentId.value]) {
            return SECTION_TITLES[currentId.value]
        }
        return '(주)포베리' // 홈 기본값
    })

    onMounted(() => {
        nextTick(() => {
            if (!import.meta.client || typeof IntersectionObserver === 'undefined') {
                return
            }

            const targets = Array.from(document.querySelectorAll<HTMLElement>('div[id]'))
                .filter(el => Object.keys(SECTION_TITLES).includes(el.id)) as HTMLElement[]

            io = new IntersectionObserver((entries) => {
                if (!entries || entries.length === 0) return
                
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

                const top = visible.at(0)
                if (!top) return

                const id = (top.target as HTMLElement).id as SectionId | undefined

                if (id && SECTION_TITLES[id]) {
                    // 로컬 ref가 아닌 공유 상태(useState)의 값을 업데이트합니다.
                    currentId.value = id
                } else if (visible.length === 0 && window.scrollY < 100) {
                    // (개선) 스크롤이 최상단일 때 ID를 null로 초기화 (선택 사항)
                    currentId.value = null
                }
            }, {
                root: null,
                // threshold를 촘촘하게 설정하여 중앙에 가까운 요소를 더 잘 감지
                threshold: Array(21).fill(0).map((_, i) => i * 0.05), // 0, 0.05, ..., 1.0
            })

            targets.forEach(el => io!.observe(el))

            // 초기 해시가 있으면 우선 반영
            if (route.hash) {
                const id = route.hash.replace('#', '') as SectionId
                if (SECTION_TITLES[id]) {
                    currentId.value = id
                }
            }
        })
        
    })

    onBeforeUnmount(() => {
        io?.disconnect()
        io = null
    })

    // 이제 title은 공유 상태(currentId)에 따라 계산되며,
    // currentId 자체도 반환할 수 있습니다 (물론 useState로 직접 접근도 가능).
    return { title, currentId }
}
