<template>
  <section class="bg-background py-16 md:py-24 lg:py-28">
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
      <h2 class="sr-only">회사 기본 정보</h2>

      <!-- 섹션 타이틀 -->
      <h3
        class="mb-8 text-2xl font-extrabold tracking-tight text-black md:text-3xl leading-none"
      >
        오시는 길
      </h3>

      <!-- 2컬럼 레이아웃 -->
      <div class="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- ========== 왼쪽: 지도 영역 ========== -->
        <div class="flex h-full min-h-full flex-col space-y-4 rounded-2xl min-w-0">
          <!-- 지도 상단 컨트롤 -->
          <div class="flex flex-wrap items-center gap-3 text-sm text-black lg:text-[0.9rem]">
            <button
              class="rounded-lg border border-gray-400 bg-gray-100 px-3 py-2 text-black transition hover:bg-gray-200"
              @click="toggleTraffic"
            >
              교통정보 {{ trafficOn ? "끄기" : "켜기" }}
            </button>
          </div>

          <!-- 지도 컨테이너 -->
          <div class="relative w-full">
            <div ref="mapContainerRef" class="h-[400px] w-full bg-gray-100 shadow-inner"></div>

            <!-- 주소 라벨 -->
            <div
              class="absolute bottom-4 left-4 max-w-[80%] break-words rounded-lg border border-gray-300 bg-white/90 px-3 py-2 text-[11px] text-gray-800 shadow-lg md:text-xs"
            >
              서울특별시 영등포구 양평로 22길 21<br />
              코오롱디지털타워 1409호 (선유도 인근)
            </div>
          </div>
        </div>

        <!-- ========== 오른쪽: 회사 정보 영역 ========== -->
        <div class="flex h-full min-h-full flex-col justify-center min-w-0">
          <dl class="divide-y-2 divide-gray-300">
            <!-- 회사명 -->
            <div class="grid grid-cols-1 gap-3 py-5 md:grid-cols-6 md:py-6">
              <dt
                class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg"
              >
                회사명
              </dt>
              <dd
                class="min-w-0 text-base text-black md:col-span-4 md:pl-6 md:text-[1.05rem] lg:text-[1.1rem] xl:text-xl"
              >
                포베리주식회사
              </dd>
            </div>

            <!-- 설립일 -->
            <div class="grid grid-cols-1 gap-3 py-5 md:grid-cols-6 md:py-6">
              <dt
                class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg"
              >
                설립일
              </dt>
              <dd
                class="min-w-0 text-base text-black md:col-span-4 md:pl-6 md:text-[1.05rem] lg:text-[1.1rem] xl:text-xl"
              >
                2023년 10월 30일
              </dd>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 gap-3 py-5 md:grid-cols-6 md:py-6">
              <dt
                class="text-sm text-gray-600 md:col-span-2 md:text-base lg:text-[0.95rem] xl:text-lg"
              >
                Contact
              </dt>
              <dd
                class="min-w-0 text-base text-black md:col-span-4 md:pl-6 md:text-[1.05rem] lg:text-[1.1rem] xl:text-xl"
              >
                <div class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2 md:grid-cols-[7rem_1fr]">
                  <span class="text-sm text-gray-500 md:text-base lg:text-[0.9rem]">HP</span>
                  <span>010-2755-6550</span>

                  <span class="text-sm text-gray-500 md:text-base lg:text-[0.9rem]">Addr</span>
                  <span class="leading-relaxed break-words lg:break-keep">
                    서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호
                  </span>

                  <span class="text-sm text-gray-500 md:text-base lg:text-[0.9rem]">Email</span>
                  <span class="break-all">damon@fourberry.co.kr</span>
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
import { ref, onMounted } from "vue"

const mapContainerRef = ref<HTMLDivElement | null>(null)
const { $kakao } = useNuxtApp()

const trafficOn = ref(false)
let kakaoRef: any = null
let mapRef: any = null

const companyLat = 37.5398071417051
const companyLng = 126.894657064548

const toggleTraffic = () => {
  if (!mapRef || !kakaoRef) return
  if (trafficOn.value) {
    mapRef.removeOverlayMapTypeId(kakaoRef.maps.MapTypeId.TRAFFIC)
    trafficOn.value = false
  } else {
    mapRef.addOverlayMapTypeId(kakaoRef.maps.MapTypeId.TRAFFIC)
    trafficOn.value = true
  }
}

onMounted(async () => {
  kakaoRef = await $kakao.load()
  const center = new kakaoRef.maps.LatLng(companyLat, companyLng)
  const mapOptions = { center, level: 4 }

  if (mapContainerRef.value) {
    mapRef = new kakaoRef.maps.Map(mapContainerRef.value, mapOptions)

    const marker = new kakaoRef.maps.Marker({ position: center, map: mapRef })

    const content = document.createElement("div")
    content.innerHTML = `
      <div style="
        display: inline-block;
        background: rgba(0, 0, 0, 0.85);
        border: 1px solid rgba(0, 0, 0, 0.25);
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
