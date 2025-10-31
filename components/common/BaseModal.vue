<template>
    <Teleport to="body">
        <Transition name="modal-fade">
        <div 
            v-if="show"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
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
                    max-h-[calc(100dvh-3rem)]
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
import { useScrollLock } from '@vueuse/core';
import { onMounted, ref, watchEffect } from 'vue';

interface Props {
    show: boolean;
}

const props = defineProps<Props>();
defineEmits(['close']);

const htmlEl = ref<HTMLElement | null>(null);
const isLocked = useScrollLock(htmlEl);

onMounted(() => {
    htmlEl.value = document.documentElement;
});

watchEffect(() => {
    isLocked.value = props.show;
});

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