<script setup lang="ts">
defineProps({
  backgroundImageUrl: {
    type: String,
    required: false,
    default: '',
  },
  // 텍스트 색상을 위한 prop 추가 (선택 사항)
  textColor: {
    type: String,
    default: 'inherit', // 기본값은 부모 요소 색상 상속
  },
  overlayOpacity: {
    type: Number,
    default: 0.5, // 기본값 50%
    // 값의 유효성 검사 (0과 1 사이)
    validator: (value: number) => value >= 0 && value <= 1,
  },
  fullWidth: { // ✨ fullWidth prop은 그대로 둡니다.
    type: Boolean,
    default: false,
  },
  paddingClass: {
    type: String,
    default: 'py-12 md:py-24', // ✨ 2. 기본값을 하드코딩했던 값으로 설정
  }
})
</script>

<template>
  <section
      class="relative section-container"
      :class="paddingClass"
      :style="{ color: textColor }"
  >
    <div
        v-if="backgroundImageUrl"
        class="background-image"
        :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})), url('${backgroundImageUrl}')` }"
    ></div>

    <div
        class="relative z-10 h-full"
        :class="{ 'max-w-8xl mx-auto px-4 md:px-8': !fullWidth }"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
/* 배경 이미지 스타일 추가 */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0; /* 콘텐츠 뒤로 보내기 */
}
</style>