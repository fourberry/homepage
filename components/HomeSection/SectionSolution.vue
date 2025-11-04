<template>
  <section class="bg-white w-full overflow-hidden pt-48 md:pt-72">
    <!-- ===== Section Header : Solution ===== -->
    <header
      class="container-wide text-center mb-8 md:mb-14"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 700, easing: 'ease-out' } }"
      :once="true"
    >
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
        SERVICE
      </p>
      <h2 class="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
        SOLUTION
      </h2>
    </header>

    <!-- ===== Row 1 : Berry-Pass (SSO) ===== -->
    <div
      class="grid grid-cols-1 xl:grid-cols-2"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible="{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 600, easing: 'ease-out' } }"
      :once="true"
    >
      <!-- Image (left) -->
      <figure class="relative aspect-[16/9] xl:h-[680px] overflow-hidden w-full">
        <NuxtImg
          :src="berryPassImg"
          alt="Berry-Pass SSO"
          class="h-full w-full object-cover object-[50%_95%]"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/25"></div>
      </figure>

      <!-- Text (right) -->
      <div class="flex items-center w-full">
        <div
          class="px-6 md:px-12 lg:px-16 py-12 xl:max-w-[705px] 2xl:max-w-[785px] mr-auto"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 600, easing: 'ease-out' } }"
          :once="true"
        >
          <p class="mb-3 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            SSO · Identity · Membership
          </p>

          <h3 class="text-2xl md:text-[1.85rem] font-extrabold text-slate-900 mb-5 tracking-tight">
            베리패스(Berry-Pass)
          </h3>

          <p class="text-slate-700 leading-relaxed mb-8 font-medium md:text-base lg:text-lg">
            <b>Berry-Pass</b>는 하나의 계정으로 여러 서비스를 안전하고 편리하게 이용할 수 있는
            <b>통합 로그인(SSO)</b> 솔루션입니다.  
            다양한 소셜 로그인(카카오, 네이버, 구글, 애플 등)과 본인 인증을 지원하며,  
            회원 정보를 효율적으로 관리할 수 있는 통합 환경을 제공합니다.
          </p>

          <ul class="space-y-2 text-slate-800 md:text-[15px] mb-10">
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
              <span>통합 회원 관리 – 약관, 권한, 개인정보 동의 이력까지 한 화면에서 관리</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
              <span>다양한 인증 수단 – 소셜 로그인과 휴대폰 인증으로 간편하게 접속</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
              <span>콜백 이벤트 – 회원가입·로그인·정보 수정 시 자동 연동 기능 제공</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
              <span>유연한 연동 – 다양한 서비스 구조에 맞게 손쉽게 도입 가능</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
              <span>반응형 지원 – 모든 디바이스에서 최적화된 UX 제공</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ===== Row 2 : Berry-Mine (Web Automation) ===== -->
    <div
      class="grid grid-cols-1 xl:grid-cols-2"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :visible="{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 600, easing: 'ease-out' } }"
      :once="true"
    >
      <div
        class="order-2 xl:order-1 flex items-center w-full"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { delay: 1.0, duration: 600, easing: 'ease-out' } }"
        :once="true"
      >
        <div
          class="px-6 md:px-12 lg:px-16 py-12 xl:max-w-[705px] 2xl:max-w-[785px] ml-auto"
        >
          <p class="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            Web Automation · Scraping · Data
          </p>

          <h3 class="text-2xl md:text-[1.85rem] font-extrabold text-slate-900 mb-5 tracking-tight">
            베리마인(Berry-Mine)
          </h3>

          <p class="text-slate-700 leading-relaxed mb-8 font-medium md:text-base lg:text-lg">
            <b>Berry-Mine</b>은 공개된 웹 데이터를 자동으로 수집·정리하고,  
            반복적인 업무를 자동화하는 <b>웹 스크래핑 솔루션</b>입니다.  
            자체 개발한 엔진을 통해 복잡한 데이터 수집 과정을 안정적이고 효율적으로 수행합니다.
          </p>

          <ul class="space-y-2 text-slate-800 md:text-[15px] mb-10">
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
              <span>자체 엔진 기반 – 독자 개발 엔진(FBScript)으로 안정적인 자동화 제공</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
              <span>자동 수집 기능 – 검색 결과, 상품정보, 파일 등 다양한 데이터 추출</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
              <span>프로세스 자동화 – 로그인부터 다운로드까지 모든 단계 자동 실행</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
              <span>다양한 활용 분야 – 쇼핑몰 모니터링, 경쟁사 분석 등 실무 자동화 지원</span>
            </li>
          </ul>
        </div>
      </div>

      <figure class="order-1 xl:order-2 relative aspect-[16/9] xl:h-[680px] overflow-hidden w-full">
        <NuxtImg
          :src="berryMineImg"
          alt="Berry-Mine Web Automation"
          class="h-full w-full object-cover object-[50%_10%]"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/25"></div>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
const berryPassImg = '/images/SSO.png'
const berryMineImg = '/images/auto.png'
</script>
