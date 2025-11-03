<template>
  <section class="bg-background pb-32 md:pb-40">
    <div class="mx-auto max-w-7xl px-4">
      <!-- 상단 헤더 -->
      <header class="mx-auto mb-8 max-w-7xl px-4 text-center md:mb-12 md:px-8 lg:px-12">
        <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-red-300">Values</p>
        <h2 class="mb-3 text-3xl font-extrabold leading-tight md:text-5xl">핵심 가치</h2>
        <p class="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
          기술의 본질과 미래를 탐구하며,<br />
          고객의 비즈니스에 가장 확실한 가치를 더합니다.
        </p>
      </header>

      <!-- ✅ 1 → 2 → 4 → 4 열 (랩탑부터 4열) -->
      <ul
        class="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16 xl:gap-x-16 xl:gap-y-20"
      >
        <li
          v-for="(item, i) in coreValuesWithIcons"
          :key="i"
          class="relative min-w-0 overflow-hidden pt-0 text-center"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          :delay="i * 150"
          :once="true"
          :threshold="0.5"
        >
          <!-- 아이콘 원형: 랩탑에서 살짝 축소, 데스크톱부터 확대 -->
          <div
            class="mx-auto mb-8 flex items-center justify-center rounded-full shadow-xl transition-colors duration-300
                   h-48 w-48 sm:h-56 sm:w-56 lg:h-52 lg:w-52 xl:h-64 xl:w-64 overflow-hidden"
            :class="[
              i === 0 ? 'bg-green-100/80'
              : i === 1 ? 'bg-yellow-100/80'
              : i === 2 ? 'bg-white/40 backdrop-blur-md'
              : 'bg-purple-100/80'
            ]"
          >
            <NuxtImg
              :src="item.iconUrl"
              :alt="item.title + ' 아이콘'"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- 타이틀/설명: 랩탑에서 과도하지 않게 -->
          <h3 class="mb-3 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
            {{ item.title }}
          </h3>

          <p class="mx-auto max-w-[34ch] text-sm leading-relaxed text-gray-600 md:text-base lg:text-[0.98rem] xl:text-lg">
            {{ item.desc }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const coreValuesWithIcons = [
  {
    title: '고객 중심',
    desc: '모든 기술 발전의 최우선 가치이자 고객 경험의 출발점입니다.',
    iconUrl: '/images/people.png',
  },
  {
    title: '기술 역량과 품질',
    desc: 'R&D 집중 투자로 실용적 혁신과 최상의 품질을 제공합니다.',
    iconUrl: '/images/tech.png',
  },
  {
    title: '신뢰 기반 성장',
    desc: '투명한 소통과 협력을 통해 고객과 함께 지속적으로 성장합니다.',
    iconUrl: '/images/growth2.jpg',
  },
  {
    title: '혁신과 도전',
    desc: '새로운 기술과 도전을 두려워하지 않고, 항상 더 나은 방법을 탐구합니다.',
    iconUrl: '/images/challenge.png', // 필요 시 전용 이미지로 교체
  },
]
</script>

<style scoped></style>
