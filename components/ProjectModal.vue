<template>
    <div ref="modalOverlayRef" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" @click.self="close">
        <div ref="modalContentRef" class="relative w-full max-w-4xl rounded-lg shadow-xl" :style="{ backgroundColor: projectBgColor }" style="max-height: 90vh">
            <button
                @click="close"
                class="h-13 w-13 absolute right-1 top-1 z-10 flex items-center justify-center text-3xl font-black text-white transition-all duration-200 ease-in-out"
                aria-label="닫기"
            >
                <NuxtImg src="/images/homeSiSm/x.svg" alt="닫기" class="h-10 w-10 brightness-0 invert" />
            </button>

            <div v-if="project" class="overflow-y-auto rounded-lg" style="max-height: 90vh">
                <header :class="project.gradientClasses" class="flex flex-col items-center justify-center p-8 pt-12 text-center text-white md:flex-row md:justify-between md:text-left">
                    <div class="md:w-3/5">
                        <p class="mb-2 text-sm font-bold uppercase tracking-widest opacity-80">
                            {{ project.details.client }}
                        </p>
                        <h2 class="mb-2 whitespace-pre-line break-keep text-3xl font-bold md:text-4xl">
                            {{ project.details.title }}
                        </h2>
                        <p class="text-lg font-medium opacity-90">
                            {{ project.details.period }}
                        </p>
                    </div>
                    <div class="mt-6 aspect-video w-full overflow-hidden rounded-lg md:mt-0 md:w-2/5">
                        <NuxtImg :src="project.imageSrc" :alt="project.imageAlt" class="block" :class="getImageClasses(project)" />
                    </div>
                </header>

                <section class="bg-white p-8 text-gray-900">
                    <h3 class="mb-4 text-xl font-bold">Project Overview</h3>
                    <p class="whitespace-pre-line text-base leading-relaxed text-gray-600">
                        {{ project.details.overview }}
                    </p>
                </section>

                <!--                <section v-if="project.details.images?.length" class="bg-gray-50 p-8">-->
                <!--                    <h3 class="mb-4 text-xl font-bold text-gray-900">Screenshots</h3>-->
                <!--                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">-->
                <!--                        <div v-for="(imgSrc, index) in project.details.images" :key="index" class="overflow-hidden rounded-lg border border-gray-200">-->
                <!--                            <img :src="imgSrc" alt="Project screenshot" class="h-full w-full object-cover" />-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </section>-->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types/project' // ✅ 공통 타입 Import

// ✅ defineProps 수정
const props = defineProps<{
    project: Project | null
    projectBgColor: string
}>()

const emit = defineEmits(['close'])

const modalOverlayRef = ref<HTMLElement | null>(null)
const modalContentRef = ref<HTMLElement | null>(null)

const close = () => {
    emit('close')
}

// ✅ Project 타입이 null일 수 있으므로, project가 있을 때만 호출되도록 보장
const getImageClasses = (project: Project) => {
    switch (project.imageStyle) {
        case 'cuckoo':
            return 'w-full h-full object-cover'
        case 'lotto':
            return 'w-full h-full object-cover'
        case 'auto':
            return 'w-full h-full object-cover object-top'
        case 'knsu':
            return 'w-full h-full object-cover'
        case 'withfresh':
            return 'w-full h-full object-cover'
        default:
            return 'w-full h-full object-cover object-top'
    }
}

// 모달이 열릴 때 애니메이션 (부모 컴포넌트에서 제어할 수도 있음)
// 여기서는 부모가 v-if로 제어하므로 이 컴포넌트 자체의 onMounted는 사용하지 않음.
// GSAP 애니메이션을 추가하려면 v-if 대신 v-show를 사용하고 watch를 사용해야 합니다.
// (제공해주신 코드에는 애니메이션 로직이 없으므로 일단 생략합니다.)

defineExpose({
    modalOverlayRef,
    modalContentRef,
})
</script>

<style scoped></style>
