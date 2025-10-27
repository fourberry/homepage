<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue' // computed 추가
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { useHeaderTheme } from '~/composables/useHeaderTheme'
import type SectionAbout from "~/components/HomeSection/SectionAbout.vue";
import AppHeader from "~/components/AppHeader.vue";
import { Flip } from 'gsap/Flip';

// ✨ Flip 플러그인 등록
gsap.registerPlugin(Flip, ScrollTrigger, Observer);

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

const appHeaderRef = ref<InstanceType<typeof AppHeader> | null>(null);
const introTextRef = ref<HTMLElement | null>(null); // ✨ Intro 텍스트 ref
const homeHeroRef = ref<HTMLElement | null>(null);

// 헤더 테마 상태 변수 선언
const headerTheme = useHeaderTheme()

// --- GSAP/Observer 관련 변수 ---
let heroTl: gsap.core.Timeline | null = null;
let panelTls: (gsap.core.Timeline | null)[] = [];
let observer: Observer | null = null;
let panels: HTMLElement[] = [];
let currentIndex = 0;
let animating = false;
let numPanels = 0;

// 옵저버 토글 함수 정의
const disableObserver = () => observer?.disable();
const enableObserver = () => observer?.enable();

// 모바일 환경 여부 ref
const isMobile = ref(false);
const isLoadingIntro = ref(true);


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
  gsap.set(panels[fromIndex], { zIndex: 1 });

  const tl = gsap.timeline({
    defaults: { duration: 0.5, ease: "power1.inOut" },
    onComplete: () => {
      animating = false;
      panelTls[toIndex]?.play();
    }
  });

  gsap.set(panels[toIndex], { yPercent: 100 * dFactor, autoAlpha: 1, zIndex: 2 });
  tl.to(panels[fromIndex], { yPercent: -100 * dFactor })
      .to(panels[toIndex], { yPercent: 0 }, 0);

  // preventDefault는 필요시 각 핸들러 내부에서 관리 가능
  // if (observer) {
  //   observer.vars.preventDefault = (currentIndex !== numPanels - 1);
  // }
};

// 스크롤 핸들러 (웹/모바일 분리)
const handleWebScrollDown = () => { if (currentIndex < numPanels - 1 && !animating) gotoSection(currentIndex + 1, 1); };
const handleWebScrollUp = () => { if (currentIndex > 0 && !animating) gotoSection(currentIndex - 1, -1); if(currentIndex === 0 && observer) observer.vars.preventDefault = true; };
const handleMobileScrollDown = () => { if (currentIndex > 0 && !animating) gotoSection(currentIndex - 1, -1); };
const handleMobileScrollUp = () => { if (currentIndex < numPanels - 1 && !animating) gotoSection(currentIndex + 1, 1); };

// ✨ Hero 타임라인 생성 함수
const createHeroTimeline = () => {
  heroTl = gsap.timeline({ paused: true }); // 처음엔 멈춤

  // HomeSectionHero 내부 요소들을 직접 선택 (ref나 더 구체적인 셀렉터 사용 권장)
  const heroTitle = mainContainer.value?.querySelector('.home-hero h1');
  const heroSubtitle = mainContainer.value?.querySelector('.home-hero .hero-subtitle');
  const heroBg = mainContainer.value?.querySelector('.home-hero .hero-background-image');
  const heroContent = mainContainer.value?.querySelector('.home-hero .hero-content'); // 글자색 변경용

  if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0, y: 40 });
  if (heroSubtitle) gsap.set(heroSubtitle, { autoAlpha: 0, y: 40 });
  // 배경 초기 상태는 PageHero 컴포넌트 CSS에서 clip-path로 관리

  if (heroTitle) heroTl.to(heroTitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: "power3.out" }, "-=0.3");
  if (heroSubtitle) heroTl.to(heroSubtitle, { duration: 1.2, y: 0, autoAlpha: 1, ease: "power3.out" }, "-=0.9");
  if (heroBg) heroTl.to(heroBg, { duration: 2.5, clipPath: 'ellipse(150% 150% at 50% 100%)', opacity: 1, ease: "power2.inOut" }, "<0.2");
  if (heroContent) heroTl.to(heroContent, { duration: 2.0, color: '#ffffff', ease: 'power2.inOut' }, "-=2.5"); // 글자색 변경
};

// ✨ Observer 설정 함수
const setupObserver = () => {
  if (observer) observer.kill(); // 기존 옵저버 제거

  observer = Observer.create({
    target: mainContainer.value,
    type: 'wheel,touch,pointer',
    onDown: isMobile.value ? handleMobileScrollDown : handleWebScrollDown,
    onUp: isMobile.value ? handleMobileScrollUp : handleWebScrollUp,
    tolerance: 10,
    preventDefault: true, // 첫 섹션 이후 스크롤 방지
  });

  // 첫 섹션에서는 위로 스크롤 방지 (웹 전용)
  if (!isMobile.value && currentIndex === 0 && observer) {
    observer.vars.preventDefault = true;
  }

  // About Us 섹션 터치 처리 (필요한 경우 활성화)
  // if (businessAreas.value) {
  //   businessAreas.value.addEventListener('touchstart', disableObserver, { passive: true });
  //   businessAreas.value.addEventListener('touchend', enableObserver, { passive: true });
  // }
};

// ✨ 패널 및 내부 애니메이션 설정 함수
const setupPanelsAndAnimations = () => {
  panels = gsap.utils.toArray<HTMLElement>('.panel');
  numPanels = panels.length;
  if (!mainContainer.value || panels.length === 0) return;

  // 패널 초기화
  gsap.set(mainContainer.value, { position: 'relative', height: '100dvh', overflow: 'hidden' });
  gsap.set(panels, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', autoAlpha: 0, zIndex: 1 });
  gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, zIndex: 2 });
  gsap.set(panels.slice(1), { yPercent: 100 }); // 나머지 패널은 아래에

  // 내부 애니메이션 타임라인 생성
  panelTls = panels.map((panel, i) => {
    // ... (기존 panelTls 생성 로직 - 변경 없음) ...
    if (i === 0) return null; // 첫 패널(Hero)은 heroTl로 관리

    const title = panel.querySelector('h2, h3');
    const description = panel.querySelector('.section-description');
    const cards = gsap.utils.toArray(panel.querySelectorAll('.area-card, .card'));
    const buttons = panel.querySelector('.details-button, .contact-button');
    const logos = panel.querySelector('.client-logos');
    const solution = panel.querySelector('.solution-cards');
    const strengthsListItems = gsap.utils.toArray(panel.querySelectorAll('.strengths li'));
    const inquiryTitle = panel.querySelector('.inquiry h2');
    const isCtaSection = i === 4; // CTA 섹션 인덱스 확인

    const contentTl = gsap.timeline({ paused: true });
    const elementsToSet = [title, description, ...cards, buttons, logos, solution, ...strengthsListItems, inquiryTitle].filter(Boolean);

    if (elementsToSet.length > 0) gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });

    // 일반 섹션 요소
    if (title && !isCtaSection) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1);
    if (description) contentTl.to(description, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.1');
    if (cards.length > 0) contentTl.to(cards, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5 }, '<0.2');
    if (logos) contentTl.to(logos, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1');
    if (solution) contentTl.to(solution, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.1');

    // CTA 섹션 요소
    if (isCtaSection) {
      if (title) contentTl.to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1); // Strengths 제목
      if (strengthsListItems.length > 0) contentTl.to(strengthsListItems, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.2 }, '<0.1');
      if (inquiryTitle) contentTl.to(inquiryTitle, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.3');
      if (buttons) contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1'); // CTA 버튼
    } else if (buttons) {
      contentTl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.4 }, '<0.1'); // 다른 섹션 버튼
    }

    return contentTl;
  });
};


// --- Lifecycle Hooks ---
onMounted(async () => {
  isMobile.value = window.innerWidth < 768; // 모바일 감지
  await nextTick(); // DOM 요소 확보

  const introTextEl = introTextRef.value;
  const headerEl = appHeaderRef.value?.$el as HTMLElement | undefined;
  const headerLogoEl = headerEl?.querySelector('#header-logo-text'); // ID로 헤더 로고 찾기

  if (!introTextEl || !headerEl || !headerLogoEl || !mainContainer.value) {
    console.error("Intro animation elements not found!");
    isLoadingIntro.value = false; // 에러 시 바로 내용 표시
    // 에러 발생 시 기존 로직 실행 (선택적)
    createHeroTimeline();
    setupPanelsAndAnimations();
    heroTl?.play(); // 바로 히어로 애니메이션 시작
    setupObserver();
    return;
  }

  // --- 인트로 애니메이션 실행 ---
  headerTheme.value = 'light'; // 인트로 중 헤더 테마 (필요시 조정)
  gsap.set(headerEl, { autoAlpha: 0 }); // 헤더 숨기기
  gsap.set(mainContainer.value, { autoAlpha: 0 }); // 메인 콘텐츠 숨기기

  createHeroTimeline(); // Hero 타임라인 생성 (재생은 나중에)

  const introTl = gsap.timeline({
    onComplete: () => {
      isLoadingIntro.value = false; // 인트로 요소 숨기기
      gsap.to(mainContainer.value, { autoAlpha: 1, duration: 0.5 }); // 메인 콘텐츠 보이기
      setupPanelsAndAnimations(); // 패널 설정
      heroTl?.play(); // Hero 애니메이션 시작
      setupObserver(); // 스크롤 옵저버 시작
    }
  });

  // 1. 인트로 텍스트 등장 (Rise 효과 예시: 아래에서 위로 + 페이드인)
  introTl.fromTo(introTextEl,
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power3.out' }
  );

  // 2. Flip 애니메이션 준비 및 실행
  introTl.add(() => {
    const state = Flip.getState(introTextEl); // 시작 상태 저장
    gsap.set(introTextEl, { display: 'none' }); // 인트로 텍스트 즉시 숨김
    gsap.set(headerEl, { autoAlpha: 1 }); // 헤더 보이기

    // Flip 애니메이션 실행 (인트로 텍스트 위치 -> 헤더 로고 위치)
    Flip.from(state, {
      targets: headerLogoEl,
      duration: 1.2,
      ease: 'power2.inOut',
      scale: true, // 크기 변화 애니메이션 활성화
      // onComplete 콜백은 introTl의 onComplete에서 처리하므로 여기선 제거
    });
  }, ">-0.5"); // 앞 애니메이션 종료 0.5초 전에 시작

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
  <div>

<!--    <div v-if="isLoadingIntro" class="intro-overlay">-->
<!--      <h1 ref="introTextRef" class="intro-text">FOURBERRY</h1>-->
<!--    </div>-->


    <div v-show="!isLoadingIntro">
      <AppHeader ref="appHeaderRef" />
      <div class="w-full overflow-hidden" ref="mainContainer">
        <HomeSectionHero ref="homeHeroRef"/>
        <HomeSectionAbout ref="sectionAboutRef" />
        <HomeSectionSiSm />
        <HomeSectionSolutions />
        <HomeSectionCta />
      </div>
    </div>
  </div>
</template>

<style>
.intro-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white; /* 흰색 배경 */
  z-index: 1000; /* 다른 요소 위에 표시 */
  overflow: hidden;
}
.intro-text {
  /* 크기를 viewport 기준으로 설정 (반응형) */
  font-size: clamp(40px, 12vw, 150px); /* 최소, 가변, 최대 크기 */
  font-weight: 800; /* Extra bold */
  color: #003da5; /* Primary color (tailwind.config.js 참조) */
  /* 필요시 글꼴 등 추가 */
  font-family: "Roman", sans-serif; /* Roman 폰트 적용 */
  opacity: 0; /* 초기 상태는 투명 (GSAP에서 제어) */
}

/* AppHeader가 처음엔 보이지 않도록 (GSAP set으로 제어하지만 안전장치) */
/* header {
  opacity: 0;
  visibility: hidden;
} */
</style>