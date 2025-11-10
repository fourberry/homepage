<template>
    <div class="relative h-screen overflow-hidden">
        <!-- Stage 1 -->
        <section ref="stage1" class="absolute inset-0 flex items-center justify-center">
            <div ref="stage1Bg" class="hero-background-image"></div>
            <div ref="stage1Content" class="hero-content relative z-10 text-center">
                <h1 ref="stage1Title" class="break-keep text-[clamp(1.5rem,5vw,3rem)] font-bold leading-[1.4]">
                    한 발 앞선 IT 서비스로
                    <br />
                    고객의 경험과 가치를 우선합니다.
                </h1>
                <p ref="stage1Subtitle" class="hero-subtitle mt-4 break-keep text-[clamp(0.9rem,3vw,1.2rem)] opacity-80">making sweet and sour software</p>
            </div>
        </section>

        <!-- Stage 2 -->
        <section ref="stage2" class="absolute inset-0 h-screen min-h-[560px]">
            <div ref="stage2BgWrapper" class="absolute inset-0 overflow-hidden">
                <img src="/images/aboutMain.jpg" alt="FOURBERRY background" class="h-full w-full object-cover object-[50%_40%]" />
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
            </div>

            <!-- ✅ 좌하단 고정 앵커 (같은 시작 세로선 유지) -->
            <div ref="stage2TextWrapper" class="absolute inset-0">
                <div class="absolute bottom-[clamp(40px,10vh,96px)] left-[clamp(16px,5vw,72px)] text-left text-white">
                    <h1 class="h1-custom-font text-[clamp(36px,9vw,90px)] font-black leading-[1.02] tracking-[-0.04em]">
                        WE'RE
                        <br />
                        <span ref="stage2Typing" class="typing inline-block min-w-[10ch] text-white"></span>
                    </h1>

                    <p
                        class="<!-- 모바일일 때 작게 --> <!-- sm(640px 이상)부터 기존 크기 --> mt-[clamp(px,1.5vw,16px)] text-[clamp(11px,3.0vw,18px)] font-semibold leading-snug tracking-tight text-gray-300 sm:text-[clamp(14px,1.8vw,22px)]"
                    >
                        고객 만족을 넘어 고객 감동을 제공하는 IT 최고의 기업이 되겠습니다.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

// Stage 1 refs
const stage1 = ref(null)
const stage1Bg = ref(null)
const stage1Content = ref(null)
const stage1Title = ref(null)
const stage1Subtitle = ref(null)

// Stage 2 refs
const stage2 = ref(null)
const stage2BgWrapper = ref(null)
const stage2TextWrapper = ref(null)
const stage2Typing = ref(null)

// ✅ [추가] emit 정의
const emit = defineEmits(['animationComplete'])

const text = 'FOURBERRY.'

function typeAndDelete(el, text, speed = 250, delay = 3000) {
    let i = 0
    let isDeleting = false

    function typing() {
        if (!el) return
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

function startUnifiedAnimation() {
    const masterTl = gsap.timeline({
        // ✅ [추가] 타임라인 전체가 완료되면 스크롤 잠금 해제
        onComplete: () => {
            emit('animationComplete')
        },
    })

    // === Stage 1 (0~4s)
    masterTl
        .set(stage1.value, { autoAlpha: 1, zIndex: 2 })
        .set(stage2.value, { autoAlpha: 0, zIndex: 1 })
        .set(stage1Title.value, { autoAlpha: 0, y: 40 })
        .set(stage1Subtitle.value, { autoAlpha: 0, y: 40 })
        .set(stage1Bg.value, { clipPath: 'ellipse(0% 0% at 50% 100%)', opacity: 0 })

        // Stage 2 초기 상태
        .set(stage2.value, { autoAlpha: 0, zIndex: 1 }) // stage2는 처음에 숨김
        .set(stage2BgWrapper.value, { autoAlpha: 0, clipPath: 'ellipse(0% 0% at 50% 100%)' }) // stage2 배경도 숨김
        .set(stage2TextWrapper.value, { opacity: 0, y: 20 }) // (onMounted에서도 하지만 여기서도 명시)

        // Stage 1 제목 등장
        .to(
            stage1Title.value,
            {
                duration: 3,
                y: 0,
                autoAlpha: 1,
                ease: 'power3.out',
            },
            0.2
        )

        // Stage 1 부제목 등장
        .to(
            stage1Subtitle.value,
            {
                duration: 3,
                y: 0,
                autoAlpha: 1,
                ease: 'power3.out',
            },
            '<0.3'
        )

        // Stage 1 배경 이미지 등장
        // .to(
        //     stage1Bg.value,
        //     {
        //         duration: 2.5,
        //         clipPath: 'ellipse(150% 150% at 50% 100%)',
        //         opacity: 1,
        //         ease: 'power2.inOut',
        //     },
        //     '<0.2'
        // )

        // Stage 1 텍스트 색상 변경 (흰색으로)
        .to(
            stage1Content.value,
            {
                duration: 2.0,
                color: '#ffffff',
                ease: 'power2.inOut',
            },
            '-=2'
        )

    // 1초 정도 머무르기
    // .to({}, { duration: 0.1 })

    // === Stage 1 -> Stage 2 전환 (4초 ~ 5초) ===
    masterTl
        // z-index 변경
        .set(stage1.value, { zIndex: 1 })
        .set(stage2.value, { zIndex: 2, autoAlpha: 1 })

        // Stage 1 페이드아웃
        .to(stage1.value, {
            duration: 0.5,
            autoAlpha: 0,
            ease: 'power2.inOut',
        })

    // === Stage 2 애니메이션 (5초 ~) ===
    masterTl
        // Stage 2 배경 이미지 등장
        .to(
            stage2BgWrapper.value,
            {
                duration: 1.5, // 배경은 2초에 걸쳐 천천히
                autoAlpha: 1,
                clipPath: 'ellipse(150% 150% at 50% 100%)',
                ease: 'power3.inOut',
            },
            '<' // '<' : 바로 앞의 애니메이션(stage1.value fadeout)과 동시에 시작
        )

        // Stage 2 텍스트 등장
        .to(
            stage2TextWrapper.value,
            {
                duration: 1.2,
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                onComplete: () => {
                    // 타이핑 애니메이션 시작
                    typeAndDelete(stage2Typing.value, text, 250, 3000)
                },
            },
            '-=1.0'
        )
}

onMounted(() => {
    // 통합 애니메이션 시작
    startUnifiedAnimation()
})

onUnmounted(() => {})
</script>

<style scoped>
/* Stage 1 */
.hero-background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center 70%;
    background-image: url('https://images.unsplash.com/photo-1504177847824-d075f5706770?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548');
    z-index: 0;
}

.hero-content {
    position: relative;
    z-index: 1;
}

/* Stage 2 */
.h1-custom-font {
    font-family: 'Pretendard', 'Noto Sans KR', 'system-ui', sans-serif;
    -webkit-text-stroke: 1.4px white;
    text-stroke: 1.4px white;
    color: white;
}

/* 타이핑 커서: span 전체가 아니라 .typing에만 적용 */
.typing::after {
    content: '';
    display: inline-block;
    margin-left: 0.05em;
    width: 0.12em;
    height: 0.95em;
    background-color: white;
    vertical-align: middle;
    animation: blink 0.8s steps(1) infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
