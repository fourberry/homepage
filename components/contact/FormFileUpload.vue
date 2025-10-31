<template>
    <div>
        <label
            :for="id"
            class="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
        </svg>
            {{ label }}
        </label>

        <input
            :id="id"
            class="hidden"
            type="file"
            multiple
            @change="onFileChange"
            ref="fileInputRef"
        />

        <div class="text-xs text-gray-500 mt-2 mb-3">
            * 최대 {{ maxFiles }}개, 파일당 최대 {{ maxSizeMb }}MB까지 첨부
            가능합니다.
        </div>

    <div v-if="modelValue.length > 0" class="mt-4 space-y-2">
        <ul class="divide-y divide-gray-200 border border-gray-200 rounded-md">
            <li
                v-for="(file, index) in modelValue"
                :key="file.name + index"
                class="flex items-center justify-between p-3 text-sm"
            >
                <div class="flex-1 truncate">
                    <span class="font-medium text-gray-900">{{ file.name }}</span>
                    <span class="text-gray-500 ml-2">
                        ({{ formatBytes(file.size) }})
                    </span>
                </div>
                <button
                    @click.prevent="removeFile(index)"
                    class="ml-4 text-red-600 hover:text-red-800 font-medium"
                >
                    삭제
                </button>
            </li>
        </ul>
        <div class="text-right text-sm font-medium text-gray-700">
            총 {{ modelValue.length }}개 / {{ maxFiles }}개 선택
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
    id: string; // input의 id (필수)
    modelValue: File[]; // v-model (필수)
    label?: string; // 라벨 텍스트
    maxFiles?: number; // 최대 파일 개수
    maxSizeMb?: number; // 파일당 최대 용량 (MB)
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
    label: "파일 첨부 (선택)",
    maxFiles: 5,
    maxSizeMb: 10,
});

const emit = defineEmits(["update:modelValue"]);

// <input type="file"> DOM 요소를 참조하기 위한 ref
const fileInputRef = ref<HTMLInputElement | null>(null);

// 파일 크기를 읽기 쉬운 형식 (KB, MB)으로 변환
function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// 파일 선택 시 실행되는 함수
function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    const newFiles = Array.from(target.files);
    const currentFiles = props.modelValue;
    const maxBytes = props.maxSizeMb * 1024 * 1024;

    // 1. 총 파일 개수 제한
    if (currentFiles.length + newFiles.length > props.maxFiles) {
        alert(`파일은 최대 ${props.maxFiles}개까지 첨부할 수 있습니다.`);
        // input 값을 초기화하여 동일한 파일 재선택 가능하게 함
        if (fileInputRef.value) fileInputRef.value.value = "";
        return;
    }

    const validNewFiles: File[] = [];
    const oversizedFiles: string[] = [];

    // 2. 개별 파일 용량 제한
    for (const file of newFiles) {
        if (file.size > maxBytes) {
            oversizedFiles.push(file.name);
        } else {
            validNewFiles.push(file);
        }
    }

    // 용량 초과 파일 알림
    if (oversizedFiles.length > 0) {
        alert(
            `다음 파일의 용량이 ${props.maxSizeMb}MB를 초과합니다:\n- ${oversizedFiles.join("\n- ")}`
        );
    }

    // v-model 업데이트 (기존 파일 + 유효한 새 파일)
    emit("update:modelValue", [...currentFiles, ...validNewFiles]);

    // input 값을 초기화하여 동일한 파일 재선택 가능하게 함
    if (fileInputRef.value) fileInputRef.value.value = "";
}

// 파일 목록에서 특정 파일 제거
function removeFile(index: number) {
    const updatedFiles = [...props.modelValue];
    updatedFiles.splice(index, 1);
    emit("update:modelValue", updatedFiles);
}
</script>

