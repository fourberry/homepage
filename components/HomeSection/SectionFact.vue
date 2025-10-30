<template>
  <section class="bg-accent pt-28 md:pt-36 pb-0 md:pb-0">
    <div class="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
      <h2 class="sr-only">회사 기본 정보</h2>

      <!-- 섹션 타이틀 -->
      <h3 class="text-white text-2xl md:text-3xl font-bold mb-8 tracking-tight">
        LOCATION
      </h3>

      <!-- 2컬럼 레이아웃 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <!-- ========== 왼쪽: 지도 영역 ========== -->
        <div class="flex flex-col rounded-2xl shadow-md h-full space-y-4">

          <!-- 지도 상단 컨트롤 -->
          <div class="flex flex-wrap items-center gap-3 text-white text-sm">
            <button
              class="px-3 py-2 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition"
              @click="toggleTraffic"
            >
              교통정보 {{ trafficOn ? '끄기' : '켜기' }}
            </button>
          </div>

          <!-- 지도 컨테이너 -->
          <div class="relative w-full">
            <div
              ref="mapContainerRef"
              class="w-full h-[400px] rounded-xl border border-white/30 shadow-inner bg-black/10"
            ></div>

            <!-- 주소 라벨 -->
            <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
              서울특별시 영등포구 양평로 22길 21<br />
              코오롱디지털타워 1409호 (선유도 인근)
            </div>
          </div>

          <!-- 상태 메시지 (확대/축소 이벤트 로그) -->
          <div class="text-gray-300 text-xs bg-black/20 rounded-lg p-3 border border-white/10 min-h-[3rem] whitespace-pre-line">
            {{ statusMessage }}
          </div>
        </div>

        <!-- ========== 오른쪽: 회사 정보 영역 ========== -->
        <div class="flex flex-col justify-center">
          <dl class="divide-y-2 divide-white/40">
            <!-- 회사명 -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 py-5 md:py-6">
              <dt class="md:col-span-2 text-sm md:text-base lg:text-lg text-gray-300">
                회사명
              </dt>
              <dd class="md:col-span-4 text-base md:text-lg lg:text-xl text-white md:pl-6 lg:pl-8">
                포베리주식회사
              </dd>
            </div>

            <!-- 설립일 -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 py-5 md:py-6">
              <dt class="md:col-span-2 text-sm md:text-base lg:text-lg text-gray-300">
                설립일
              </dt>
              <dd class="md:col-span-4 text-base md:text-lg lg:text-xl text-white md:pl-6 lg:pl-8">
                2023년 10월 30일
              </dd>
            </div>

            <!-- 주요 사업 -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 py-5 md:py-6">
              <dt class="md:col-span-2 text-sm md:text-base lg:text-lg text-gray-300">
                주요 사업
              </dt>
              <dd class="md:col-span-4 text-base md:text-lg lg:text-xl text-white leading-relaxed md:pl-6 lg:pl-8">
                시스템 자동화 및 통합<br />
                시스템 솔루션 개발<br />
                AI/빅데이터 산학협력 R&amp;D<br />
                IT 컨설팅
              </dd>
            </div>

            <!-- 임직원수 -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 py-5 md:py-6">
              <dt class="md:col-span-2 text-sm md:text-base lg:text-lg text-gray-300">
                임직원수
              </dt>
              <dd class="md:col-span-4 text-base md:text-lg lg:text-xl text-white md:pl-6 lg:pl-8">
                8명
              </dd>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3 py-5 md:py-6">
              <dt class="md:col-span-2 text-sm md:text-base lg:text-lg text-gray-300">
                Contact
              </dt>
              <dd class="md:col-span-4 text-base md:text-lg lg:text-xl text-white md:pl-6 lg:pl-8">
                <div class="space-y-2 md:space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="w-20 text-gray-400 text-sm md:text-base">HP</span>
                    <span>010-2755-6550</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="w-20 text-gray-400 text-sm md:text-base">Addr</span>
                    <span class="leading-relaxed">
                      서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호
                    </span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="w-20 text-gray-400 text-sm md:text-base">Email</span>
                    <span>damon@fourberry.co.kr</span>
                  </div>
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

// 상태
const trafficOn = ref(false)
const statusMessage = ref('')

// kakao/map 인스턴스 캐시
let kakaoRef: any = null
let mapRef: any = null

// 1) 여기를 회사 실제 좌표로 바꿔줘 (선유도 근처 예시 좌표 넣어둠)
const companyLat = 37.5398071417051  // ← 이 값 너희 사무실 위도로 교체해
const companyLng = 126.894657064548// ← 이 값 너희 사무실 경도로 교체해

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

  // 지도 중심을 "회사 실제 좌표"로 고정
  const center = new kakaoRef.maps.LatLng(companyLat, companyLng)
  const mapOptions = {
    center,
    level: 4,
  }

  if (mapContainerRef.value) {
    mapRef = new kakaoRef.maps.Map(mapContainerRef.value, mapOptions)

    // 마커
    const marker = new kakaoRef.maps.Marker({
      position: center,
      map: mapRef,
    })

    // 인포윈도우
    const content = document.createElement('div')
content.innerHTML = `
  <div style="
    display: inline-block;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    padding: 8px 14px;
    font-size: 13px;
    color: #111;
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
  yAnchor: 1.5, // 마커보다 살짝 위
})

overlay.setMap(mapRef)
  }

  // 확대/축소 이벤트 감시
  if (mapRef) {
    kakaoRef.maps.event.addListener(mapRef, 'zoom_changed', () => {
      const level = mapRef.getLevel()
      statusMessage.value = `지도 확대/축소 레벨: ${level}`
    })
  }

  // ⚠ geocoder는 이제 "보조"로만 남기고, 지도의 중심을 바꾸지 않음
  //   (원하는 위치가 틀어지는 걸 방지)
  const geocoder = new kakaoRef.maps.services.Geocoder()
  geocoder.addressSearch('서울특별시 영등포구 양평로 22길 21', (result: any, status: any) => {
    if (status === kakaoRef.maps.services.Status.OK && result[0]) {
      // 필요하면 여기서 result[0] 좌표를 찍어 debug할 수 있어
      // console.log('geocoder says:', result[0])
    }
  })
})
</script>
