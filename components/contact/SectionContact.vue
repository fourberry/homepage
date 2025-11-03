<!-- 
'xs': '320px',
'sm': '640px',
'md': '768px',
'lg': '1024px',
'xl': '1280px',
'2xl': '1536px',
'desktop': '1200px',  
-->
<template>
    <div>
        <div class="container mx-auto px-4 py-14">
            <div class="flex flex-col gap-15">
                <!-- 문의 상단 -->
                <div
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                    :delay="100"
                    :threshold="0.1"
                    class="flex flex-col items-center justify-between gap-10 border-b-2 border-black md:flex-row"
                >
                    <div class="flex w-full flex-row justify-start gap-6 md:w-auto md:gap-10 lg:gap-20">
                        <div class="whitespace-nowrap text-lg font-extrabold leading-9 md:text-3xl">문의</div>
                        <div class="text-[1.4rem] leading-9 md:text-2xl lg:text-3xl">
                            <div class="font-extralight">FOURBERRY</div>
                            <div class="animate-text-shine bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-[size:200%_auto] bg-clip-text font-black text-transparent">성공적인 파트너가</div>
                            <div class="font-extralight">기다리고 있습니다.</div>
                            <div class="animate-text-shine bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 bg-[size:200%_auto] bg-clip-text font-black text-transparent">
                                지금 바로 문의하세요.
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col items-center justify-between gap-10 md:flex-row">
                            <div>
                                <img src="/images/contact/bg_contact.png" class="w-full max-w-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 상담 목록 -->
                <div class="flex flex-col gap-6">
                    <SectionTitle>상담문의</SectionTitle>
                    <!-- 문의 폼 -->
                    <form @submit.prevent="handleSubmit">
                        <ol class="flex flex-col gap-10 md:gap-15">
                            <!-- 상담 유형 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <h4 class="mb-1 font-extrabold md:text-lg">어떤 유형의 상담을 원하시나요?</h4>
                                <div class="mb-3 text-xs font-medium md:text-sm">필수 선택 📌</div>
                                <ul class="m-0 grid list-none grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-3 p-0">
                                    <li v-for="type in consultationTypes" :key="type.id">
                                        <input type="radio" name="rdoType" :id="type.id" :value="type.value" class="peer hidden" v-model="selectedType" />
                                        <label
                                            :for="type.id"
                                            class="flex w-full cursor-pointer items-center justify-center truncate rounded-md border border-gray-300 bg-white px-2 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white md:text-base"
                                        >
                                            {{ type.label }}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <!-- 관심 서비스 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <h4 class="mb-1 font-extrabold md:text-lg">관심 서비스를 선택해 주세요.</h4>
                                <div class="mb-3 text-xs font-medium md:text-sm">다중 선택 📚</div>
                                <ul class="m-0 grid list-none grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-3 p-0">
                                    <li v-for="service in favoriteServices" :key="service.id">
                                        <input type="checkbox" :id="service.id" :value="service.value" class="peer hidden" v-model="selectedServices" />
                                        <label
                                            :for="service.id"
                                            class="flex w-full cursor-pointer items-center justify-center truncate rounded-md border border-gray-300 bg-white px-2 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 peer-checked:border-primary peer-checked:bg-primary peer-checked:font-bold peer-checked:text-white md:text-base"
                                        >
                                            {{ service.label }}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <!-- 예산/일정 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <h4 class="mb-3 font-extrabold md:text-lg">예산과 일정은 어떻게 되나요?</h4>
                                <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
                                    <li>
                                        <FormSelect id="budget_select" placeholder="예산을 선택하세요." :options="budgetOptions" v-model="selectedBudget" />
                                    </li>
                                    <li>
                                        <FormSelect id="schedule_select" placeholder="일정을 선택하세요." :options="scheduleOptions" v-model="selectedSchedule" />
                                    </li>
                                </ul>
                            </li>
                            <!-- 기타내용(파일 업로드) -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <h4 class="mb-1 font-extrabold md:text-lg">추가로 전달하고 싶은 내용이 있으신가요?</h4>
                                <div class="mb-3 text-xs font-medium md:text-sm">구체적인 내용을 적어주시면 이해하는 데 도움이 됩니다.</div>
                                <textarea
                                    rows="5"
                                    class="block w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-primary focus:ring-primary md:text-base dark:border-gray-600 dark:bg-gray-50 dark:text-gray-900 dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
                                    placeholder="예: 프로젝트 개요, 요구사항 등"
                                    v-model="textareaContent"
                                    maxlength="4000"
                                ></textarea>
                                <div class="mb-3 mt-2 text-right text-xs text-gray-500">{{ textareaContent.length }}/4000자</div>

                                <FormFileUpload id="contact_file_upload" label="파일 첨부 (선택)" :maxFiles="5" :maxSizeMb="10" v-model="selectedFiles" />
                            </li>

                            <!-- 의뢰인 정보 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <h4 class="mb-3 font-extrabold md:text-lg">의뢰하시는 분의 정보를 알려주세요.</h4>

                                <ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
                                    <li>
                                        <FormFloatingInput id="client_company" label="회사/단체명" v-model="clientInfo.company" :maxlength="50" :required="true" />
                                    </li>
                                    <li>
                                        <FormFloatingInput id="client_name" label="담당자명" v-model="clientInfo.name" :maxlength="30" :required="true" />
                                    </li>
                                    <li>
                                        <FormFloatingInput id="client_tel" label="연락처" type="tel" v-model="clientInfo.tel" :maxlength="11" :required="true" />
                                    </li>
                                    <li>
                                        <FormFloatingInput id="client_email" label="이메일" type="email" v-model="clientInfo.email" :maxlength="100" :required="true" />
                                    </li>
                                </ul>
                            </li>

                            <!-- 개인정보처리방침 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <div class="flex items-center">
                                    <input
                                        id="link-checkbox"
                                        type="checkbox"
                                        v-model="isPrivacyAgreed"
                                        class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                    />
                                    <div class="ms-2 text-sm font-medium text-gray-900 md:text-base dark:text-gray-300">
                                        <a href.prevent="" @click="openPrivacyModal" class="text-primary hover:underline dark:text-blue-500">개인정보보호정책</a>

                                        <label for="link-checkbox" class="cursor-pointer">
                                            에 동의합니다.
                                            <em class="font-bold text-red-600">*</em>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <!-- 제출 버튼 -->
                            <li v-motion :initial="{ opacity: 0, y: 20 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" :delay="100" :threshold="0.1">
                                <BaseButton type="submit" :loading="isLoading" class="animate-pulse-subtle">문의하기</BaseButton>
                            </li>
                        </ol>
                    </form>
                </div>
            </div>
        </div>

        <BaseModal :show="showModal" @close="closeModal">
            <div class="p-6">
                <h3 class="mb-2 text-lg font-bold text-gray-900">
                    {{ modalTitle }}
                </h3>
                <p class="text-sm text-gray-700">
                    {{ modalMessage }}
                </p>
            </div>
        </BaseModal>

        <BaseModal :show="showPrivacyModal" @close="closePrivacyModal">
            <div class="p-6">
                <h3 class="mb-4 text-lg font-bold text-gray-900">개인정보보호정책</h3>
                <div class="space-y-4 text-sm text-gray-600">
                    <p>
                        <strong>제1조 (총칙)</strong>
                        <br />
                        주식회사 포베리(이하 '회사'라 함)는 이용자의 개인정보를 중요시하며, '개인정보 보호법', '정보통신망 이용촉진 및 정보보호 등에 관한 법률' 등 관련 법령을 준수하고 있습니다.
                    </p>
                    <p>
                        <strong>제2조 (수집하는 개인정보의 항목)</strong>
                        <br />
                        회사는 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        <br />
                        - 필수항목 : 담당자명, 연락처, 이메일
                        <br />
                        - 선택항목 : 회사/단체명, 상담내용, 첨부파일
                    </p>
                    <p>
                        <strong>제3조 (개인정보의 수집 및 이용목적)</strong>
                        <br />
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        <br />
                        - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                        <br />
                        - 콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송
                        <br />
                        - 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
                        <br />
                        - 마케팅 및 광고에 활용: 신규 서비스(제품) 개발 및 특화, 이벤트 등 광고성 정보 전달, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                    </p>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/contact/SectionTitle.vue'
import FormFloatingInput from '@/components/contact/FormFloatingInput.vue'
import FormSelect from '@/components/contact/FormSelect.vue'
import FormFileUpload from '@/components/contact/FormFileUpload.vue'
import BaseButton from '@/components/contact/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'

// 솔루션 도입 문의
// 신규 시스템 구축 의뢰
// 유지보수 및 기술지원
// 사업 제휴 및 파트너십
// 기타 일반 문의
const consultationTypes = [
    { id: 'TYPE_01', value: 'TYPE_01', label: '신규 시스템 구축' },
    { id: 'TYPE_02', value: 'TYPE_02', label: '시스템 유지보수' },
    { id: 'TYPE_03', value: 'TYPE_03', label: '솔루션 도입' },
    { id: 'TYPE_04', value: 'TYPE_04', label: 'AI 도입' },
    { id: 'TYPE_05', value: 'TYPE_05', label: '홈페이지 구축' },
    { id: 'TYPE_06', value: 'TYPE_06', label: '기타 일반 문의' },
]

const favoriteServices = [
    { id: 'SERVICE_01', value: 'SERVICE_01', label: '통합 인증 (SSO)' },
    { id: 'SERVICE_02', value: 'SERVICE_02', label: '데이터 스크래퍼' },
    { id: 'SERVICE_03', value: 'SERVICE_03', label: '통합 메시징 (UMS)' },
    { id: 'SERVICE_04', value: 'SERVICE_04', label: '쇼핑몰 구축·운영' },
    { id: 'SERVICE_05', value: 'SERVICE_05', label: '주문 관리 (OMS)' },
    { id: 'SERVICE_06', value: 'SERVICE_06', label: '기타 시스템 개발' },
]

const budgetOptions = [
    { value: '1000', label: '1000만원 미만' },
    { value: '5000', label: '5000만원 미만' },
    { value: '10000', label: '1억원 미만' },
    { value: '30000', label: '3억원 미만' },
    { value: '50000', label: '5억원 미만' },
    { value: '70000', label: '7억원 미만' },
    { value: '0', label: '미정' },
]

const scheduleOptions = [
    { value: 'one_month', label: '1개월 이내' },
    { value: 'three_months', label: '3개월 이내' },
    { value: 'six_months', label: '6개월 이내' },
    { value: 'one_year', label: '1년 이내' },
    { value: 'more_than_one_year', label: '1년 이상' },
    { value: 'undecided', label: '미정' },
]

const selectedType = ref('') // 상담 유형
const selectedServices = ref<string[]>([]) // 관심 서비스
const selectedBudget = ref('')
const selectedSchedule = ref('')
const textareaContent = ref<string>('') // 추가 내용
const selectedFiles = ref<File[]>([])
const isLoading = ref(false)
const isPrivacyAgreed = ref(false)

// 의뢰자 정보
const clientInfo = ref({
    company: '',
    name: '',
    tel: '',
    email: '',
})

const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
// 폼 전송 성공/실패 여부를 저장 (모달을 닫을 때 폼을 리셋할지 결정)
const submissionStatus = ref<'success' | 'error' | 'validation' | null>(null)

const showPrivacyModal = ref(false)

const openPrivacyModal = () => {
    showPrivacyModal.value = true
}
const closePrivacyModal = () => {
    showPrivacyModal.value = false
}

/**
 * 모달을 띄우는 헬퍼 함수
 */
const openModal = (title: string, message: string, status: 'success' | 'error' | 'validation') => {
    modalTitle.value = title
    modalMessage.value = message
    submissionStatus.value = status
    showModal.value = true
}

/**
 * 모달 닫기 핸들러
 */
const closeModal = () => {
    showModal.value = false
    // 폼 전송에 '성공'했을 때만 폼을 리셋합니다.
    if (submissionStatus.value === 'success') {
        resetForm()
    }
    submissionStatus.value = null // 상태 초기화
}

/**
 * 폼 유효성 검사 함수
 */
const validateForm = (): boolean => {
    // 1. 상담 유형 (필수)
    if (!selectedType.value) {
        openModal('입력 확인', '어떤 유형의 상담을 원하시나요? (필수)', 'validation')
        return false
    }

    // 2. 의뢰인 정보 (필수)
    // (FormFloatingInput이 자체 유효성 검사를 하지만, 최종 제출 시 한 번 더 확인)
    const telRegex = /^\d{10,11}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!clientInfo.value.name.trim()) {
        openModal('입력 확인', '담당자명은 필수입니다.', 'validation')
        return false
    }
    if (!clientInfo.value.tel.trim() || !telRegex.test(clientInfo.value.tel)) {
        openModal('입력 확인', '유효한 연락처를 입력해주세요. (10~11자리 숫자)', 'validation')
        return false
    }
    if (!clientInfo.value.email.trim() || !emailRegex.test(clientInfo.value.email)) {
        openModal('입력 확인', '유효한 이메일을 입력해주세요.', 'validation')
        return false
    }

    // 3. 개인정보처리방침 (필수)
    if (!isPrivacyAgreed.value) {
        openModal('입력 확인', '개인정보보호정책에 동의해주세요.', 'validation')
        return false
    }

    return true
}

/**
 * 폼 초기화 함수
 */
const resetForm = () => {
    selectedType.value = ''
    selectedServices.value = []
    textareaContent.value = ''
    clientInfo.value = { company: '', name: '', tel: '', email: '' }
    selectedBudget.value = ''
    selectedSchedule.value = ''
    selectedFiles.value = []
    isPrivacyAgreed.value = false
}

/**
 * File 객체를 Base64 문자열로 변환하는 헬퍼 함수
 * (data:mime/type;base64, 접두사 제거)
 */
const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            
            if (typeof result !== 'string' || !result.includes(',')) {
                // result가 유효한 data URL 형식이 아닌 경우
                reject(new Error('Failed to read file as base64 data URL.'));
                return;
            }

            // "data:mime/type;base64," 부분을 제거하고 순수 Base64 데이터만 반환
            const base64Content = result.split(',')[1];
            
            if (base64Content) {
                // 성공적으로 base64 문자열을 추출한 경우
                resolve(base64Content);
            } else {
                // 쉼표는 있었지만, 그 뒤에 내용이 없는 비정상적인 경우
                reject(new Error('Failed to extract base64 content from data URL.'));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

/**
 * API 제출 핸들러
 */
const handleSubmit = async () => {
    if (isLoading.value) return; // 중복 제출 방지

    // 1. 유효성 검사
    if (!validateForm()) {
        return; // 유효성 검사 실패 시 중단
    }

    isLoading.value = true;

    try {
        // 2. 첨부 파일 Base64 인코딩 (비동기 처리)
        const attachmentPromises = selectedFiles.value.map(async (file) => {
            const base64Content = await readFileAsBase64(file);
            return {
                filename: file.name,
                mimeType: file.type || 'application/octet-stream', // 파일 타입이 없는 경우 대비
                content: base64Content,
            };
        });
        
        const attachments = await Promise.all(attachmentPromises);

        // 3. 이메일 본문(content)으로 사용할 HTML 생성
        // (가독성을 위해 선택된 값의 'label'을 찾아옵니다)
        const typeLabel = consultationTypes.find(t => t.value === selectedType.value)?.label || 'N/A';
        const serviceLabels = selectedServices.value
            .map(val => favoriteServices.find(s => s.value === val)?.label)
            .filter(Boolean)
            .join(', ') || 'N/A';
        const budgetLabel = budgetOptions.find(b => b.value === selectedBudget.value)?.label || 'N/A';
        const scheduleLabel = scheduleOptions.find(s => s.value === selectedSchedule.value)?.label || 'N/A';
        
        // (XSS 방지를 위해 간단한 텍스트 이스케이프)
        const escapeHTML = (str: string) => str.replace(/[&<>"']/g, match => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[match]!));
        
        const htmlContent = `
            <h1>[포베리] 신규 문의가 접수되었습니다.</h1>
            <p><strong>${escapeHTML(clientInfo.value.company || clientInfo.value.name)}</strong>님으로부터 새로운 문의가 접수되었습니다.</p>
            <hr>
            <h2>문의자 정보</h2>
            <ul>
                <li><strong>회사/단체명:</strong> ${escapeHTML(clientInfo.value.company) || 'N/A'}</li>
                <li><strong>담당자명:</strong> ${escapeHTML(clientInfo.value.name)}</li>
                <li><strong>연락처:</strong> ${escapeHTML(clientInfo.value.tel)}</li>
                <li><strong>이메일:</strong> ${escapeHTML(clientInfo.value.email)}</li>
            </ul>
            <hr>
            <h2>문의 내용</h2>
            <ul>
                <li><strong>상담 유형:</strong> ${escapeHTML(typeLabel)}</li>
                <li><strong>관심 서비스:</strong> ${escapeHTML(serviceLabels)}</li>
                <li><strong>예산:</strong> ${escapeHTML(budgetLabel)}</li>
                <li><strong>일정:</strong> ${escapeHTML(scheduleLabel)}</li>
            </ul>
            <hr>
            <h3>추가 전달 내용</h3>
            <pre style="white-space: pre-wrap; word-wrap: break-word; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${escapeHTML(textareaContent.value) || 'N/A'}</pre>
            <hr>
            <p>첨부파일: ${attachments.length > 0 ? escapeHTML(attachments.map(a => a.filename).join(', ')) : '없음'}</p>
        `;

        // 4. API 요청 본문(Body) 생성
        const requestBody = {
            channel: "email",
            to: "briskly0415@fourberry.co.kr,won567567@fourberry.co.kr,lsj8376@fourberry.co.kr", // 요청 명세에 따름
            subject: `[포베리 문의] ${clientInfo.value.company || clientInfo.value.name} 님 - ${typeLabel}`,
            content: htmlContent,
            data: {
                // (API 명세의 data 객체가 템플릿 변수용이라면, 
                //  여기에도 주요 정보를 넣어주는 것이 좋을 수 있습니다.)
                clientName: clientInfo.value.name,
                clientCompany: clientInfo.value.company,
                inquiryType: typeLabel
            },
            attachments: attachments
        };

        // 5. API 호출 (Nuxt 3의 $fetch 사용)
        await $fetch('https://briskly0714.cafe24.com/lime/api/v1/messages/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'msg_fourberry_clipsight_d7288f6917991ca3c414f15c86535a09'
                // (만약 인증 토큰이 필요하다면 여기에 추가)
                // 'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: requestBody,
        });

        // 6. 성공 처리
        openModal('전송 완료', '문의가 성공적으로 전송되었습니다. 감사합니다.', 'success');

    } catch (error) {
        // 7. 실패 처리
        console.error('문의 전송 실패:', error);
        // CORS 오류가 발생할 수 있습니다.
        // 서버 측에서 'https://briskly0714.cafe24.com' API를 호출하도록 
        // Nuxt 서버 라우트(/server/api/contact.post.ts)를 만드는 것이 더 안정적일 수 있습니다.
        openModal('전송 실패', '문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
    } finally {
        // 8. 로딩 상태 해제
        isLoading.value = false;
    }
};
</script>

<style lang="scss" scoped></style>
