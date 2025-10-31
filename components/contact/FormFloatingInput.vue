<template>
    <div class="relative z-0">
        <input 
            :type="type" 
            :id="id" 
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" 
            :class="[
                isValid 
                ? 'border-gray-300 focus:border-primary' 
                : 'border-red-600 focus:border-red-600'
            ]"
            placeholder=" "
            :value="modelValue"
            @input="handleInput"
            @blur="handleBlur"
            :required="required"
            :maxlength="maxlength"
        />
        <label  
            :for="id" 
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            :class="[
                isValid 
                ? 'text-gray-500 dark:text-gray-400 peer-focus:text-primary' 
                : 'text-red-600 dark:text-red-500 peer-focus:text-red-600'
            ]"
        >
            {{ label }}
            <em v-if="required" class="ml-1 text-red-600 font-bold">*</em>
        </label>

        <div v-if="!isValid && errorMessage" class="text-xs text-red-600 mt-1">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    id: string;         // input의 id (필수)
    label: string;      // label 텍스트 (필수)
    modelValue: string; // v-model 값 (필수)
    type?: string;      // input의 type (선택, 기본값 'text')
    required?: boolean; // 필수 여부 prop (선택)
    maxlength?: number;
}

// props 정의 (type의 기본값은 'text'로 설정)
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    required: false,
    maxlength: undefined,
});

// v-model을 사용하기 위해 'update:modelValue' emit을 정의
const emit = defineEmits(['update:modelValue']);

const isValid = ref(true);
const errorMessage = ref<string | null>(null);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telRegex = /^\d{10,11}$/;

/**
 * 입력 이벤트 핸들러
 * - 연락처(tel)인 경우 숫자만 남도록 필터링합니다.
 * - 입력이 시작되면 에러 상태를 초기화합니다.
 */
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value;

    // 1. (연락처) 숫자만 입력되도록 필터링
    if (props.type === 'tel') {
        value = value.replace(/\D/g, ''); // \D = 숫자가 아닌 모든 문자
        if (props.maxlength && value.length > props.maxlength) {
            value = value.substring(0, props.maxlength);
        }
    }

    if (target.value !== value) {
        target.value = value;
    }

    // 2. 입력 시 유효성 검사 상태 초기화
    isValid.value = true;
    errorMessage.value = null;

    // 3. v-model 업데이트
    emit('update:modelValue', value);
};

/**
 * 포커스 아웃 이벤트 핸들러
 * - 필수(required) 항목이 비어있는지 검사합니다.
 * - 이메일(email) 형식이 올바른지 검사합니다.
 */
const handleBlur = () => {
  const value = props.modelValue.trim(); // 공백 제거 후 검사

    // 1. (필수) 비어있는지 확인
    if (props.required && !value) {
        isValid.value = false;
        errorMessage.value = `${props.label} 항목은 필수입니다.`;
        return;
    }

    // (참고) 값이 비어있고, required가 아닌 경우는 유효성 검사를 통과시킴

    // 2. [수정] 값이 있는 경우에만 추가 유효성 검사 진행
    if (value) {
        // 2-1. (연락처) 형식이 맞는지 확인
        if (props.type === 'tel' && !telRegex.test(value)) {
            isValid.value = false;
            errorMessage.value = '유효한 연락처 형식이 아닙니다. (10~11자리 숫자)';
            return;
        }

        // 2-2. (이메일) 형식이 맞는지 확인
        if (props.type === 'email' && !emailRegex.test(value)) {
            isValid.value = false;
            errorMessage.value = '유효한 이메일 형식이 아닙니다.';
            return;
        }
    }

    // 3. 모든 검사 통과
    isValid.value = true;
    errorMessage.value = null;
};
</script>