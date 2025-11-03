<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mapContainerRef = ref<HTMLDivElement | null>(null)

const { $kakao } = useNuxtApp()

onMounted(async () => {
    // 1. Kakao SDK 준비 완료를 기다림
    const kakao = await $kakao.load()
    // 이제 kakao.maps는 확실히 존재함

    // 2. LatLng 등 객체 생성
    const center = new kakao.maps.LatLng(37.5665, 126.978) // 서울시청 근처 예시

    const options = {
        center,
        level: 3,
    }

    // 3. 실제 지도 생성 (ref된 div에 렌더)
    if (mapContainerRef.value) {
        const map = new kakao.maps.Map(mapContainerRef.value, options)

        // 마커도 예시로 하나 찍어줄 수 있어
        new kakao.maps.Marker({
            position: center,
            map,
        })
    } else {
        console.error('mapContainerRef is null')
    }
})
</script>

<template>
    <div ref="mapContainerRef" class="h-[300px] w-full rounded-xl border border-gray-200 shadow" />
</template>
