<template>
  <section
      class="relative min-h-[560px] overflow-hidden
           h-screen" >
    <div
        ref="bgImageWrapper"
        class="absolute inset-0 overflow-hidden"
    >
      <img
          src="/images/aboutMain.jpg"
          alt="FOURBERRY background"
          class="w-full h-full object-cover object-[50%_40%]"
      />
    </div>
    <div class="absolute inset-0 bg-black/45"></div>
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

    <div ref="textWrapper" class="absolute inset-0 flex items-end justify-start">
      <div class="text-white px-4 pb-16 md:px-16 md:pb-28 text-left">
        <h1
            class="font-black tracking-[-0.04em] leading-[0.95]
                 text-[clamp(45px,10vw,150px)] h1-custom-font"
        >
          WE’RE<br />
          <span ref="fourberry" class="inline-block min-w-[10ch] text-white"></span>
        </h1>

        <p class="mt-4 text-gray-400 text-[clamp(16px,2.2vw,28px)] font-semibold">
          고객 만족을 넘어 고객 감동을 제공하는 IT 최고의 기업이 되겠습니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap' // GSAP를 가져옵니다.

const fourberry = ref(null)
const text = 'FOURBERRY.'

const bgImageWrapper = ref(null)
const textWrapper = ref(null) // [3] 텍스트 래퍼 ref 추가


function typeAndDelete(el, text, speed = 250, delay = 3000) {
  // ... (기존 타이핑 함수 내용은 동일) ...
  let i = 0
  let isDeleting = false
  function typing() {
    if (!isDeleting && i < text.length) {
      el.innerHTML += text.charAt(i)
      i++
      setTimeout(typing, speed)
    } else if (!isDeleting && i === text.length) {
      isDeleting = true
      setTimeout(typing, delay)
    } else if (isDeleting && i > 0) {
      el.innerHTML = text.substring(0, i - 1)
      i--
      setTimeout(typing, speed / 1.5)
    } else if (isDeleting && i === 0) {
      isDeleting = false
      setTimeout(typing, 1000)
    }
  }
  typing()
}

// [4] onMounted 로직을 GSAP 타임라인으로 전체 수정
onMounted(() => {
  if (!bgImageWrapper.value || !textWrapper.value || !fourberry.value) {
    return
  }

  // 1. 텍스트를 초기에 숨김 (약간 아래로)
  gsap.set(textWrapper.value, { opacity: 0, y: 20 })

  // 2. GSAP 타임라인 생성
  const tl = gsap.timeline();

  // 3. (애니메이션 1) 배경 이미지 애니메이션
  tl.from(bgImageWrapper.value, {
    duration: 1.8,
    clipPath: 'inset(100% 0% 0% 0%)',
    ease: 'power4.out',
    delay: 0.8
  });

  // 4. (애니메이션 2) 텍스트 wrapper를 부드럽게 표시
  //    (배경 애니메이션이 끝나기 1초 전에 시작)
  tl.to(textWrapper.value, {
    duration: 1.2,
    opacity: 1,
    y: 0, // 원래 위치로
    ease: 'power2.out',
    // 5. (애니메이션 3) 텍스트가 모두 표시된 후, 타이핑 시작
    onComplete: () => {
      const el = fourberry.value
      typeAndDelete(el, text, 250, 3000)
    }
  }, "-=1.0"); // 앞 애니메이션과 1초 겹치게 시작
})
</script>

<style scoped>
/* :root ... */
/* .h1-custom-font ... */
/* span::after ... */
/* @keyframes blink ... */
/* (기존 <style> 내용은 동일하게 유지) */

:root { /* 헤더 높이 한번에 관리 */
  --header-h: 80px; /* 실제 헤더 높이에 맞춰 수정 */
}

/* 제목 강조 */
.h1-custom-font{
  font-family: 'Pretendard','Noto Sans KR','system-ui',sans-serif;
  -webkit-text-stroke: 1.7px white;
  text-stroke: 1.7px white;
  color: white;
}

/* 커서 효과 */
span::after{
  content:'';
  display:inline-block;
  margin-left:0.05em;
  width:0.12em; height:0.95em;
  background-color:white;
  vertical-align:middle;
  animation:blink .8s steps(1) infinite;
}
@keyframes blink{50%{opacity:0}}
</style>