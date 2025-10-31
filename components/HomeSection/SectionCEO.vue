<template>
  <section class="bg-surface">
    <div class="container mx-auto py-28 px-4 md:px-12 lg:px-20 xl:px-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 min-w-0">
        
        <!-- 왼쪽 정보 패널 -->
        <aside class="hidden lg:block lg:col-span-4">
          <div class="lg:sticky lg:top-24 space-y-8">
            <div>
              <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]">
                인사말
              </h1>
              <p class="mt-2 text-xl lg:text-2xl font-semibold text-gray-800">
                대표이사 우대식
              </p>
            </div>
          </div>
        </aside>

        <!-- 오른쪽 본문 -->
        <article class="lg:col-span-8 min-w-0">
          <!-- 모바일·태블릿 전용 헤더 -->
          <div class="block lg:hidden mb-6">
            <p class="text-lg font-semibold text-gray-800">
              대표이사 우대식
            </p>
          </div>

          <!-- 제목 영역 -->
          <header class="mb-8 lg:mb-10">
            <!-- ✅ laptop-L(xl~)부터 글자 크기 살짝 축소 -->
            <h2
              class="text-text leading-snug font-extrabold tracking-tight
                     text-[clamp(20px,6vw,48px)]
                     lg:text-[clamp(24px,4vw,60px)]
                     xl:text-[56px] 2xl:text-[64px]
                     whitespace-normal break-words"
            >
              "기술의 중심에 사람이 있습니다."
            </h2>
          </header>

          <!-- 본문 -->
          <div class="border-l-0 lg:border-l-6 border-gray-200 pl-0 lg:pl-8 xl:pl-10">
            <div
              class="prose prose-gray max-w-none text-gray-800 leading-relaxed
                     text-lg lg:text-[22px]"
            >
              <p class="mb-8">
                주식회사 포베리는 2023년 창업 이래 IT 분야에서
                <span class="font-semibold text-secondary">기본이 되자는 목적과 사명의식</span>을 가지고
                사업을 추진하고 있습니다.
              </p>

              <p class="mb-8">
                시스템은 <span class="font-semibold text-secondary">사람이 중심</span>이 되어야 하고
                사람을 위해서 존재해야 한다는 것이
                저희 포베리가 IT 산업을 바라보는 철학이자 기업의 경영방침입니다.
              </p>

              <p class="mb-8">
                사람 중심의 기술 발전을 위해
                <span class="font-semibold text-secondary">AICBM (AI · IoT · Cloud · Big Data · Mobile)</span>
                중심의 사업 전개가 필수적이라는 판단에서 관련 사업에 적극적으로 매진함과 동시에
                R&D 역량 향상에도 집중적으로 투자하고 있습니다.
              </p>

              <p>
                거시적 관점의 기술 개발에서 초미세화 관점으로 전이되고 있는 IT 기술의 시대 변화에 대응하고,
                사람 중심의 IT 기업을 완성할 수 있도록 고객과 함께 노력하는 기업이 되도록 하겠습니다.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
