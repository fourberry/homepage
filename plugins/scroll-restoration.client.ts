export default defineNuxtPlugin(() => {
    // 브라우저 히스토리의 스크롤 복원 기능을 '수동'으로 설정합니다.
    // 'auto'가 기본값이며, 'manual'로 변경하면
    // 브라우저가 새로고침 시 스크롤 위치를 복원하지 않습니다.
    if (window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
    }
})
