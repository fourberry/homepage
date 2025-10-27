<template>
  <BaseSection
      class="panel h-dvh bg-white"
      text-color="#111827"
      :background-image-url="bgImageUrl">
    <div class="text-center h-full flex flex-col justify-center py-8 px-4 sm:px-6">
      <h2 class="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-gray-900 section-title about-us-title">ABOUT US</h2>
      <p class="text-base sm:text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed section-description">
        포베리는 사람 중심의 IT 기술 발전을 위해
        AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의 사업에 매진하고 있습니다.
      </p>
      <div
          ref="businessAreas"
          class="business-areas
                   flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 md:py-0 px-4 md:px-0
                   md:grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:overflow-x-visible md:p-0"
      >
        <div class="text-center p-4 sm:p-5 md:p-8 area-card rounded-lg
                      w-[80%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.si_sm" alt="시스템 통합 및 유지보수 이미지" class="area-card-image">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">시스템 통합 및 유지보수</h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
        </div>

        <div class="text-center p-4 sm:p-5 md:p-8 area-card rounded-lg
                      w-[80%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.solution" alt="자체 솔루션 개발 이미지" class="area-card-image">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">자체 솔루션 개발</h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
        </div>
        <div class="text-center p-4 sm:p-5 md:p-8 area-card rounded-lg
                      w-[80%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.rnd" alt="AI/빅데이터 R&D 이미지" class="area-card-image">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">AI/빅데이터 R&D</h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
        </div>
        <div class="text-center p-4 sm:p-5 md:p-8 area-card rounded-lg
                      w-[80%] sm:w-[70%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
          <img :src="areaImages.consulting" alt="IT 컨설팅 이미지" class="area-card-image">
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">IT 컨설팅</h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">비즈니스 목표 달성을 위한 최적의 IT 전략과 방향성을 제시합니다.</p>
        </div>

      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
// 스크립트 부분은 기존 코드 그대로 사용합니다.
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const bgImageUrl = '/images/2148144531.jpg'

const areaImages = ref({
  si_sm: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop',
  solution: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
  rnd: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop',
  consulting: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop'
});
const businessAreas = ref<HTMLElement | null>(null);

let intervalId: ReturnType<typeof setInterval> | null = null;
let interactionTimeoutId: ReturnType<typeof setTimeout> | null = null;
const autoplayDelay = 3000; // 자동 넘김 간격 (3초로 다시 조정)
const interactionDebounce = 5000; // 사용자 인터랙션 후 재개 대기 시간 (5초로 다시 조정)
let isMobileLayout = false;
let mediaQueryList: MediaQueryList | null = null;

const scrollToNextCard = () => {
  if (!businessAreas.value) return;
  const container = businessAreas.value;
  const cards = container.querySelectorAll('.area-card');
  if (!cards.length) return;
  let currentScroll = container.scrollLeft;
  let containerCenter = currentScroll + container.clientWidth / 2;
  let closestCardIndex = 0;
  let minDistance = Infinity;
  cards.forEach((card, index) => {
    const cardElement = card as HTMLElement;
    const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestCardIndex = index;
    }
  });
  const nextCardIndex = (closestCardIndex + 1) % cards.length;
  const nextCard = cards[nextCardIndex] as HTMLElement;
  const scrollTo = nextCard.offsetLeft - (container.clientWidth - nextCard.offsetWidth) / 2;
  container.scrollTo({ left: scrollTo, behavior: 'smooth' });
};

const startAutoplay = () => {
  stopAutoplay();
  if (!isMobileLayout) return;
  intervalId = setInterval(scrollToNextCard, autoplayDelay);
};

const stopAutoplay = () => {
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
};

const handleInteraction = () => {
  stopAutoplay();
  if (interactionTimeoutId) { clearTimeout(interactionTimeoutId); }
  interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
};

const handleResize = () => {
  if (!mediaQueryList) return;
  isMobileLayout = mediaQueryList.matches;
  if (isMobileLayout) {
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId);
    interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
  } else {
    stopAutoplay();
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId);
  }
};

onMounted(async () => {
  await nextTick();
  if (businessAreas.value && window.matchMedia) {
    mediaQueryList = window.matchMedia('(max-width: 767px)');
    isMobileLayout = mediaQueryList.matches;
    if (isMobileLayout) {
      interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce);
    }
    businessAreas.value.addEventListener('touchstart', handleInteraction, { passive: true });
    businessAreas.value.addEventListener('scroll', handleInteraction, { passive: true });
    mediaQueryList.addEventListener('change', handleResize);
  }
});

onUnmounted(() => {
  stopAutoplay();
  if (interactionTimeoutId) { clearTimeout(interactionTimeoutId); }
  if (businessAreas.value) {
    businessAreas.value.removeEventListener('touchstart', handleInteraction);
    businessAreas.value.removeEventListener('scroll', handleInteraction);
  }
  if (mediaQueryList) {
    mediaQueryList.removeEventListener('change', handleResize);
  }
});

defineExpose({ businessAreas });
</script>

<style scoped>

.about-us-title {
  font-weight: 800;
}
.area-card-image {
  width: 100%;
  /* ✨ 이미지 높이를 기본 100px, sm 이상에서 120px, md 이상에서 150px로 조절 */
  height: 100px;
  object-fit: cover;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  /* ✨ 하단 마진 조절 (mb-4 sm:mb-6) */
  margin-bottom: 1rem; /* mb-4 */
}
/* ✨ sm 이상 화면에서 이미지 높이와 마진 적용 */
@media (min-width: 640px) {
  .area-card-image {
    height: 120px;
    margin-bottom: 1.5rem; /* mb-6 */
  }
}
/* ✨ md 이상 화면에서 이미지 높이 복원 */
@media (min-width: 768px) {
  .area-card-image {
    height: 150px;
  }
}

.business-areas {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.business-areas::-webkit-scrollbar {
  display: none;
}
</style>