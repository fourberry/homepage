<template>
  <section class="bg-background pb-32 md:pb-40">
    <div class="max-w-7xl mx-auto px-4">
      <!-- 상단 헤더 -->
      <header
        class="text-center mb-8 md:mb-12 max-w-7xl mx-auto px-4 md:px-8 lg:px-12"
      >
        <p
          class="text-sm tracking-widest uppercase font-semibold text-red-300 mb-2"
        >
          Values
        </p>

        <h2 class="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
          핵심 가치
        </h2>

        <p class="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
          기술의 본질과 미래를 탐구하며,<br />
          고객의 비즈니스에 가장 확실한 가치를 더합니다.
        </p>
      </header>

      <ul class="grid sm:grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 mt-8">
        <li
          v-for="(item, i) in coreValuesWithIcons"
          :key="i"
          class="pt-0 text-center relative"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          :delay="i * 200"
          :once="true"
          :threshold="0.5"
        >
          <div
            class="w-72 h-72 mx-auto mb-8 flex items-center justify-center rounded-full shadow-xl transition-colors duration-300"
            :class="[
              i === 0
                ? 'bg-green-100/80'
                : i === 1
                ? 'bg-yellow-100/80'
                : 'bg-white/40 backdrop-blur-md',
            ]"
          >
            <NuxtImg
              :src="item.iconUrl"
              :alt="item.title + ' 아이콘'"
              class="w-full h-full object-cover rounded-full p-0"
              loading="lazy"
            />
          </div>

          <h3
            class="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-gray-900"
          >
            {{ item.title }}
          </h3>

          <p
            class="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed"
          >
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
    title: "고객 중심",
    desc: "모든 기술 발전의 최우선 가치이자 고객 경험의 출발점입니다.",
    iconUrl: "/images/people.png",
  },
  {
    title: "기술 역량과 품질",
    desc: "R&D 집중 투자로 실용적 혁신과 최상의 품질을 제공합니다.",
    iconUrl: "/images/tech.png",
  },
  {
    title: "신뢰 기반 성장",
    desc: "투명한 소통과 협력을 통해 고객과 함께 지속적으로 성장합니다.",
    iconUrl: "/images/growth2.jpg",
  },
];
</script>

<style scoped></style>
