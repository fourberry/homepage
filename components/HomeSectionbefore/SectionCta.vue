<template>
    <BaseSection class="panel cta-section-identifier h-dvh" text-color="#ffffff" :fullWidth="true" :background-image-url="imageUrl" paddingClass="pt-12 md:pt-24">
        <div class="cta-section flex h-full flex-col justify-between pt-8">
            <div class="flex flex-grow items-center justify-center">
                <div class="mx-auto w-full max-w-8xl px-4 sm:px-6 md:px-8 lg:px-12">
                    <div class="grid grid-cols-1 items-center justify-items-center gap-8 sm:gap-12 md:grid-cols-1 md:gap-16">
                        <div class="inquiry text-center md:text-center">
                            <div class="typing-wrapper mb-6 min-h-[100px] sm:mb-8 sm:min-h-[120px] md:min-h-[160px]">
                                <h2 class="break-keep text-xl font-extrabold leading-tight sm:whitespace-nowrap sm:text-4xl md:text-6xl">
                                    {{ displayedLine1 }}
                                    <span class="cursor" v-if="!isLine1Complete"></span>
                                </h2>
                                <h2 class="mb-16 break-keep text-xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
                                    {{ displayedLine2 }}
                                    <span class="cursor" v-if="isLine1Complete && displayedLine2.length < targetLine2.length"></span>
                                </h2>
                            </div>

                            <NuxtLink
                                to="/contact"
                                class="contact-button relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-black text-base font-bold text-white no-underline transition-transform duration-500 ease-in-out sm:h-40 sm:w-40 sm:text-lg md:h-48 md:w-48 md:text-xl"
                            >
                                <span class="button-text relative z-10 block transition-transform duration-500 ease-in-out">
                                    문의하기
                                    <span class="dot absolute top-1/2 -mt-1 ml-1 h-2 w-2 rounded-full bg-primary transition-colors duration-500 ease-in-out"></span>
                                </span>
                                <span class="circle _1"></span>
                                <span class="circle _2"></span>
                                <span class="circle _3"></span>
                                <span class="circle _4"></span>
                                <span class="circle _5"></span>
                                <span class="circle _6"></span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-auto w-full max-w-9xl px-4 sm:px-6 md:px-8 lg:px-12">
                <div class="footer-content my-12 flex flex-col items-center justify-between gap-y-4 border-t border-white/20 pt-8 text-sm text-gray-300 md:flex-row">
                    <div class="flex flex-col items-center text-center md:items-start md:text-left">
                        <div class="mb-1 text-lg font-bold text-white">FOURBERRY</div>
                        <div class="flex flex-col gap-x-4 gap-y-1 text-xs md:flex-row md:items-center">
                            <span>서울특별시 영등포구 양평로 22길 21 코오롱디지털타워 1409호</span>
                            <span>fourberry@fourberry.co.kr</span>
                        </div>
                    </div>
                    <div class="text-center text-xs text-white md:text-right">
                        <p>&copy; 2025 FOURBERRY Inc. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </BaseSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// --- ✨ 타이핑 효과를 위한 스크립트 시작 ✨ ---

const displayedLine1 = ref('')
const displayedLine2 = ref('')
const isLine1Complete = ref(false)
const isTypingStarted = ref(false)

const targetLine1 = '아이디어를 실천하는 힘, 다양한 지식과 경험에서 나옵니다.'
const targetLine2 = '결과로 증명하는 포베리와 지금 함께하세요.'
const typingSpeed = 100
const linePause = 500

// ✨ 1. useRuntimeConfig 훅을 사용해 설정값 가져오기
const config = useRuntimeConfig()
// ✨ 2. baseURL을 포함한 전체 이미지 경로 생성
// nuxt.config.ts의 baseURL이 '/homepage/' 이므로, 'images/aboutUs.jpg' (앞에 / 제외)를 붙입니다.
const imageUrl = `${config.app.baseURL}images/homeCta/cta_1.svg`
// const imageUrl = `${config.app.baseURL}images/cta_2.svg`

function typeLine1() {
    if (displayedLine1.value.length < targetLine1.length) {
        displayedLine1.value += targetLine1.charAt(displayedLine1.value.length)
        setTimeout(typeLine1, typingSpeed)
    } else {
        isLine1Complete.value = true
        setTimeout(typeLine2, linePause)
    }
}

function typeLine2() {
    if (displayedLine2.value.length < targetLine2.length) {
        displayedLine2.value += targetLine2.charAt(displayedLine2.value.length)
        setTimeout(typeLine2, typingSpeed)
    }
}

function startTyping() {
    if (isTypingStarted.value) return
    isTypingStarted.value = true

    displayedLine1.value = ''
    displayedLine2.value = ''
    isLine1Complete.value = false

    typeLine1()
}

defineExpose({
    startTyping,
})

// --- ✨ 타이핑 효과 스크립트 끝 ✨ ---
</script>

<style scoped>
/* ✨ 버튼 기본 스타일 및 회전 설정 */

/* ✨ 내부 점 스타일 */
.contact-button .dot {
    /* Tailwind 클래스로 스타일링 */
}

/* ✨ 원형 테두리 스타일 */
.contact-button .circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* 부모 버튼 크기와 동일하게 */
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box; /* 테두리 포함 크기 계산 */
    pointer-events: none; /* 클릭 방해 방지 */
    /* 애니메이션 적용 */
    animation: gatherAndSpread 1s ease-in-out alternate infinite;
    transition: all 0.5s ease; /* 호버 효과를 위한 트랜지션 */
}

/* ✨ 각 원의 테두리 색상 및 초기 위치 변수 설정 */
.contact-button .circle._1 {
    --circle-y: -1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
}
.contact-button .circle._2 {
    --circle-y: -1rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
}
.contact-button .circle._3 {
    --circle-y: -0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
}
.contact-button .circle._4 {
    --circle-y: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
.contact-button .circle._5 {
    --circle-y: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
.contact-button .circle._6 {
    --circle-y: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
/* 참고: translate 값(--circle-y)은 버튼 크기에 맞춰 조정 필요 */

/* ✨ 원 이동 애니메이션 */
@keyframes gatherAndSpread {
    0% {
        transform: translate(0, 0); /* 초기 위치 (중앙) */
    }
    100% {
        /* 각 원에 설정된 --circle-y 변수만큼 이동 */
        transform: translate(0, var(--circle-y));
    }
}

/* --- ✨ 호버 효과 ✨ --- */
.contact-button:hover {
    background-color: #003da5; /* 상공의 민트색 배경 (#29D4C1) */
    /* Tailwind의 hover:bg-teal-500 대신 사용 */
}

.contact-button:hover .button-text {
    color: #fff; /* 호버 시 텍스트 색상 (필요시 조정) */
}

.contact-button:hover .dot {
    background-color: #fff; /* 호버 시 점 색상 변경 */
}

/* 호버 시 원 애니메이션 멈추고 투명하게 */
.contact-button:hover .circle {
    animation: none; /* 애니메이션 중지 */
    transform: translate(0, var(--circle-y)); /* 최종 위치 유지 */
    border-color: transparent; /* 테두리 투명하게 */
    opacity: 0; /* 부드럽게 사라지도록 (선택 사항) */
}

/* --- 기존 스타일 유지 --- */
.footer-content {
    /* border-top: 1px solid rgba(255, 255, 255, 0.2); */
}
.cursor {
    display: inline-block;
    height: 1em;
    width: 3px;
    background-color: #ffffff;
    margin-left: 8px;
    vertical-align: middle;
    animation: blink 0.7s infinite;
}
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
</style>
