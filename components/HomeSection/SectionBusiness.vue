<script setup lang="ts">
type Area = {
  title: string;
  desc: string;
  icon?: string;
};

const props = withDefaults(
  defineProps<{     
    title?: string;
    subtitle?: string;
    areas?: Area[];
  }>(),
  {
    title: "국내에서 쌓아온 성과를 세계로 확장합니다.",
    subtitle: 
      "365mc는 고객 중심의 혁신을 바탕으로 의료, 바이오, 글로벌 사업 전반에 걸쳐 새로운 가능성을 만들어갑니다.",
    areas: () => [
      {
        title: "의료사업",
        desc: "365mc의 경험을 바탕으로 글로벌 의료 네트워크를 확장해 나갑니다.",
        icon: "✚",
      },
      {
        title: "바이오사업",
        desc: "의료 데이터를 기반으로 AI 바이오 기술의 미래를 설계합니다.",
        icon: "❄️",
      },
      {
        title: "R&D",
        desc: "의료를 넘어 콘텐츠와 테크를 아우르는 새로운 공동 연구를 진행합니다.",
        icon: "▶️",
      },
      {
        title: "글로벌사업",
        desc: "의료 노하우를 전 세계로 확장하며 혁신적 솔루션을 제공합니다.",
        icon: "🌍",
      },
    ],
  }
);
</script>

<template>
  <!-- ✅ 장식 제거: 순수 검정 -->
  <section class="relative bg-black text-white">
    <div class="mx-auto max-w-6xl px-4 md:px-10 lg:px-16 py-20 md:py-28">
      <header class="text-center mb-12 md:mb-16">
        <h2 class="text-2xl md:text-4xl font-extrabold leading-tight">
          {{ title }}
        </h2>
        <p class="mt-4 text-sm md:text-base text-zinc-300 leading-relaxed">
          {{ subtitle }}
        </p>
      </header>

      <ul
        class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 place-items-center"
      >
        <li
          v-for="(item, i) in areas"
          :key="i"
          class="group w-[90%] sm:w-[80%] md:w-[70%]"
        >
          <div
            class="relative rounded-[2.5rem] px-6 py-8 md:px-10 md:py-12 bg-zinc-950 border border-white/10 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:-translate-y-1"
          >
            <!-- 아이콘 (원하면 유지) -->
            <div
              v-if="item.icon"
              class="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-black font-bold text-xl shadow-lg border border-white/10"
            >
              <span aria-hidden="true">{{ item.icon }}</span>
            </div>

            <div class="mt-2">
              <h3
                class="inline-block rounded-full bg-zinc-800/80 px-3 py-1 text-sm font-semibold tracking-tight"
              >
                {{ item.title }}
              </h3>
              <p
                class="mt-3 text-sm md:text-[15px] leading-relaxed text-zinc-300"
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
