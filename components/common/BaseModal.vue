<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @mousedown.self="$emit('close')"
      >
        <div 
          class="absolute inset-0 bg-black bg-opacity-50"
          @mousedown.self="$emit('close')"
        ></div>

        <div 
          class="
            relative z-10 w-full max-w-md 
            bg-white rounded-lg shadow-xl 
            overflow-hidden
          "
        >
          <slot />

          <slot name="footer">
            <div class="px-6 py-4 bg-gray-50 text-right">
              <button
                @click="$emit('close')"
                class="
                  px-4 py-2 bg-primary text-white 
                  rounded-md font-semibold text-sm
                  hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                "
              >
                확인
              </button>
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean; // v-if="show"
}

defineProps<Props>();
defineEmits(['close']);
</script>

<style>
/* <Transition name="modal-fade">와 연결되는
  Fade-in / Fade-out 애니메이션 클래스입니다.
  (Tailwind CSS가 아닌 일반 CSS로 전역에 정의하는 것이 좋습니다.
   혹은 <style lang="scss"> 안에 :global {...} 로 정의할 수 있습니다.)
*/
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>