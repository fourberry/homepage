<template>
  <div id="about">
    <section ref="aboutSection"
      class="relative isolate w-full bg-background px-6 py-28 text-center sm:px-8 sm:py-32 md:flex md:min-h-screen md:items-center md:justify-center md:px-10">
      <div class="mx-auto max-w-5xl">
        <!-- 메인 헤드라인 -->
        <h2 class="mb-4 sm:mb-6 md:mb-8 text-balance font-extrabold tracking-tight text-gray-900
                 leading-[1.25] sm:leading-[1.2] md:leading-[1.15] lg:leading-[1.1]
                 text-[clamp(1.6rem,8vw,5rem)]">
          포베리는<br />
          <!-- ✅ 글자 위에 덮이는 하이라이트 / 순차 딜레이 (스크롤 진입 시 시작) -->
          <span class="underline-animate text-primary" style="--delay: 200ms;">사람 중심</span> 의 기술로<br />
          <span class="underline-animate text-primary" style="--delay: 900ms;">더 나은 IT 환경</span> 을 만듭니다.
        </h2>

        <!-- 서브 헤드라인 -->
        <p class="mb-4 sm:mb-6 md:mb-8 font-semibold text-gray-800 text-pretty
                 leading-snug sm:leading-snug md:leading-snug
                 text-[clamp(0.67rem,3.2vw,1.75rem)]">
          AICBM(AI + IoT + Cloud + Big Data + Mobile)을 기반으로<br />
          변화하는 시대에 맞춘 IT 솔루션을 제공합니다.
        </p>

        <!-- 설명 문단 -->
        <p
  class="mx-auto text-center text-gray-500
         break-keep hyphens-none whitespace-normal
         leading-relaxed
         max-w-none sm:max-w-[35rem] md:max-w-[42rem] lg:max-w-[56rem]
         text-[10px] sm:text-[clamp(0.55rem,2vw,1.1rem)] md:text-[clamp(0.6rem,1.8vw,1.2rem)]">
  포베리는 사람을 위한 기술, 신뢰를 쌓는 기술을 추구하는 IT 전문 기업입니다.
  <br class="hidden md:block" />
  <span>
    다양한 산업 분야의 시스템 자동화와 기술을 통해
    <span class="hidden sm:inline">통합 솔루션, R&amp;D, AI 빅데이터 </span>
    <br />
    고객 중심의 가치를 실현하고 있습니다.
  </span>
</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const aboutSection = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const sectionEl = aboutSection.value
  if (!sectionEl) return

  // 섹션이 화면에 절반 정도 들어오면 트리거
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      sectionEl.querySelectorAll<HTMLElement>('.underline-animate')
        .forEach(el => el.classList.add('play'))
      observer?.disconnect()
    }
  }, { threshold: 0.5 })

  observer.observe(sectionEl)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
/* ✨ 글자 위에 덮이는 하늘색 ‘형광펜’ 느낌 (리플로우 없음) */
.underline-animate {
  position: relative;
  display: inline-block;
}

/* 기본은 정지(보이지 않음): scaleX(0) 상태 */
.underline-animate::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  /* 텍스트 라인에 붙지만 레이아웃 영향 없음 */
  width: 100%;
  height: 0.48em;
  /* 요청대로 조금 더 굵게 */
  background: rgba(166, 225, 255, 0.45);
  /* 투명 하늘색 */
  border-radius: 0.28em;
  pointer-events: none;
  z-index: 2;
  /* 텍스트 위로 덮이게 */
  mix-blend-mode: multiply;
  /* 잉크 덮이는 느낌 (원치 않으면 제거) */

  transform: scaleX(0);
  transform-origin: left center;
}

/* ▶ 섹션이 뷰포트에 닿으면 .play 가 붙어 애니메이션 시작 */
.underline-animate.play::after {
  animation: underlineSweep 2.2s cubic-bezier(.22, .8, .26, .99) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes underlineSweep {
  to {
    transform: scaleX(1);
  }
}

/* 모션 최소화 환경 배려 */
@media (prefers-reduced-motion: reduce) {
  .underline-animate::after {
    animation: none !important;
    transform: scaleX(1) !important;
  }
}
</style>
