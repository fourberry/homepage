<template>
  <BaseSection
      class="panel h-dvh bg-white"  text-color="#ffffff"          background-image-url="/images/aboutUs.jpg"
      :overlay-opacity="0.1">     <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 items-center h-full py-16 px-4 sm:px-6">
    <div class="text-left md:pr-8">
      <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 section-title about-us-title ">
        ABOUT US
      </h2>
      <p class="text-base sm:text-lg md:text-xl leading-relaxed section-description">
        포베리는 <span class="text-secondary">사람 중심</span>의 IT 기술 발전을 위해
        <span class="text-secondary">AICBM(AI, IoT, Cloud, Big Data, Mobile) 중심의</span> 사업에 매진하고 있습니다.
      </p>
    </div>

    <div
        ref="businessAreas"
        class="business-areas
                   flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory py-4 px-4
                   md:grid md:grid-cols-2 md:overflow-x-visible md:p-0"
    >
      <div class="text-left p-4 sm:p-5 md:p-6 area-card rounded-lg bg-gray-50 shadow-md
                      w-[70%] sm:w-[60%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
        <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">시스템 통합 및 유지보수</h3>
        <p class="text-sm sm:text-base text-gray-600 leading-normal">비즈니스 환경에 최적화된 시스템을 구축하고 안정적으로 운영합니다.</p>
      </div>

      <div class="text-left p-4 sm:p-5 md:p-6 area-card rounded-lg bg-gray-50 shadow-md
                      w-[70%] sm:w-[60%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
        <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">자체 솔루션 개발</h3>
        <p class="text-sm sm:text-base text-gray-600 leading-normal">SSO, 웹 자동화 등 고객의 비즈니스에 새로운 가치를 더하는 기술을 개발합니다.</p>
      </div>

      <div class="text-left p-4 sm:p-5 md:p-6 area-card rounded-lg bg-gray-50 shadow-md
                      w-[70%] sm:w-[60%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
        <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI/빅데이터 R&D</h3>
        <p class="text-sm sm:text-base text-gray-600 leading-normal">AI, 빅데이터 기술을 활용한 산학협력을 통해 혁신적인 솔루션을 연구합니다.</p>
      </div>

      <div class="text-left p-4 sm:p-5 md:p-6 area-card rounded-lg bg-gray-50 shadow-md
                      w-[70%] sm:w-[60%] md:w-auto
                      flex-shrink-0 md:flex-shrink-1
                      snap-center md:snap-none">
        <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">IT 컨설팅</h3>
        <p class="text-sm sm:text-base text-gray-600 leading-normal">비즈니스 목표 달성을 위한 최적의 IT 전략과 방향성을 제시합니다.</p>
      </div>
    </div>
  </div>
  </BaseSection>
</template>

<script setup lang="ts">
// 스크립트 부분은 변경 없음
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const bgImageUrl = '/images/aboutUs.jpg' // cite: 18

const areaImages = ref({
  si_sm: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop',
  solution: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop',
  rnd: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1740&auto=format&fit=crop',
  consulting: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop'
}); // cite: 18
const businessAreas = ref<HTMLElement | null>(null); // cite: 18

let intervalId: ReturnType<typeof setInterval> | null = null; // cite: 18
let interactionTimeoutId: ReturnType<typeof setTimeout> | null = null; // cite: 18
const autoplayDelay = 3000; // cite: 18
const interactionDebounce = 5000; // cite: 18
let isMobileLayout = false; // cite: 18
let mediaQueryList: MediaQueryList | null = null; // cite: 18

const scrollToNextCard = () => { // cite: 18
  if (!businessAreas.value) return; // cite: 18
  const container = businessAreas.value; // cite: 18
  const cards = container.querySelectorAll('.area-card'); // cite: 18
  if (!cards.length) return; // cite: 18
  let currentScroll = container.scrollLeft; // cite: 18
  let containerCenter = currentScroll + container.clientWidth / 2; // cite: 18
  let closestCardIndex = 0; // cite: 18
  let minDistance = Infinity; // cite: 18
  cards.forEach((card, index) => { // cite: 18
    const cardElement = card as HTMLElement; // cite: 18
    const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2; // cite: 18
    const distance = Math.abs(containerCenter - cardCenter); // cite: 18
    if (distance < minDistance) { // cite: 18
      minDistance = distance; // cite: 18
      closestCardIndex = index; // cite: 18
    }
  });
  const nextCardIndex = (closestCardIndex + 1) % cards.length; // cite: 18
  const nextCard = cards[nextCardIndex] as HTMLElement; // cite: 18
  const scrollTo = nextCard.offsetLeft - (container.clientWidth - nextCard.offsetWidth) / 2; // cite: 18
  container.scrollTo({ left: scrollTo, behavior: 'smooth' }); // cite: 18
};

const startAutoplay = () => { // cite: 18
  stopAutoplay(); // cite: 18
  if (!isMobileLayout) return; // cite: 18
  intervalId = setInterval(scrollToNextCard, autoplayDelay); // cite: 18
};

const stopAutoplay = () => { // cite: 18
  if (intervalId) { clearInterval(intervalId); intervalId = null; } // cite: 18
};

const handleInteraction = () => { // cite: 18
  stopAutoplay(); // cite: 18
  if (interactionTimeoutId) { clearTimeout(interactionTimeoutId); } // cite: 18
  interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce); // cite: 18
};

const handleResize = () => { // cite: 18
  if (!mediaQueryList) return; // cite: 18
  isMobileLayout = mediaQueryList.matches; // cite: 18
  if (isMobileLayout) { // cite: 18
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId); // cite: 18
    interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce); // cite: 18
  } else {
    stopAutoplay(); // cite: 18
    if (interactionTimeoutId) clearTimeout(interactionTimeoutId); // cite: 18
  }
};

onMounted(async () => { // cite: 18
  await nextTick(); // cite: 18
  if (businessAreas.value && window.matchMedia) { // cite: 18
    mediaQueryList = window.matchMedia('(max-width: 767px)'); // cite: 18
    isMobileLayout = mediaQueryList.matches; // cite: 18
    if (isMobileLayout) { // cite: 18
      interactionTimeoutId = setTimeout(startAutoplay, interactionDebounce); // cite: 18
    }
    businessAreas.value.addEventListener('touchstart', handleInteraction, { passive: true }); // cite: 18
    businessAreas.value.addEventListener('scroll', handleInteraction, { passive: true }); // cite: 18
    mediaQueryList.addEventListener('change', handleResize); // cite: 18
  }
});

onUnmounted(() => { // cite: 18
  stopAutoplay(); // cite: 18
  if (interactionTimeoutId) { clearTimeout(interactionTimeoutId); } // cite: 18
  if (businessAreas.value) { // cite: 18
    businessAreas.value.removeEventListener('touchstart', handleInteraction); // cite: 18
    businessAreas.value.removeEventListener('scroll', handleInteraction); // cite: 18
  }
  if (mediaQueryList) { // cite: 18
    mediaQueryList.removeEventListener('change', handleResize); // cite: 18
  }
});

defineExpose({ businessAreas }); // cite: 18
</script>

<style scoped>

.about-us-title {
  font-size: 90px;
  font-weight: 800;
}

.area-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* cite: 18 */
}
.area-card:hover {
  transform: translateY(-5px); /* cite: 18 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* cite: 18 */
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