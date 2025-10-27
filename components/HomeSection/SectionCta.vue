<script setup lang="ts">
import { ref } from 'vue';

// --- ✨ 타이핑 효과를 위한 스크립트 시작 ✨ ---

const displayedLine1 = ref('');
const displayedLine2 = ref('');
const isLine1Complete = ref(false);
const isTypingStarted = ref(false); // ref 선언은 올바릅니다.

const targetLine1 = "시스템은 사람이 중심이 되어야 합니다.";
const targetLine2 = "지금 '사람 중심' IT를 완성하는 포베리와 함께하세요.";
const typingSpeed = 100;
const linePause = 500;

// (typeLine1, typeLine2 함수는 변경 없음)
function typeLine1() {
  if (displayedLine1.value.length < targetLine1.length) {
    displayedLine1.value += targetLine1.charAt(displayedLine1.value.length);
    setTimeout(typeLine1, typingSpeed);
  } else {
    isLine1Complete.value = true;
    setTimeout(typeLine2, linePause);
  }
}

function typeLine2() {
  if (displayedLine2.value.length < targetLine2.length) {
    displayedLine2.value += targetLine2.charAt(displayedLine2.value.length);
    setTimeout(typeLine2, typingSpeed);
  }
}


// ✨ [수정] startTyping 함수 내부 수정
function startTyping() {
  // 중복 실행 방지 시 .value 사용
  if (isTypingStarted.value) return;
  // 값 변경 시 .value 사용
  isTypingStarted.value = true;

  // (초기화 로직은 동일)
  displayedLine1.value = '';
  displayedLine2.value = '';
  isLine1Complete.value = false;

  // 타이핑 시작 (동일)
  typeLine1();
}

// (defineExpose는 변경 없음)
defineExpose({
  startTyping
});

// --- ✨ 타이핑 효과 스크립트 끝 ✨ ---
</script>

<template>
  <BaseSection
      class="panel h-dvh cta-section-identifier bg-primary"
      text-color="#ffffff">
    <div class="flex flex-col justify-between cta-section h-full py-8 px-4 sm:px-6">

      <div class="grid grid-cols-1 md:grid-cols-1 gap-8 sm:gap-12 md:gap-16 items-center justify-items-center">

        <div class="inquiry text-center md:text-center">

          <div class="typing-wrapper mb-6 sm:mb-8 min-h-[100px] sm:min-h-[120px] md:min-h-[160px]">
            <h2 class="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              {{ displayedLine1 }}
              <span class="cursor" v-if="!isLine1Complete.value"></span>
            </h2>
            <h2 class="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              {{ displayedLine2 }}
              <span class="cursor" v-if="isLine1Complete.value && displayedLine2.length < targetLine2.length"></span>
            </h2>
          </div>

          <NuxtLink
              to="/contact"
              class="contact-button relative inline-flex items-center justify-center
                     bg-black hover:bg-teal-500 text-white
                     w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                     rounded-full
                     no-underline font-bold text-base sm:text-lg md:text-xl
                     transition-colors duration-300 ease-in-out">

            <span class="relative z-10">문의하기</span>
            <span class="circle _1"></span>
            <span class="circle _2"></span>
            <span class="circle _3"></span>
            <span class="circle _4"></span>
            <span class="circle _5"></span>
            <span class="circle _6"></span>
          </NuxtLink>
        </div>
      </div>

      <div class="footer-content border-t border-white/20 mt-12 pt-8 text-gray-300 text-sm flex flex-col md:flex-row justify-between items-center gap-y-4">
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <div class="font-bold text-lg text-white mb-1">
            FOURBERRY
          </div>
          <div class="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-1 text-xs">
            <span>Addr: 서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호</span>
            <span>Email: damon@fourberry.co.kr</span>
          </div>
        </div>
        <div class="text-center md:text-right text-xs text-white">
          <p>&copy; 2025 FOURBERRY Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<style scoped>
/* ✨ 새 애니메이션 키프레임 정의 */
/* ✨ 새 애니메이션 키프레임 정의: 커졌다가 원래대로 돌아오며 투명해짐 */
@keyframes pulse-outward {
  0% {
    transform: translate(-50%, -50%) scale(1); /* 시작: 버튼 크기, 약간 불투명 */
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.0); /* 종료: 더 커진 상태, 완전히 투명 */
    opacity: 0;
  }
}

/* ✨ 버튼 기본 스타일 수정 */
.contact-button {
  /* position: relative; */ /* Tailwind 'relative' 클래스 사용 */
  /* overflow: hidden; */ /* Tailwind 'overflow-hidden' 클래스 사용 */
  /* width, height, border-radius 등은 Tailwind 클래스로 지정 */
  /* Flex centering 은 Tailwind 'inline-flex items-center justify-center' 사용 */
}

/* ✨ 애니메이션 원 스타일 변경 */
.contact-button .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%; /* 버튼과 동일한 크기 */
  height: 100%;
  background-color: transparent; /* 배경 없음 */
  /* ✨ 테두리 두께 1px로 변경 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1); /* 중앙 정렬, 초기 크기 100% */
  /* ✨ 애니메이션 이름, 지속시간, 타이밍 함수 변경 */
  animation: pulse-outward 2.5s infinite linear; /* 새 이름, linear 타이밍 */
  opacity: 0; /* 초기 상태는 투명 (애니메이션 시작 시 0% opacity로 설정됨) */
  pointer-events: none;
}

/* ✨ 각 원에 애니메이션 지연 시간 적용 (간격 조정) */
.contact-button ._1 { animation-delay: 0s; }
.contact-button ._2 { animation-delay: 0.4s; } /* 간격 늘림 */
.contact-button ._3 { animation-delay: 0.8s; }
.contact-button ._4 { animation-delay: 1.2s; }
.contact-button ._5 { animation-delay: 1.6s; }
.contact-button ._6 { animation-delay: 2.0s; }

.footer-content {
  /* border-top: 1px solid rgba(255, 255, 255, 0.2); */ /* Tailwind border 클래스 사용 */
}
/* --- ✨ 타이핑 커서 애니메이션 CSS 시작 ✨ --- */

.cursor {
  display: inline-block;
  /* ✨ 커서의 높이를 글꼴에 맞게 1em으로 설정 */
  height: 1em;
  /* ✨ 커서의 두께 */
  width: 3px;
  /* ✨ 커서 색상 (텍스트 색상과 동일하게) */
  background-color: #ffffff;
  /* ✨ 텍스트 옆에 약간의 여백 */
  margin-left: 8px;
  /* ✨ 텍스트와 세로 정렬 */
  vertical-align: middle;
  /* ✨ 'blink' 애니메이션 적용 */
  animation: blink 0.7s infinite;
}

/* 깜빡임 키프레임 */
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* --- ✨ 타이핑 커서 애니메이션 CSS 끝 ✨ --- */
</style>