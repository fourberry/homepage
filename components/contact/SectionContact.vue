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
        <div class="container mx-auto py-28 px-4">
            <div class="flex flex-col gap-15">
                <!-- 문의 상단 -->
                <div
                    v-motion
                    :initial="{ opacity: 0, y: 20 }"
                    :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                    :delay="100"
                    :threshold="0.1"
                    class="flex flex-col md:flex-row justify-between items-center gap-10 border-b-2 border-black">
                    <div class="flex flex-row gap-6 lg:gap-20 md:gap-10 w-full justify-start md:w-auto">
                        <div class="font-extrabold text-lg md:text-3xl whitespace-nowrap leading-9">문의</div>
                        <div class="text-[1.4rem] leading-9">
                            <div class="font-extralight">FOURBERRY</div>
                            <div class="font-black">성공적인 파트너가</div>
                            <div class="font-extralight">기다리고 있습니다.</div>
                            <div class="font-black">지금 바로 문의하세요.</div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col md:flex-row justify-between items-center gap-10">
                            <div>
                                <img 
                                src="/images/contact/bg_contact.png" 
                                class="w-full max-w-sm" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 상담 목록 -->
                <div class="flex flex-col gap-6">
                    <SectionTitle>상담문의</SectionTitle>
                    <!-- 문의 폼 -->
                    <form @submit.prevent="handleSubmit">
                        <ol class="flex flex-col gap-10">
                            <!-- 상담 유형 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <h4 class="font-extrabold mb-1">어떤 유형의 상담을 원하시나요?</h4>
                                <div class="text-xs font-medium mb-3">필수 선택 📌</div>
                                <ul class="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-3 list-none m-0 p-0">
                                    <li v-for="type in consultationTypes" :key="type.id">
                                        <input type="radio" name="rdoType" :id="type.id" :value="type.value" class="hidden peer" v-model="selectedType" />
                                        <label 
                                            :for="type.id"
                                            class="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-2 text-center text-sm font-medium text-gray-700
                                                    hover:bg-gray-50
                                                    peer-checked:border-primary
                                                    peer-checked:bg-primary
                                                    peer-checked:font-bold 
                                                    peer-checked:text-white
                                                    truncate">
                                            {{ type.label }}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <!-- 관심 서비스 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <h4 class="font-extrabold mb-1">관심 서비스를 선택해 주세요.</h4>
                                <div class="text-xs font-medium mb-3">다중 선택 📚</div>
                                <ul class="grid grid-cols-[repeat(auto-fit,_minmax(130px,_1fr))] gap-3 list-none m-0 p-0">
                                    <li v-for="service in favoriteServices" :key="service.id">
                                        <input type="checkbox" :id="service.id" :value="service.value" class="hidden peer" v-model="selectedServices" />
                                        <label 
                                            :for="service.id"
                                            class="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-2 text-center text-sm font-medium text-gray-700
                                                    hover:bg-gray-50
                                                    peer-checked:border-primary
                                                    peer-checked:bg-primary
                                                    peer-checked:font-bold 
                                                    peer-checked:text-white
                                                    truncate">
                                            {{ service.label }}
                                        </label>
                                    </li>
                                </ul>
                            </li>
                            <!-- 예산/일정 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <h4 class="font-extrabold mb-3">예산과 일정은 어떻게 되나요?</h4>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
                                    <li>
                                        <FormSelect
                                            id="budget_select"
                                            placeholder="예산을 선택하세요."
                                            :options="budgetOptions"
                                            v-model="selectedBudget"
                                        />
                                    </li>
                                    <li>
                                        <FormSelect
                                            id="schedule_select"
                                            placeholder="일정을 선택하세요."
                                            :options="scheduleOptions"
                                            v-model="selectedSchedule"
                                        />
                                    </li>
                                </ul>
                            </li>
                            <!-- 기타내용(파일 업로드) -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <h4 class="font-extrabold mb-1">추가로 전달하고 싶은 내용이 있으신가요?</h4>
                                <div class="text-xs font-medium mb-3">구체적인 내용을 적어주시면 이해하는 데 도움이 됩니다.</div>
                                <textarea 
                                    rows="5"
                                    class="block p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary focus:border-primary 
                                        dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-primary dark:focus:border-primary"
                                    placeholder="예: 프로젝트 개요, 요구사항 등"
                                    v-model="textareaContent"
                                    maxlength="4000">
                                </textarea>
                                <div class="text-right text-xs text-gray-500 mt-2 mb-3">
                                    {{ textareaContent.length }}/4000자
                                </div>
                                
                                <FormFileUpload
                                    id="contact_file_upload"
                                    label="파일 첨부 (선택)"
                                    :maxFiles="5"
                                    :maxSizeMb="10"
                                    v-model="selectedFiles"
                                />
                            </li>

                            <!-- 의뢰인 정보 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <h4 class="font-extrabold mb-3">의뢰하시는 분의 정보를 알려주세요.</h4>

                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
                                    <li>
                                        <FormFloatingInput
                                            id="client_company"
                                            label="회사/단체명"
                                            v-model="clientInfo.company"
                                            :maxlength="50"
                                            :required="true"
                                        />
                                    </li>
                                    <li>
                                        <FormFloatingInput
                                            id="client_name"
                                            label="담당자명"
                                            v-model="clientInfo.name"
                                            :maxlength="30"
                                            :required="true"
                                        />
                                    </li>
                                    <li>
                                        <FormFloatingInput
                                            id="client_tel"
                                            label="연락처"
                                            type="tel"
                                            v-model="clientInfo.tel"
                                            :maxlength="11"
                                            :required="true"
                                        />
                                    </li>
                                    <li>
                                        <FormFloatingInput
                                            id="client_email"
                                            label="이메일"
                                            type="email"
                                            v-model="clientInfo.email"
                                            :maxlength="100"
                                            :required="true"
                                        />
                                    </li>
                                </ul>
                            </li>

                            <!-- 개인정보처리방침 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <div class="flex items-center">
                                    <input 
                                        id="link-checkbox" 
                                        type="checkbox" 
                                        v-model="isPrivacyAgreed" 
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    >
                                    <div class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        <a 
                                            href.prevent="" 
                                            @click="openPrivacyModal" class="text-primary dark:text-blue-500 hover:underline">
                                            개인정보보호정책
                                        </a>
                                        
                                        <label for="link-checkbox" class="cursor-pointer">
                                            에 동의합니다.<em class="text-red-600 font-bold">*</em>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <!-- 제출 버튼 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }" 
                                :delay="100"
                                :threshold="0.1"
                            >
                                <BaseButton type="submit" :loading="isLoading">
                                    문의하기
                                </BaseButton>
                            </li>
                        </ol>
                    </form>
                </div>
            </div>
        </div>

        <BaseModal :show="showModal" @close="closeModal">
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-2">
                    {{ modalTitle }}
                </h3>
                <p class="text-sm text-gray-700">
                    {{ modalMessage }}
                </p>
            </div>
        </BaseModal>

        <BaseModal :show="showPrivacyModal" @close="closePrivacyModal">
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">
                    개인정보보호정책
                </h3>
                <div classs="max-h-96 overflow-y-auto text-sm text-gray-600 space-y-4">
                    <p><strong>제1조 (총칙)</strong><br>
                        주식회사 포베리(이하 '회사'라 함)는 이용자의 개인정보를 중요시하며, '개인정보 보호법', '정보통신망 이용촉진 및 정보보호 등에 관한 법률' 등 관련 법령을 준수하고 있습니다.
                    </p>
                    <p><strong>제2조 (수집하는 개인정보의 항목)</strong><br>
                        회사는 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br>
                        - 필수항목 : 담당자명, 연락처, 이메일<br>
                        - 선택항목 : 회사/단체명, 상담내용, 첨부파일
                    </p>
                    <p><strong>제3조 (개인정보의 수집 및 이용목적)</strong><br>
                        회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br>
                        - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산<br>
                        - 콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구지 등 발송<br>
                        - 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달<br>
                        - 마케팅 및 광고에 활용: 신규 서비스(제품) 개발 및 특화, 이벤트 등 광고성 정보 전달, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계
                    </p>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/contact/SectionTitle.vue';
import FormFloatingInput from '@/components/contact/FormFloatingInput.vue';
import FormSelect from '@/components/contact/FormSelect.vue';
import FormFileUpload from '@/components/contact/FormFileUpload.vue';
import BaseButton from '@/components/contact/BaseButton.vue';
import BaseModal from '@/components/common/BaseModal.vue';

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
    { id: 'TYPE_06', value: 'TYPE_06', label: '기타 일반 문의' }
];

const favoriteServices = [
    { id: 'SERVICE_01', value: 'SERVICE_01', label: '통합 인증 (SSO)' },
    { id: 'SERVICE_02', value: 'SERVICE_02', label: '데이터 스크래퍼' },
    { id: 'SERVICE_03', value: 'SERVICE_03', label: '통합 메시징 (UMS)' },
    { id: 'SERVICE_04', value: 'SERVICE_04', label: '쇼핑몰 구축·운영' },
    { id: 'SERVICE_05', value: 'SERVICE_05', label: '주문 관리 (OMS)' },
    { id: 'SERVICE_06', value: 'SERVICE_06', label: '기타 시스템 개발' }
];

const budgetOptions = [
    { value: '1000', label: '1000만원 미만' },
    { value: '5000', label: '5000만원 미만' },
    { value: '10000', label: '1억원 미만' },
    { value: '30000', label: '3억원 미만' },
    { value: '50000', label: '5억원 미만' },
    { value: '70000', label: '7억원 미만' },
    { value: '0', label: '미정' },
];

const scheduleOptions = [
    { value: 'one_month', label: '1개월 이내' },
    { value: 'three_months', label: '3개월 이내' },
    { value: 'six_months', label: '6개월 이내' },
    { value: 'one_year', label: '1년 이내' },
    { value: 'more_than_one_year', label: '1년 이상' },
    { value: 'undecided', label: '미정' },
];

const selectedType = ref(''); // 상담 유형
const selectedServices = ref<string[]>([]); // 관심 서비스
const selectedBudget = ref('');
const selectedSchedule = ref('');
const textareaContent = ref<string>(''); // 추가 내용
const selectedFiles = ref<File[]>([]);
const isLoading = ref(false);
const isPrivacyAgreed = ref(false);

// 의뢰자 정보
const clientInfo = ref({
    company: '',
    name: '',
    tel: '',
    email: '',
});

const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
// 폼 전송 성공/실패 여부를 저장 (모달을 닫을 때 폼을 리셋할지 결정)
const submissionStatus = ref<'success' | 'error' | 'validation' | null>(null);

const showPrivacyModal = ref(false);

const openPrivacyModal = () => {
    showPrivacyModal.value = true;
};
const closePrivacyModal = () => {
    showPrivacyModal.value = false;
};

/**
 * 모달을 띄우는 헬퍼 함수
 */
const openModal = (title: string, message: string, status: 'success' | 'error' | 'validation') => {
    modalTitle.value = title;
    modalMessage.value = message;
    submissionStatus.value = status;
    showModal.value = true;
};

/**
 * 모달 닫기 핸들러
 */
const closeModal = () => {
    showModal.value = false;
    // 폼 전송에 '성공'했을 때만 폼을 리셋합니다.
    if (submissionStatus.value === 'success') {
        resetForm();
    }
    submissionStatus.value = null; // 상태 초기화
};

/**
 * 폼 유효성 검사 함수
 */
const validateForm = (): boolean => {
    // 1. 상담 유형 (필수)
    if (!selectedType.value) {
        openModal('입력 확인', '어떤 유형의 상담을 원하시나요? (필수)', 'validation');
        return false;
    }

    // 2. 의뢰인 정보 (필수)
    // (FormFloatingInput이 자체 유효성 검사를 하지만, 최종 제출 시 한 번 더 확인)
    const telRegex = /^\d{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!clientInfo.value.name.trim()) {
        openModal('입력 확인', '담당자명은 필수입니다.', 'validation');
        return false;
    }
    if (!clientInfo.value.tel.trim() || !telRegex.test(clientInfo.value.tel)) {
        openModal('입력 확인', '유효한 연락처를 입력해주세요. (10~11자리 숫자)', 'validation');
        return false;
    }
    if (!clientInfo.value.email.trim() || !emailRegex.test(clientInfo.value.email)) {
        openModal('입력 확인', '유효한 이메일을 입력해주세요.', 'validation');
        return false;
    }

    // 3. 개인정보처리방침 (필수)
    if (!isPrivacyAgreed.value) {
        openModal('입력 확인', '개인정보보호정책에 동의해주세요.', 'validation');
        return false;
    }

    return true;
};

/**
 * 폼 초기화 함수
 */
const resetForm = () => {
    selectedType.value = '';
    selectedServices.value = [];
    textareaContent.value = '';
    clientInfo.value = { company: '', name: '', tel: '', email: '' };
    selectedBudget.value = '';
    selectedSchedule.value = '';
    selectedFiles.value = [];
    isPrivacyAgreed.value = false;
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

    // 2. FormData 생성
    const formData = new FormData();

    // 2-1. 폼 데이터 (JSON이 아닌 개별 필드로 추가)
    formData.append('type', selectedType.value);
    formData.append('services', JSON.stringify(selectedServices.value)); // 배열은 JSON 문자열로
    formData.append('budget', selectedBudget.value);
    formData.append('schedule', selectedSchedule.value);
    formData.append('content', textareaContent.value);
    formData.append('company', clientInfo.value.company);
    formData.append('name', clientInfo.value.name);
    formData.append('tel', clientInfo.value.tel);
    formData.append('email', clientInfo.value.email);

    // 2-2. 파일 데이터 (다중 파일)
    selectedFiles.value.forEach((file, index) => {
        formData.append('files', file); // 'files'라는 동일한 key로 여러 파일을 추가
    });

    try {
        // 3. API 호출 (Nuxt 3의 $fetch 사용)
        //    - /api/contact는 예시 엔드포인트입니다.
        //    - 실제 Spring Boot/Node.js 서버의 엔드포인트로 변경해야 합니다.
        await $fetch('/api/contact', {
            method: 'POST',
            body: formData,
            // (참고) body가 FormData일 경우 'Content-Type': 'multipart/form-data'
            // 헤더는 브라우저가 자동으로 설정하므로 명시하지 않습니다.
        });

        // 4. 성공 처리
        openModal('전송 완료', '문의가 성공적으로 전송되었습니다. 감사합니다.', 'success');
        resetForm(); // 폼 초기화

    } catch (error) {
        // 5. 실패 처리
        console.error('문의 전송 실패:', error);
        openModal('전송 실패', '문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.', 'error');
    } finally {
        // 6. 로딩 상태 해제
        isLoading.value = false;
    }
};
</script>

<style lang="scss" scoped></style>