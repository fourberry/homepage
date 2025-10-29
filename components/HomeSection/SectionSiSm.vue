<template>
  <BaseSection
      class="panel h-dvh bg-white border-t border-gray-200 py-16 md:py-24"
      text-color="#111827"
  >
    <div class="text-center h-full flex flex-col justify-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-4 md:mb-16 break-keep mt-8">
        <h2 class="text-4xl md:text-[80px] font-extrabold mb-4 md:mb-12 text-gray-950">
          SI & SM
        </h2>
        <p class=" text-xl sm:text-lg md:text-[40px] font-bold  text-gray-950 leading-relaxed max-w-3xl mx-auto">
          포베리는 AICBM 기술을 중심으로 고객의 비즈니스에 새로운 가치를 더하는 SI/SM 사업을 수행합니다.
        </p>
      </div>

      <div class="w-full">

        <div
            ref="flexContainer"
            class="flex flex-row md:flex-row gap-4 lg:gap-6 md:h-96
                 overflow-x-auto justify-start md:justify-center md:overflow-x-visible
                 snap-x snap-mandatory md:snap-none"
        >

          <div class="flex-card relative rounded-lg overflow-hidden shadow-md w-[80vw] md:w-auto snap-start">
            <div class="card-face face1">
              <NuxtImg src="/images/cuckoo.svg" alt="Cuckoo Project" class="absolute inset-0 w-full h-full object-contain opacity-80"/>
            </div>
            <div class="card-face face2">
              <NuxtImg src="/images/cuckoo.svg" alt="Cuckoo Project" class="absolute inset-0 w-full h-full object-contain opacity-30 blur-sm"/>
              <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-gray-900 text-left">
                <h3 class="text-lg md:text-xl font-semibold mb-2">CUCKOO</h3>
                <p class="text-xs md:text-sm leading-tight font-medium">
                  78개 영업채널의 주문/배송/재고를 관리하는 통합 쇼핑몰(OMS) 및 차세대 영업관리 시스템을 구축
                </p>
              </div>
            </div>
          </div>

          <div class="flex-card relative rounded-lg overflow-hidden shadow-md w-[80vw] md:w-auto snap-start">
            <div class="card-face face1">
              <NuxtImg src="/images/hanaro.svg" alt="Hanaro Project" class="absolute inset-0 w-full h-full object-contain opacity-80"/>
            </div>
            <div class="card-face face2">
              <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-gray-900 text-left">
                <h3 class="text-lg md:text-xl font-semibold mb-2">WITH FRESH</h3>
                <p class="text-xs md:text-sm leading-tight font-medium">
                  영등포농협의 자체 브랜드몰 'Always withFresh' (하이브리드 모바일 앱) 및 통합로그인(SSO) 시스템을 구축
                </p>
              </div>
            </div>
          </div>

          <div class="flex-card relative rounded-lg overflow-hidden shadow-md w-[80vw] md:w-auto snap-start">
            <div class="card-face face1">
              <NuxtImg src="/images/kobc.svg" alt="KOBC Project" class="absolute inset-0 w-full h-full object-contain opacity-80"/>
            </div>
            <div class="card-face face2">
              <div class="relative z-10 p-4 md:p-5 flex flex-col justify-center h-full text-gray-900 text-left">
                <h3 class="text-lg md:text-xl font-semibold mb-2">KOBC</h3>
                <p class="text-xs md:text-sm leading-tight font-medium">
                  한국해양공사의 선박 매연 저감 캠페인을 '부루마블' 게이미피케이션과 접목하여 PC/모바일로 구축
                </p>
              </div>
            </div>
          </div>

          <NuxtLink to="/projects" class="flex-card relative rounded-lg overflow-hidden shadow-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-800 w-[80vw] md:w-auto snap-start">
            <div class="text-center">
              <h3 class="text-lg md:text-xl font-semibold mb-1">SEE ALL PROJECTS</h3>
              <p class="text-xs md:text-sm text-gray-600 leading-tight">전체 프로젝트 보러가기 &rarr;</p>
            </div>
          </NuxtLink>

        </div>
        <div class="mobile-arrow-container">
          <button
              @click="scrollLeft"
              aria-label="Scroll Left"
              :class="[
                'arrow-btn',
                { 'is-disabled': isAtStart }
              ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
              @click="scrollRight"
              aria-label="Scroll Right"
              :class="[
                'arrow-btn',
                { 'is-disabled': isAtEnd }
              ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

      </div> </div>
  </BaseSection>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted }from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const config = useRuntimeConfig()
const imageUrl = `${config.app.baseURL}images/sism_4.jpg`
const flexContainer = ref<HTMLElement | null>(null)
const ctx = ref<gsap.Context | null>(null)

// --- 스크롤 버튼 상태 관리 ---
const scrollAmount = ref(0)
const isAtStart = ref(true)
const isAtEnd = ref(false)
// ------------------------------------

// --- 스크롤 함수 ---
const scrollLeft = () => {
  flexContainer.value?.scrollBy({ left: -scrollAmount.value, behavior: 'smooth' })
}
const scrollRight = () => {
  flexContainer.value?.scrollBy({ left: scrollAmount.value, behavior: 'smooth' })
}

/** 스크롤 컨테이너의 현재 상태를 체크하여 버튼 표시 여부 업데이트 */
const updateScrollState = () => {
  const el = flexContainer.value
  if (!el) return

  isAtStart.value = el.scrollLeft < 10
  isAtEnd.value = el.scrollWidth - el.scrollLeft <= el.clientWidth + 10
}
// ----------------------------------


onMounted(() => {
  const containerEl = flexContainer.value
  if (!containerEl) return

  const cards = gsap.utils.toArray<HTMLElement>(containerEl.children)

  // --- 스크롤양 계산 및 리스너 등록 ---
  if (cards.length > 0) {
    const firstCard = cards[0]
    const containerStyle = getComputedStyle(containerEl)
    const gap = parseFloat(containerStyle.gap) || 16

    scrollAmount.value = firstCard.offsetWidth + gap
  }

  containerEl.addEventListener('scroll', updateScrollState, { passive: true })
  updateScrollState()
  // ----------------------------------------

  // --- GSAP 로직 ---
  ctx.value = gsap.context(() => {
    gsap.matchMedia().add({
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)"
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

          cards.forEach(card => {
            if (card.tagName.toLowerCase() === 'a') return

            // [수정 없음] 데스크톱 로직
            if (isDesktop) {
              const onEnter = () => {
                const state = Flip.getState(cards)
                card.classList.add('is-active')
                Flip.from(state, {
                  duration: 0.8,
                  ease: 'elastic.out(1, 0.7)',
                  absolute: true
                })
              }
              const onLeave = () => {
                const state = Flip.getState(cards)
                card.classList.remove('is-active')
                Flip.from(state, {
                  duration: 0.5,
                  ease: 'power2.out',
                  absolute: true
                })
              }
              card.addEventListener('mouseenter', onEnter)
              card.addEventListener('mouseleave', onLeave)
            }

            // --- [ ✨ 여기가 X축(세로)으로 수정되었습니다 ] ---
            if (isMobile) {
              gsap.set(card, {
                transformPerspective: 1000
              });

              const tl = gsap.timeline({ paused: true });
              const timing = 1;

              // [수정됨] rotationY -> rotationX
              tl.to(card, {
                rotationX: "+=180", // 세로로 +180도 회전
                duration: timing,
                ease: "power2.inOut"
              });

              // [수정 없음] z축 팝업 효과는 동일
              tl.to(card, {
                z: 50,
                duration: timing / 2,
                yoyo: true,
                repeat: 1
              }, 0);

              // [수정 없음] 클릭 시 'additive' 재생
              const onClick = () => {
                if (!tl.isActive()) {
                  tl.restart();
                }
              };
              card.addEventListener('click', onClick);
            }
            // --- [ ✨ 수정 끝 ] ---

          }) // end forEach
        }) // end context
  }, containerEl) // end gsap.context
})

onUnmounted(() => {
  if (ctx.value) {
    ctx.value.revert()
  }
  if (flexContainer.value) {
    flexContainer.value.removeEventListener('scroll', updateScrollState)
  }
})
</script>

<style scoped>
/*
 * :root 또는 컴포넌트 최상위(.panel)에 변수 선언
 */
.panel {
  --card-slide-duration: 0.6s;
  --card-slide-ease: cubic-bezier(0.76, 0, 0.24, 1);
  --card-z-index-delay: 0.5s;

  /* 모바일용 카드 높이 (기본 16rem) */
  --card-height-mobile-default: 16rem;
}

.flex-card {
  /* 기본 (데스크톱) 스타일 */
  flex-basis: 25%;
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: z-index 0s var(--card-z-index-delay);
  border: 1px solid #e5e7eb;

  /* [추가] 3D 플립 효과를 위한 원근감 설정 */
  perspective: 1000px;
}

/* GSAP Flip이 사용할 .is-active 로직 (카드 크기 변경 - 데스크톱) */
.flex-card.is-active {
  /* 데스크톱: 호버 시 2배(50%) 크기로 넓어짐 */
  flex-basis: 50%;
  flex-grow: 2;
  z-index: 10;
  transition-delay: 0s; /* 활성화 시 z-index 즉시 변경 */
}

/* --- 카드 내부 슬라이드 애니메이션 (face1, face2) - 데스크톱 --- */
.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform var(--card-slide-duration) var(--card-slide-ease);
}
.face1 {
  transform: translateY(0);
  color: white;
}
.face2 {
  transform: translateY(100%);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: #111827;
}
/* 데스크톱 .is-active 애니메이션 */
.flex-card.is-active .face1 {
  transform: translateY(-100%);
}
.flex-card.is-active .face2 {
  transform: translateY(0);
}


/* --- ✨ [수정됨] 모바일 (max-width: 767px) 스타일 --- */
@media (max-width: 767px) {
  .flex-card {
    /* 가로 스크롤 아이템(flex: 0 0 auto)으로 변경 */
    flex: 0 0 auto; /* 너비는 w-[80vw]가 제어 */
    min-height: var(--card-height-mobile-default);

    /* [추가] 모바일에서 3D 변형 스타일 적용 */
    transform-style: preserve-3d;

    /* [수정됨] GSAP가 transform을 직접 제어하므로 transition에서 제거 */
    transition: z-index 0s var(--card-z-index-delay);
  }

  /* "SEE ALL" 카드도 동일한 높이 적용 */
  .flex-card:last-child {
    min-height: var(--card-height-mobile-default);
  }

  /* .is-active 클래스 기반의 transform 제거 (GSAP가 제어) */
  .flex-card.is-active {
    transition-delay: 0s;
  }

  /* (선택 사항) 모바일에서 가로 스크롤바 숨기기 */
  .overflow-x-auto::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
  .overflow-x-auto {
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* --- [새로 추가됨] 카드 구분선 --- */
  .flex-card:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -0.5rem;
    top: 15%;
    bottom: 15%;
    width: 1px;
    background-color: #e5e7eb; /* gray-200 */
    z-index: 5;
  }

  /* --- [ ✨ 수정됨 ] 모바일 3D 플립을 위한 Face 스타일 오버라이드 --- */

  .card-face {
    /* [추가] 카드의 뒷면을 숨김 */
    backface-visibility: hidden;
    /* [수정] 데스크톱의 슬라이드 transition을 제거 */
    transition: none;
  }

  .face1 {
    /* [ ✨ 수정됨 ] rotateY(0) 대신 rotateX(0) */
    transform: rotateX(0deg);
  }

  .face2 {
    /*
     * [ ✨ 수정됨 ]
     * rotateY(180deg) 대신 rotateX(180deg) (세로로 뒤집기)
     * + rotateZ(180deg) (콘텐츠가 거꾸로 보이는 것을 방지하기 위해 미리 뒤집음)
     */
    transform: rotateX(180deg) rotateZ(180deg);

    /* [추가됨] 데스크톱 .face2에 있던 배경/블러 스타일 */
    background-color: rgba(255, 255, 255, 0.95);

  }

  /*
   * .is-active 시 데스크톱의 translateY 애니메이션 방지
   * (데스크톱 Flip에는 필요하므로 하위 @media만 수정)
   */
  .flex-card.is-active .face1 {
    transform: translateY(-100%); /* 데스크톱용 */

    @media (max-width: 767px) {
      /* [ ✨ 수정됨 ] */
      transform: rotateX(0deg); /* 모바일 오버라이드 */
    }
  }
  .flex-card.is-active .face2 {
    transform: translateY(0); /* 데스크톱용 */

    @media (max-width: 767px) {
      /* [ ✨ 수정됨 ] */
      transform: rotateX(180deg) rotateZ(180deg); /* 모바일 오버라이드 */
    }
  }
  /* --- 3D 플립 스타일 끝 --- */


  /* --- [수정 없음] 모바일 스크롤 버튼 스타일 (기존과 동일) --- */
  .mobile-arrow-container {
    display: none;
  }
  .arrow-btn {
    display: none;
  }

  @media (max-width: 767px) {
    .mobile-arrow-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .arrow-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 9999px;
      background-color: #f3f4f6;
      color: #374151;
      transition: all 0.2s ease;
    }

    .arrow-btn:active {
      transform: scale(0.95);
      background-color: #e5e7eb;
    }

    .arrow-btn.is-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
</style>