<template>
    <Teleport to="body">
        <Transition name="modal-fade">
        <div 
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
                    flex flex-col
                    max-h-[calc(100vh-3rem)]
                ">
                <div class="overflow-y-auto">
                    <slot />
                </div>
            
                <div class="mt-auto flex-shrink-0 border-t border-gray-200">
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
        </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { watchEffect, onUnmounted } from 'vue';

interface Props {
    show: boolean;
}

const props = defineProps<Props>();
defineEmits(['close']);

// 스크롤 잠금 로직

// watchEffect는 props.show가 변경될 때마다 자동으로 실행됩니다.
watchEffect(() => {
    if (process.client) {
        const htmlElement = document.documentElement; // <html> 태그

        if (props.show) {
            // 모달이 보일 때: <html>의 스크롤을 숨깁니다.
            htmlElement.style.overflow = 'hidden';
        } else {
            // 모달이 숨겨질 때: <html>의 스크롤을 원래대로 복원합니다.
            htmlElement.style.overflow = ''; 
        }
    }
});

// onUnmounted: 컴포넌트가 사라질 때 (예: 페이지 이동 시)
// 스크롤이 잠겨있는 상태로 남지 않도록 보장합니다.
onUnmounted(() => {
    if (process.client) {
        document.documentElement.style.overflow = '';
    }
});

// --- 스크롤 잠금 로직 끝 ---

</script>

<style>
/* (스타일 태그는 변경 없음) */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>