<template>
  <section class="relative bg-background py-20 overflow-hidden">
    <div class="mx-auto max-w-6xl px-6">
      <header class="mx-auto mb-8 max-w-7xl px-4 text-center md:mb-12 md:px-8 lg:px-12">
        <p class="mb-2 text-base font-semibold uppercase tracking-widest text-purple-500">history</p>
        <h2 class="mb-3 text-3xl md:text-5xl font-extrabold leading-tight text-black">우리의 여정</h2>
      </header>

      <!-- ============ 모바일: 가로 탭 + 선택 연도 내용 ============ -->
      <div class="md:hidden">
  <!-- 고정 상단 탭 바 -->
  <div
    class="sticky top-0 z-10 -mx-6 px-6 bg-background/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
  >
    <nav
      class="flex w-full divide-x divide-black/10 border-b-2 border-black/20"
      role="tablist"
      aria-label="연도 선택"
    >
      <button
        v-for="y in yearsDescAll"
        :key="y"
        role="tab"
        :aria-selected="activeYear === y"
        @click="activeYear = y"
        class="relative flex-1 px-1 pb-2 text-base font-semibold text-center transition-colors"
        :class="activeYear === y ? 'text-blue-500' : 'text-black/60'"
      >
        {{ y }}
      </button>
    </nav>
  </div>

  <!-- 선택된 연도 내용 -->
  <div class="mt-6 space-y-6">
  <section v-if="yearBlocks[activeYear]" :aria-labelledby="`y-mobile-${activeYear}`">
    <h3 :id="`y-mobile-${activeYear}`" class="sr-only">{{ activeYear }}</h3>

    <div class="space-y-6">
      <div
        v-for="(m, idx) in yearBlocks[activeYear]"
        :key="idx"
        class="rounded-xl border border-black/10 p-4 bg-white shadow-sm"
      >
        <!-- ✅ 연도/월 한 단계 더 굵게 변경 -->
        <p class="mb-2 text-base font-bold text-black">
          {{ activeYear }}.<span class="font-bold">{{ m.month }}</span>
        </p>

        <ul class="space-y-2">
          <li
            v-for="(t, j) in m.titles"
            :key="j"
            class="text-[1.05rem] leading-relaxed"
          >
            {{ t }}
          </li>
        </ul>
      </div>
    </div>
  </section>
  <p v-else class="text-black/50">기록이 없습니다.</p>
</div>
</div>
      <!-- ============ // 모바일 ============ -->

      <!-- ============ 데스크톱(기존 레이아웃 유지) ============ -->
     <div
  ref="timelineRef"
  class="relative mt-12 hidden md:grid md:[grid-template-columns:13rem_1px_minmax(0,1fr)] md:gap-x-2"
>
  <!-- Col 1: 연도(절대 포지셔닝) -->
  <aside class="relative">
    <!-- 연도 라벨 영역 전체 높이 -->
    <div class="relative" :style="{ height: railHeight + 'px' }">
      <div
        v-for="y in yearsDescAll"
        :key="y"
        class="absolute right-0 flex items-center"
        :style="{ top: (yearTopMap[y] ?? 0) + 'px' }"
      >
        <!-- 연도 라벨을 바쪽으로 '확' 붙임 -->
        <a
          :href="'#y' + y"
          class="mr-1 font-semibold text-[1.1rem] leading-none"
          :class="activeYear === y ? 'text-black' : 'text-black/60'"
        >
          {{ y }}
        </a>
      </div>
    </div>
  </aside>

  <!-- Col 2: 중앙 바 + 동그라미 (높이 기준) -->
  <div class="relative">
    <!-- 세로 바 -->
    <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-black/10"></div>

    <!-- 동그라미 (바 중앙에 정확히) -->
    <div class="relative" :style="{ height: railHeight + 'px' }">
      <div
        v-for="y in yearsDescAll"
        :key="'dot-'+y"
        class="absolute left-1/2 -translate-x-1/2"
        :style="{ top: (yearTopMap[y] ?? 0) + 'px' }"
      >
        <span
          v-if="activeYear === y"
          class="block h-4 w-4 rounded-full border-2 border-black/60 bg-white"
          style="transform: translate(-50%, 0);"
        ></span>
        <span
          v-else
          class="block h-3 w-3 rounded-full bg-black/40"
          style="transform: translate(-50%, 0);"
        ></span>
      </div>
    </div>
  </div>

  <!-- Col 3: 본문(바쪽으로 '많이' 당김) -->
  <main class="space-y-6 pl-2">
    <section
      v-for="y in yearsDescAll"
      :key="y"
      :id="'y' + y"
      class="scroll-mt-24"
      :data-year="y"
      ref="yearSections"
    >
      <div class="space-y-3">
        <div
          v-for="(m, idx) in yearBlocks[y]"
          :key="idx"
          class="space-y-1 first-of-type:marker-year-start"
          :data-year-first="idx === 0 ? '1' : undefined"
        >
          <p class="font-semibold text-black/70 text-[1.05rem] leading-none">
            {{ y }}.<span>{{ m.month }}</span>
          </p>
          <ul class="space-y-1">
            <li
              v-for="(t, j) in m.titles"
              :key="j"
              class="text-[1.08rem] leading-relaxed"
            >
              {{ t }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</div>
      <!-- ============ // 데스크톱 ============ -->
    </div>
  </section>
</template>


<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'

type RawEvent = { date: string; titles: string[] }

const RAIL_X = '50%'
const GAP_TO_LINE = 6

const raw: RawEvent[] = [
  { date: '2023.10', titles: ['포베리 주식회사 설립', '영등포농협 온라인 쇼핑몰 구축 컨설팅 착수'] },
  { date: '2024.01', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 사업 착수'] },
  { date: '2024.06', titles: ['아우토크립트 K-CSMS 1차 구축 완료', 'TAD 홈페이지 구축 완료'] },
  { date: '2024.08', titles: ['자체 솔루션 베리패스(Berry-Pass) 개발 착수', '영등포농협 SSO 구축 완료'] },
  { date: '2024.10', titles: ['동행복권 인쇄복권 시스템 DB 전환 사업 착수', '한국해양공사 게이미피케이션 캠페인 구축 완료'] },
  { date: '2025.01', titles: ['자체 솔루션 베리마인(Berry-Mine) 개발 착수 (웹 자동화)', '쿠쿠홀딩스 시스템 운영 및 고도화 착수'] },
  { date: '2025.03', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 완료'] },
  { date: '2025.06', titles: ['아우토크립트 K-CSMS 2차 구축 완료'] },
]

const yearBlocks = computed<Record<string, { month: string; titles: string[] }[]>>(() => {
  const map: Record<string, Record<string, string[]>> = {}
  for (const ev of raw) {
    const [y, m] = ev.date.split('.')
    map[y] ??= {}
    map[y][m] ??= []
    map[y][m].push(...ev.titles)
  }
  const res: Record<string, { month: string; titles: string[] }[]> = {}
  Object.keys(map).forEach(y => {
    const months = Object.keys(map[y]).sort((a, b) => Number(a) - Number(b))
    res[y] = months.map(m => ({ month: m, titles: map[y][m] }))
  })
  return res
})

const yearsDescAll = computed<string[]>(() =>
  Object.keys(yearBlocks.value).sort((a, b) => Number(b) - Number(a))
)

const timelineRef = ref<HTMLElement | null>(null)
const yearSections = ref<HTMLElement[]>([])
const yearTopMap = ref<Record<string, number>>({})
const railHeight = ref(0)
const activeYear = ref<string>('')

function computePositions() {
  const container = timelineRef.value
  if (!container) return
  yearSections.value = Array.from(container.querySelectorAll('[data-year]')) as HTMLElement[]
  const map: Record<string, number> = {}
  let maxBottom = 0

  yearSections.value.forEach(sec => {
    const year = sec.dataset.year!
    const firstBlock = sec.querySelector('[data-year-first="1"]') as HTMLElement | null
    const anchorEl = firstBlock ?? sec
    const cRect = container.getBoundingClientRect()
    const aRect = anchorEl.getBoundingClientRect()
    const top = aRect.top - cRect.top
    map[year] = Math.max(0, Math.round(top))
    maxBottom = Math.max(maxBottom, aRect.bottom - cRect.top)
  })

  yearTopMap.value = map
  railHeight.value = Math.ceil(maxBottom + 32)
}

let ro: ResizeObserver | null = null
function setupObservers() {
  computePositions()
  ro = new ResizeObserver(() => computePositions())
  ro.observe(document.body)
  window.addEventListener('resize', computePositions, { passive: true })
  if ((document as any).fonts?.ready) (document as any).fonts.ready.then(computePositions)
}

function cleanupObservers() {
  ro?.disconnect()
  ro = null
  window.removeEventListener('resize', computePositions)
}

onMounted(async () => {
  await nextTick()
  computePositions()
  setupObservers()
  activeYear.value = yearsDescAll.value[0] || ''
})

onBeforeUnmount(() => {
  cleanupObservers()
})
</script>

<style scoped>
/* 동그라미와 연도 수평 정렬 정확히 보정 */
</style>
