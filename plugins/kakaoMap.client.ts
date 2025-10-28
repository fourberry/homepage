export default defineNuxtPlugin(() => {
  // 1) SSR일 땐 아무 것도 안 함 (클라이언트에서만 실행)
  if (typeof window === 'undefined') {
    return
  }

  // 2) Kakao SDK 로딩을 Promise로 만들어서 동기처럼 다뤄주기
  const loadKakao = () => {
    return new Promise<void>((resolve, reject) => {
      // 이미 로드된 경우
      if ((window as any).kakao?.maps) {
        resolve()
        return
      }

      // 스크립트 태그 동적 주입
      const script = document.createElement('script')
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=495b93902f6ba59378a8aee6ddb98cbe&autoload=false'
      script.async = true

      script.onload = () => {
        const kakao = (window as any).kakao
        if (!kakao) {
          reject(new Error('kakao SDK not loaded'))
          return
        }
        kakao.maps.load(() => {
          resolve()
        })
      }

      script.onerror = (e) => {
        console.error('Kakao SDK load error', e, script.src)
        reject(new Error('Failed to load Kakao Maps SDK'))
      }

      document.head.appendChild(script)
    })
  }

  // 3) Nuxt 플러그인은 여기서 그냥 "동기적으로" return 해야 하니까
  //    우리가 loadKakao()를 먼저 걸어주고,
  //    provide는 무조건 내려주면 됨.

  // 핵심 포인트:
  // - 플러그인 등록 시점에는 kakao가 아직 안 로드됐을 수 있어.
  //   → 그래서 실제로 kakao를 쓰는 컴포넌트에서 await/load 체크를 해주게 할 수도 있고
  //   → 또는 여기서 강제로 동기화해도 돼 (단, Nuxt 타입은 동기 return을 선호함)

  // 방법 A: "lazy 접근자"로 제공하기 (제일 깔끔 / 타입 만족)
  return {
    provide: {
      kakao: {
        load: async () => {
          // 컴포넌트에서 `await $kakao.load()` 한 다음에 써
          await loadKakao()
          return (window as any).kakao
        },
        get raw() {
          // 이미 로드되었으면 바로 kakao 객체 주고,
          // 아니면 undefined
          return (window as any).kakao
        }
      }
    }
  }
})
