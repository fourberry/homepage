// ~/types/project.ts

export interface Project {
    id: string
    gradientClasses: string
    bgColor: string // ✅ 모달 배경색상 추가
    imageSrc: string
    imageAlt: string
    dates: string[]
    title: string
    clientName: string
    imageStyle: string
    smallH3: boolean
    // ✅ PPT 내용을 기반으로 한 상세 정보 객체 추가
    details: {
        client: string
        title: string
        period: string
        overview: string
        images?: string[] // 모달에 표시할 스크린샷 이미지 경로 배열
    }
}
