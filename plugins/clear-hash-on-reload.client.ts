export default defineNuxtPlugin((nuxtApp) => {
    // 클라이언트 전용 가드 (권장 방식)
    if (!import.meta.client) return;

    // 앱이 브라우저에 마운트된 직후에 실행
    nuxtApp.hook('app:mounted', async () => {
        const router = useRouter();
        const route = useRoute();

        // 라우터가 준비될 때까지 대기 (초기 새로고침 타이밍 이슈 방지)
        await router.isReady();

        // 새로고침 감지 (표준 + 레거시 폴백)
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        const isReload =
            navEntry?.type === 'reload' ||
            (performance as any)?.navigation?.type === 1;

        console.log('isReload : ', isReload);

        // 조건: 홈(/) + 해시 존재 + 새로고침
        if (isReload && route.path === '/' && route.hash) {
            // 해시 제거(히스토리 추가 없음)
            await router.replace({ path: '/', hash: undefined });

            console.log(`1`);
            // 홈 최상단으로 이동
            setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }, 50);

            // 필요 시 디버그 로그
            // console.info('새로고침 감지: 해시 제거 후 홈 상단으로 이동');
        } else if(isReload) {
            console.log(`2`);
            setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }, 50);
        }
    });
});
