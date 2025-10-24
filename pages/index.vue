<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue' // computed 추가
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useHeaderTheme } from '~/composables/useHeaderTheme'
import type SectionAbout from "~/components/HomeSection/SectionAbout.vue";

// 페이지 메타 정의: home 레이아웃 사용
definePageMeta({
  layout: 'home',
})

const mainContainer = ref<HTMLElement | null>(null);

interface SectionAboutExposed {
  businessAreas: Ref<HTMLElement | null>;
}
// SectionAbout 컴포넌트 참조 ref
const sectionAboutRef = ref<InstanceType<typeof SectionAbout> & SectionAboutExposed | null>(null);

// businessAreas ref (computed로 변경)
const businessAreas = computed(() => sectionAboutRef.value?.businessAreas);

// 헤더 테마 상태 변수 선언
const headerTheme = useHeaderTheme()

// GSAP 타임라인, Observer 인스턴스, 패널 배열
let heroTl: gsap.core.Timeline | null = null;
let panelTls: (gsap.core.Timeline | null)[] = [];
let observer: Observer | null = null;
let panels: HTMLElement[] = [];

// 옵저버 토글 함수 정의
const disableObserver = () => observer?.disable();
const enableObserver = () => observer?.enable();

// 모바일 환경 여부 ref
const isMobile = ref(false);

// 상태 변수 (onMounted 밖으로 이동)
let currentIndex = 0;
let animating = false;
let numPanels = 0;

// --- 섹션 전환 함수 (gotoSection) 정의 ---
const gotoSection = (toIndex: number, direction: number) => {
  if (animating) return;

  const fromIndex = currentIndex;

  if (toIndex < 0 || toIndex >= numPanels) {
    return;
  }

  // 헤더 테마 변경
  if (toIndex === 1 || toIndex === 2 || toIndex === 3) {
    headerTheme.value = 'dark';
  } else {
    headerTheme.value = 'light';
  }

  animating = true;
  currentIndex = toIndex;
  const dFactor = direction;

  panelTls[fromIndex]?.seek(0).pause();

  const tl = gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete: () => {
      animating = false;
      panelTls[toIndex]?.play();
    }
  });

  gsap.set(panels[toIndex], { yPercent: 100 * dFactor, autoAlpha: 1 });
  tl.to(panels[fromIndex], { yPercent: -100 * dFactor })
      .to(panels[toIndex], { yPercent: 0 }, 0);

  // preventDefault는 필요시 각 핸들러 내부에서 관리 가능
  // if (observer) {
  //   observer.vars.preventDefault = (currentIndex !== numPanels - 1);
  // }
};

// --- 웹/데스크탑용 스크롤 핸들러 ---
const handleWebScrollDown = () => {
  if (currentIndex < numPanels - 1) {
    if (!animating) gotoSection(currentIndex + 1, 1); // 다음 섹션
  }
};
const handleWebScrollUp = () => {
  if (currentIndex > 0) {
    if (!animating) gotoSection(currentIndex - 1, -1); // 이전 섹션
  }
  if(currentIndex === 0 && observer) {
    observer.vars.preventDefault = true; // 첫 섹션 위로 스크롤 방지 (원하는 동작 유지)
  }
};

// --- 모바일용 스크롤 핸들러 (반대 로직) ---
const handleMobileScrollDown = () => { // 아래로 드래그 -> 이전 섹션
  if (currentIndex > 0) {
    if (!animating) gotoSection(currentIndex - 1, -1); // 이전 섹션
  }
};
const handleMobileScrollUp = () => { // 위로 드래그 -> 다음 섹션
  if (currentIndex < numPanels - 1) {
    if (!animating) gotoSection(currentIndex + 1, 1); // 다음 섹션
  }
};


onMounted(() => {
  // 모바일 환경 감지 (예: 창 너비 기준)
  isMobile.value = window.innerWidth < 768;
  // 필요시 User Agent 문자열 사용: /Mobi|Android/i.test(navigator.userAgent)

  gsap.registerPlugin(ScrollTrigger, Observer)

  headerTheme.value = 'light' // 초기 헤더 테마 설정

  panels = gsap.utils.toArray<HTMLElement>('.panel');
  numPanels = panels.length;
  if (!mainContainer.value || panels.length === 0) return;

  // --- 1. Hero 섹션 애니메이션 ---
  gsap.set('.home-hero h1, .home-hero .hero-subtitle', { autoAlpha: 0, y: 40 });
  heroTl = gsap.timeline();
  heroTl.to(".home-hero h1", { duration: 1.2, y: 0, autoAlpha: 1, ease: "power3.out" }, "-=0.3")
      .to(".home-hero .hero-subtitle", { duration: 1.2, y: 0, autoAlpha: 1, ease: "power3.out" }, "-=0.9")
      .to(".home-hero .hero-background-image", { duration: 2.5, clipPath: 'ellipse(150% 150% at 50% 100%)', opacity: 1, ease: "power2.inOut" }, "<0.2")
      .to(".home-hero .hero-content", { duration: 2.0, color: '#ffffff', ease: 'power2.inOut' }, "-=2.5");

  // --- 2a. 패널 스타일 초기화 ---
  gsap.set(mainContainer.value, { position: 'relative', height: '100dvh', overflow: 'hidden' });
  gsap.set(panels, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
  gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 0 });
  gsap.set(panels[0], { yPercent: 0, autoAlpha: 1 });

  // --- 2b. 각 패널 내부 애니메이션 타임라인 생성 ---
  panelTls = panels.map((panel, i) => {
    if (i === 0) return null; // 첫 패널(Hero)은 별도 애니메이션

    const title = panel.querySelector('h2');
    const description = panel.querySelector('.section-description');
    const cards = gsap.utils.toArray(panel.querySelectorAll('.area-card, .card'));
    const buttons = panel.querySelector('.details-button, .contact-button');
    const logos = panel.querySelector('.client-logos');
    const solution = panel.querySelector('.solution-cards');
    const contentTl = gsap.timeline({ paused: true });
    const elementsToSet = [title, description, ...cards, buttons, logos, solution].filter(Boolean);

    if (elementsToSet.length > 0) gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });
    if (title) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1);
    if (description) contentTl.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.1');
    if (cards.length > 0) contentTl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, '<0.2');
    if (logos) contentTl.to(logos, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1');
    if (solution) contentTl.to(solution, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1');
    if (buttons) contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1');

    return contentTl;
  });

  // --- Observer 생성 (환경에 따라 다른 핸들러 할당) ---
  observer = Observer.create({
    target: mainContainer.value,
    type: 'wheel,touch,pointer',
    onDown: isMobile.value ? handleMobileScrollDown : handleWebScrollDown, // 모바일/웹 구분
    onUp: isMobile.value ? handleMobileScrollUp : handleWebScrollUp,       // 모바일/웹 구분
    tolerance: 10, // 스크롤 감도 조절 (필요시 값 변경)
    preventDefault: true // 기본 스크롤 동작 방지
  });

  // --- ABOUT US 슬라이드 영역 터치 시 Observer 비활성화/활성화 ---
  // (이전 대화에서 문제가 되었다면 주석 처리된 상태 유지)
  // if (businessAreas.value) {
  //   businessAreas.value.addEventListener('touchstart', disableObserver, { passive: true });
  //   businessAreas.value.addEventListener('touchend', enableObserver, { passive: true });
  // }

});

onUnmounted(() => {
  // 이벤트 리스너 및 GSAP 인스턴스 정리
  // if (businessAreas.value) {
  //   businessAreas.value.removeEventListener('touchstart', disableObserver);
  //   businessAreas.value.removeEventListener('touchend', enableObserver);
  // }
  observer?.kill();
  heroTl?.kill();
  panelTls.forEach(tl => tl?.kill());

  // GSAP으로 설정된 스타일 초기화
  if (mainContainer.value) {
    gsap.set(mainContainer.value, { clearProps: 'position,height,overflow' });
  }
  gsap.set(panels, { clearProps: 'position,top,left,width,height,yPercent,autoAlpha' });
  const contentSelectors = '.home-hero h1, .home-hero .hero-subtitle, h2, .section-description, .area-card, .card, .details-button, .contact-button';
  gsap.set(contentSelectors, { clearProps: 'autoAlpha,y,clipPath,opacity,color' });
});
</script>

<template>
  <div class="w-full overflow-hidden" ref="mainContainer">
    <HomeSectionHero />
    <HomeSectionAbout ref="sectionAboutRef" />
    <HomeSectionSiSm />
    <HomeSectionSolutions />
    <HomeSectionCta />
    <HomeSectionFooter />
  </div>
</template>

<style scoped>
/* 필요한 경우 여기에 스타일 추가 */
</style>