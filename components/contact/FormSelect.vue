<template>
    <select 
        :id="id"
        class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        :class="modelValue ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
        <option value="" selected>{{ placeholder }}</option>

        <option 
            v-for="option in options" 
            :key="option.value" 
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<script setup lang="ts">
// Option 객체의 타입을 정의합니다.
interface SelectOption {
    value: string | number;
    label: string;
}

interface Props {
    id: string;                     // select의 id (필수)
    modelValue: string | number;    // v-model 값 (필수)
    options: SelectOption[];        // 옵션 배열 (필수)
    placeholder: string;            // 첫 번째 기본 옵션 텍스트 (필수)
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>