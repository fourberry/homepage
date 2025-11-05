<template>
  <section class="relative bg-black text-white">
    <!-- 🔹 세로가 낮은 화면에서만 상하 패딩 축소 -->
    <div class="mx-auto max-w-7xl px-4 py-28 short:py-16 md:px-10 md:py-36 lg:px-16">
      <!-- 헤더 -->
      <header class="text-center">
        <h2
          class="font-extrabold leading-tight text-center
                 text-3xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          기술로 연결하고,<br class="block xl:hidden" />
          <span class="hidden xl:inline"></span>혁신으로 성장합니다.
        </h2>

        <p class="mt-6 text-lg leading-relaxed text-zinc-300 md:text-xl lg:text-2xl max-w-6xl mx-auto">
          {{ subtitle }}
        </p>
      </header>

      <!-- 🔹 헤더와 카드 사이 간격도 높이 낮을 때만 축소 -->
      <div class="mt-16 sm:mt-24 md:mt-32 lg:mt-36 xl:mt-40 short:mt-12" ></div>

      <!-- 카드 리스트 -->
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-16 md:gap-x-6 md:gap-y-20 lg:gap-x-8 lg:gap-y-24"
      >
        <li
          v-for="(item, i) in areas"
          :key="i"
          class="group relative w-full sm:w-[95%] md:w-[90%] lg:w-[88%] xl:w-[85%] mx-auto h-full"
        >
          <div
            class="relative flex flex-col justify-center h-full
                   rounded-[1.75rem] border border-white/30 bg-zinc-950 
                   px-6 py-8 short:py-6 md:px-7 md:py-9
                   shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)]
                   transition-transform duration-300 group-hover:-translate-y-1.5"
          >
            <h3
              class="absolute left-8 md:left-10 -top-6 md:-top-7 short:-top-5
                     rounded-full bg-white px-6 py-2
                     text-black text-lg short:text-base md:text-xl font-semibold tracking-tight shadow-md"
            >
              {{ item.title }}
            </h3>

            <p
              class="mt-2 text-lg short:text-base md:text-xl leading-snug text-zinc-300 text-center px-3"
            >
              {{ item.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
type Area = { title: string; desc: string }

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    areas?: Area[]
  }>(),
  {
    title: '기술로 연결하고, 혁신으로 성장합니다.',
    subtitle:
      '포베리는 시스템 자동화, 맞춤형 솔루션, AI 연구개발, IT 컨설팅을 통해 기업의 디지털 전환을 앞당깁니다.',
    areas: () => [
      { title: '시스템 자동화 및 통합', desc: '기업 환경에 최적화된 업무 프로세스 자동화와 시스템 통합 솔루션을 제공합니다.' },
      { title: '시스템 솔루션 개발', desc: '고객의 요구에 맞춘 맞춤형 웹·모바일 솔루션을 기획부터 구축까지 전 과정 수행합니다.' },
      { title: 'AI / 빅데이터 R&D', desc: '데이터 기반의 인공지능 기술과 산학협력을 통해 혁신적인 연구개발을 이어갑니다.' },
      { title: 'IT 컨설팅', desc: '프로젝트 기획부터 운영까지, 기술과 비즈니스를 잇는 전략적 IT 컨설팅 서비스를 제공합니다.' },
    ],
  }
)
</script>
