<template>
  <section class="bg-background py-24 md:py-32">
    <div class="container-wide">
      <h2 class="sr-only">회사 기본 정보</h2>
     <header class="mx-auto mb-8 max-w-7xl px-4 text-center md:mb-12 md:px-8 lg:px-12">
        <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-red-300">contact</p>
        <h2 class="mb-3 text-2xl font-extrabold leading-tight md:text-4xl">오시는 길</h2>

      </header>


      <!-- 2컬럼 레이아웃 -->
      <div class="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <!-- ========== 왼쪽: 지도 영역 ========== -->
        <div class="flex h-full min-h-full flex-col space-y-4 rounded-2xl">
          <!-- 지도 컨테이너 -->
          <div class="relative w-full">
            <div ref="mapContainerRef" class="h-[400px] w-full bg-gray-100 shadow-inner"></div>

            <!-- 주소 라벨 -->
            <div
              class="absolute bottom-4 left-4 rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-xs text-gray-800 shadow-lg"
            >
              서울특별시 영등포구 양평로 22길 21
              <br />
              코오롱디지털타워 1409호 (선유도 인근)
            </div>
          </div>
        </div>

        <!-- ========== 오른쪽: 회사 정보 영역 ========== -->
        <div class="flex h-full min-h-full flex-col justify-center">
          <dl class="divide-y divide-gray-200">
            <!-- 회사명 -->
            <div class="grid grid-cols-1 gap-1 py-4 md:grid-cols-6 md:py-4">
              <dt class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg">회사명</dt>
              <dd
                class="text-base text-black md:col-span-4 md:pl-4 md:text-[1rem] lg:text-[1.05rem] xl:text-xl break-keep leading-snug"
              >
                포베리주식회사
              </dd>
            </div>

            <!-- 설립일 -->
            <div class="grid grid-cols-1 gap-1 py-4 md:grid-cols-6 md:py-4">
              <dt class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg">설립일</dt>
              <dd
                class="text-base text-black md:col-span-4 md:pl-4 md:text-[1rem] lg:text-[1.05rem] xl:text-xl break-keep leading-snug"
              >
                2023년 10월 30일
              </dd>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 gap-1 py-4 md:grid-cols-6 md:py-4">
              <dt class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg">Contact</dt>
              <dd
                class="text-base text-black md:col-span-4 md:pl-4 md:text-[1rem] lg:text-[1.05rem] xl:text-xl break-words leading-relaxed"
              >
                <div
                  class="grid grid-cols-[5rem_1fr] gap-x-2 gap-y-[2px] sm:grid-cols-[6rem_1fr] md:grid-cols-[6.5rem_1fr]"
                >
                  <span class="text-gray-500 flex items-center gap-1 text-sm md:text-base">
                    <i class="fa-solid fa-phone text-gray-600"></i>
                    전화
                  </span>
                  <span><a href="tel:010-2755-6550" class="hover:text-primary">010-2755-6550</a></span>

                  <span class="text-gray-500 flex items-center gap-1 text-sm md:text-base">
                    <i class="fa-solid fa-location-dot text-gray-600"></i>
                    주소
                  </span>
                  <span class="break-words leading-relaxed">
                    서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호
                  </span>

                  <span class="text-gray-500 flex items-center gap-1 text-sm md:text-base">
                    <i class="fa-solid fa-envelope text-gray-600"></i>
                    이메일
                  </span>
                  <span class="break-all">
                    <a href="mailto:damon@fourberry.co.kr" class="hover:text-primary">damon@fourberry.co.kr</a>
                  </span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mapContainerRef = ref<HTMLDivElement | null>(null)
const { $kakao } = useNuxtApp()

let kakaoRef: any = null
let mapRef: any = null

const companyLat = 37.5398071417051
const companyLng = 126.894657064548

onMounted(async () => {
  kakaoRef = await $kakao.load()
  const center = new kakaoRef.maps.LatLng(companyLat, companyLng)
  const mapOptions = { center, level: 4 }

  if (mapContainerRef.value) {
    mapRef = new kakaoRef.maps.Map(mapContainerRef.value, mapOptions)

    const marker = new kakaoRef.maps.Marker({ position: center, map: mapRef })

    const content = document.createElement('div')
    content.innerHTML = `
      <div style="
        display: inline-block;
        background: rgba(0, 0, 0, 0.85);
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        padding: 8px 14px;
        font-size: 13px;
        color: #fff;
        font-weight: 600;
        white-space: nowrap;
        transform: translate(-50%, -100%);
        position: absolute;
        left: 50%;
        bottom: 100%;
      ">
        포베리 주식회사
      </div>
    `

    const overlay = new kakaoRef.maps.CustomOverlay({
      content,
      position: center,
      yAnchor: 1.5,
    })

    overlay.setMap(mapRef)
  }
})
</script>
