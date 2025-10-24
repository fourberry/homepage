<template>
  <section
    class="py-32 md:py-40 bg-background relative overflow-hidden min-h-[900px] md:min-h-[1100px]"
    :style="{ height: sectionHeight + 'px' }"
  >
    <div class="max-w-7xl mx-auto px-4 relative">
      <!-- 제목 -->
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-accent text-center mb-20">
        연혁
      </h2>

      <div
        ref="timelineContainer"
        class="mt-12 grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-10 relative"
      >
        <!-- 좌측: 연도 리스트 -->
        <aside class="md:pr-4">
          <ul class="space-y-14 relative">
            <li
              v-for="y in yearsDesc"
              :key="y"
              class="relative flex items-center gap-3 py-3"
            >
              <!-- 연도 버튼 -->
              <button
                class="w-[5.5rem] text-right font-semibold transition-colors text-lg md:text-xl lg:text-2xl"
                :class="selectedYear === y
                  ? 'text-black dark:text-white'
                  : 'text-black/60 dark:text-white/60'"
                @click="selectYear(y)"
              >
                {{ y }}
              </button>

              <!-- 점/원 -->
              <span class="relative -translate-y-[3px]">
                <span
                  class="block w-2.5 h-2.5 rounded-full"
                  :class="selectedYear === y
                    ? 'bg-transparent border-2 border-black/60 dark:border-white/70'
                    : 'bg-black/30 dark:bg-white/30'"
                ></span>
                <span
                  v-if="selectedYear === y"
                  class="absolute -inset-1 rounded-full border-2 border-black/60 dark:border-white/70"
                ></span>
              </span>
            </li>
          </ul>
        </aside>

        <!-- 우측: 선택 연도 상세 -->
        <main class="md:pl-8">
          <div v-if="yearBlocks[selectedYear]" class="space-y-14">
            <div
              v-for="(monthBlock, idx) in yearBlocks[selectedYear]"
              :key="idx"
              class="space-y-5"
            >
              <p class="text-black/60 dark:text-white/60 font-semibold text-xl md:text-2xl lg:text-3xl">
                {{ selectedYear }}.<span>{{ monthBlock.month }}</span>
              </p>

              <ul class="space-y-4">
                <li
                  v-for="(text, j) in monthBlock.titles"
                  :key="j"
                  class="text-lg md:text-xl lg:text-2xl leading-relaxed"
                >
                  <span
                    class="font-semibold text-black dark:text-white"
                    v-html="bold(text)"
                  ></span>
                </li>
              </ul>
            </div>
          </div>

          <div v-else class="text-black/50 dark:text-white/50 text-lg md:text-xl">
            기록이 없습니다.
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'

type RawEvent = { date: string; titles: string[] }

const raw: RawEvent[] = [
  { date: '2023.10', titles: ['포베리 주식회사 설립', '영등포농협 온라인 쇼핑몰 구축 컨설팅 착수'] },
  { date: '2024.01', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 사업 착수'] },
  { date: '2024.06', titles: ['아우토크립트 K-CSMS 1차 구축 완료', 'TAD 홈페이지 구축 완료'] },
  { date: '2024.08', titles: ['자체 솔루션 **베리패스(Berry-Pass) 개발 착수**', '영등포농협 SSO 구축 완료'] },
  { date: '2024.10', titles: ['동행복권 인쇄복권 시스템 DB 전환 사업 착수', '한국해양공사 게이미피케이션 캠페인 구축 완료'] },
  { date: '2025.01', titles: ['자체 솔루션 **베리마인(Berry-Mine) 개발 착수** (웹 자동화)', '쿠쿠홀딩스 시스템 운영 및 고도화 착수'] },
  { date: '2025.03', titles: ['영등포농협 온라인 브랜드 쇼핑몰 구축 완료'] },
  { date: '2025.06', titles: ['아우토크립트 K-CSMS 2차 구축 완료'] },
]

// 연/월 그룹핑
const yearBlocks = computed<Record<string, { month: string; titles: string[] }[]>>(() => {
  const map: Record<string, Record<string, string[]>> = {}
  for (const ev of raw) {
    const [y, m] = ev.date.split('.') // 'YYYY', 'MM'
    if (!map[y]) map[y] = {}
    if (!map[y][m]) map[y][m] = []
    map[y][m].push(...ev.titles)
  }

  const res: Record<string, { month: string; titles: string[] }[]> = {}
  Object.keys(map).forEach((y) => {
    const months = Object.keys(map[y]).sort((a, b) => Number(a) - Number(b))
    res[y] = months.map((m) => ({ month: m, titles: map[y][m] }))
  })

  return res
})

// 표시 연도
const yearsDesc = computed<string[]>(() => ['2025', '2024', '2023'])

// 선택된 연도
const selectedYear = ref<string>(yearsDesc.value[0])

const selectYear = (y: string) => {
  selectedYear.value = y
}

// '**굵게**' 치환
const bold = (s: string) => s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

// 높이 계산
const timelineContainer = ref<HTMLElement | null>(null)
const sectionHeight = ref(0)

onMounted(async () => {
  await nextTick()
  if (!timelineContainer.value) return

  // 각 연도별 블록 높이 측정
  const yearHeights: number[] = []
  for (const y of yearsDesc.value) {
    const temp = document.createElement('div')
    temp.className = 'absolute opacity-0 pointer-events-none w-[600px]'
    temp.innerHTML =
      yearBlocks.value[y]
        ?.map(
          (m) =>
            `<p>${y}.${m.month}</p><ul>${m.titles
              .map((t) => `<li>${t}</li>`)
              .join('')}</ul>`
        )
        .join('') || ''
    document.body.appendChild(temp)
    yearHeights.push(temp.scrollHeight)
    temp.remove()
  }

  // 🔼 여유값을 더 키움 (+500)
  sectionHeight.value = Math.max(...yearHeights) + 500
})
</script>

<style scoped>

</style>
