<template>
  <div id="about">
    <section
      class="relative isolate w-full bg-background px-6 py-28 text-center sm:px-8 sm:py-32 md:flex md:min-h-screen md:items-center md:justify-center md:px-10"
    >
      <div class="mx-auto max-w-5xl">
        <!-- 메인 헤드라인 -->
        <h2
          class="mb-8 text-balance font-extrabold tracking-tight text-gray-900
                 leading-[1.25] sm:leading-[1.2] md:leading-[1.15] lg:leading-[1.1]
                 text-[clamp(1.6rem,8vw,5rem)]"
        >
          포베리는<br />
          <span class="text-primary">사람 중심</span> 의 기술로<br />
          <span class="text-primary">더 나은 IT 환경</span> 을 만듭니다.
        </h2>

        <!-- 서브 헤드라인 -->
        <p
          class="mb-8 font-semibold text-gray-800 text-pretty
                 leading-snug sm:leading-snug md:leading-snug
                 text-[clamp(0.95rem,3.8vw,1.75rem)]"
        >
          AICBM(AI + IoT + Cloud + Big Data + Mobile)을 기반으로<br />
          변화하는 시대에 맞춘 IT 솔루션을 제공합니다.
        </p>

        <!-- 설명 문단 -->
        <p
          class="mx-auto text-center text-gray-500 text-pretty
                 leading-relaxed
                 max-w-[20rem] sm:max-w-[30rem] md:max-w-[42rem] lg:max-w-[56rem]
                 text-[clamp(0.85rem,3.2vw,1.25rem)]"
        >
          포베리는 사람을 위한 기술, 신뢰를 쌓는 기술을 추구하는 IT 전문 기업입니다.
          <br class="hidden md:block" />
          <span class="hidden md:inline">
            다양한 산업 분야의 시스템 자동화와 통합 솔루션, R&amp;D, AI 빅데이터 기술을 통해
            <br />
            고객 중심의 가치를 실현하고 있습니다.
          </span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 모바일에서는 마지막 문단의 추가 설명 숨기기 (md 이상에서만 표시됨) */
</style>
