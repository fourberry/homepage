<template>
  <div id="services">
    <section class="w-full overflow-hidden bg-white pt-48 md:pt-72">
      <!-- ===== Section Header (애니메이션 없음) ===== -->
      <header class="container-wide mb-8 text-center md:mb-14">
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
          SERVICE
        </p>
        <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
          SOLUTION
        </h2>
      </header>

      <!-- ===== Row 1 : Berry-Pass (왼쪽 -> 오른쪽) ===== -->
      <div
        class="grid grid-cols-1 xl:grid-cols-2"
        v-motion
        :initial="{ opacity: 0, x: -120 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 1200, easing: 'ease-out' } }"
        :once="true"
      >
        <!-- Image (v-motion 제거) -->
        <figure class="relative aspect-[16/9] w-full overflow-hidden xl:h-[680px]">
          <NuxtImg
            :src="berryPassImg"
            alt="Berry-Pass SSO"
            class="h-full w-full object-cover object-[50%_95%]"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/25"></div>
        </figure>

        <!-- Text (v-motion 제거) -->
        <div class="flex w-full items-center">
          <div class="mr-auto px-6 py-12 md:px-12 lg:px-16 xl:max-w-[705px] 2xl:max-w-[785px]">
            <p
              class="mb-3 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700"
            >
              SSO · Identity · Membership
            </p>

            <h3 class="mb-5 text-2xl font-extrabold tracking-tight text-slate-900 md:text-[1.85rem]">
              베리패스(Berry-Pass)
            </h3>

            <p class="mb-8 font-medium leading-relaxed text-slate-700 md:text-base lg:text-lg">
              <b>Berry-Pass</b>
              는 하나의 계정으로 여러 서비스를 안전하고 편리하게 이용할 수 있는
              <b>통합 로그인(SSO)</b>
              솔루션입니다. 다양한 소셜 로그인(카카오, 네이버, 구글, 애플 등)과 본인 인증을 지원하며,
              회원 정보를 효율적으로 관리할 수 있는 통합 환경을 제공합니다.
            </p>

            <ul class="mb-10 space-y-2 text-slate-800 md:text-[15px]">
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
                통합 회원 관리 – 약관, 권한, 개인정보 동의 이력까지 한 화면에서 관리
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
                다양한 인증 수단 – 소셜 로그인과 휴대폰 인증으로 간편하게 접속
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
                콜백 이벤트 – 회원가입·로그인·정보 수정 시 자동 연동 기능 제공
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
                유연한 연동 – 다양한 서비스 구조에 맞게 손쉽게 도입 가능
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-blue-700"></span>
                반응형 지원 – 모든 디바이스에서 최적화된 UX 제공
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ===== Row 2 : Berry-Mine (오른쪽 -> 왼쪽) ===== -->
      <div
        class="grid grid-cols-1 xl:grid-cols-2"
        v-motion
        :initial="{ opacity: 0, x: 120 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { delay: 9.0, duration: 1300, easing: 'ease-in-out' } }"
        :once="true"
      >
        <!-- Text (v-motion 제거) -->
        <div class="order-2 flex w-full items-center xl:order-1">
          <div class="ml-auto px-6 py-12 md:px-12 lg:px-16 xl:max-w-[705px] 2xl:max-w-[785px]">
            <p
              class="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700"
            >
              Web Automation · Scraping · Data
            </p>

            <h3 class="mb-5 text-2xl font-extrabold tracking-tight text-slate-900 md:text-[1.85rem]">
              베리마인(Berry-Mine)
            </h3>

            <p class="mb-8 font-medium leading-relaxed text-slate-700 md:text-base lg:text-lg">
              <b>Berry-Mine</b>
              은 공개된 웹 데이터를 자동으로 수집·정리하고, 반복적인 업무를 자동화하는
              <b>웹 스크래핑 솔루션</b>
              입니다. 자체 개발한 엔진을 통해 복잡한 데이터 수집 과정을 안정적이고 효율적으로 수행합니다.
            </p>

            <ul class="mb-10 space-y-2 text-slate-800 md:text-[15px]">
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
                자체 엔진 기반 – 독자 개발 엔진(FBScript)으로 안정적인 자동화 제공
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
                자동 수집 기능 – 검색 결과, 상품정보, 파일 등 다양한 데이터 추출
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
                프로세스 자동화 – 로그인부터 다운로드까지 모든 단계 자동 실행
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-2 h-2 w-2 rounded-full bg-emerald-700"></span>
                다양한 활용 분야 – 쇼핑몰 모니터링, 경쟁사 분석 등 실무 자동화 지원
              </li>
            </ul>
          </div>
        </div>

        <!-- Image (v-motion 제거) -->
        <figure class="relative order-1 aspect-[16/9] w-full overflow-hidden xl:order-2 xl:h-[680px]">
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
  </div>
</template>

<script setup lang="ts">
const berryPassImg = '/images/SSO.png'
const berryMineImg = '/images/auto.png'
</script>
