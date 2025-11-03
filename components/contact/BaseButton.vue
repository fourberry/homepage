<template>
    <button
        :type="type"
        class="flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 font-bold text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:mx-auto md:w-60 md:text-lg"
        :class="[loading ? 'cursor-not-allowed bg-opacity-70' : 'hover:opacity-90']"
        :disabled="loading"
    >
        <svg v-if="loading" class="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <span v-if="loading">전송 중...</span>
        <slot v-else />
    </button>
</template>

<script setup lang="ts">
interface Props {
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean // [추가] 로딩 상태 prop
}

withDefaults(defineProps<Props>(), {
    type: 'submit',
    loading: false, // [추가] 기본값 false
})
</script>
