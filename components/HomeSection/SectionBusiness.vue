<script setup lang="ts">
type Area = {
    title: string
    desc: string
}

const props = withDefaults(
    defineProps<{
        title?: string
        subtitle?: string
        areas?: Area[]
    }>(),
    {
        title: '기술로 연결하고, 혁신으로 성장합니다.',
        subtitle: '포베리는 시스템 자동화, 맞춤형 솔루션, AI 연구개발, IT 컨설팅을 통해 기업의 디지털 전환을 앞당깁니다.',
        areas: () => [
            {
                title: '시스템 자동화 및 통합',
                desc: '기업 환경에 최적화된 업무 프로세스 자동화와 시스템 통합 솔루션을 제공합니다.',
            },
            {
                title: '시스템 솔루션 개발',
                desc: '고객의 요구에 맞춘 맞춤형 웹·모바일 솔루션을 기획부터 구축까지 전 과정 수행합니다.',
            },
            {
                title: 'AI / 빅데이터 R&D',
                desc: '데이터 기반의 인공지능 기술과 산학협력을 통해 혁신적인 연구개발을 이어갑니다.',
            },
            {
                title: 'IT 컨설팅',
                desc: '프로젝트 기획부터 운영까지, 기술과 비즈니스를 잇는 전략적 IT 컨설팅 서비스를 제공합니다.',
            },
        ],
    }
)
</script>

<template>
    <!-- ✅ 장식 제거: 순수 검정 -->
    <section class="relative bg-black text-white">
        <div class="mx-auto max-w-6xl px-4 py-20 md:px-10 md:py-28 lg:px-16">
            <header class="mb-12 text-center md:mb-16">
                <h2 class="text-2xl font-extrabold leading-tight md:text-4xl">
                    {{ title }}
                </h2>
                <p class="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                    {{ subtitle }}
                </p>
            </header>

            <ul class="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:gap-12">
  <li
    v-for="(item, i) in areas"
    :key="i"
    class="group w-[90%] sm:w-[80%] md:w-[70%]"
  >
    <div
      class="relative rounded-[1.75rem] border border-white/10 bg-zinc-950 
             px-5 py-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
             transition-transform duration-300 group-hover:-translate-y-1 
             md:px-8 md:py-6"
    >
      <div class="mt-1">
        <h3
          class="inline-block rounded-full bg-zinc-800/80 px-3 py-1 text-sm font-semibold tracking-tight"
        >
          {{ item.title }}
        </h3>
        <p
          class="mt-2 text-sm leading-relaxed text-zinc-300 md:text-[15px]"
        >
          {{ item.desc }}
        </p>
      </div>
    </div>
  </li>
</ul>
        </div>
    </section>
</template>
