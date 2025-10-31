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
                    :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                    :delay="0"
                    :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="150"
                                :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="200"
                                :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="250"
                                :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="300"
                                :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="350"
                                :once="true"
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
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="400"
                                :once="true"
                                :threshold="0.1"
                            >
                                <div class="flex items-center">
                                    <input id="link-checkbox" type="checkbox" v-model="isPrivacyAgreed" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><a href="#" class="text-primary dark:text-blue-500 hover:underline">개인정보보호정책</a>에 동의합니다.<em class="text-red-600 font-bold">*</em></label>
                                </div>
                            </li>
                            <!-- 제출 버튼 -->
                            <li
                                v-motion
                                :initial="{ opacity: 0, y: 20 }"
                                :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
                                :delay="450"
                                :once="true"
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
    </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/contact/SectionTitle.vue';
import FormFloatingInput from '@/components/contact/FormFloatingInput.vue';
import FormSelect from '@/components/contact/FormSelect.vue';
import FormFileUpload from '@/components/contact/FormFileUpload.vue';
import BaseButton from '@/components/contact/BaseButton.vue';

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

/**
 * 폼 유효성 검사 함수
 */
const validateForm = (): boolean => {
    // 1. 상담 유형 (필수)
    if (!selectedType.value) {
        alert('어떤 유형의 상담을 원하시나요? (필수)');
        return false;
    }

    // 2. 의뢰인 정보 (필수)
    // (FormFloatingInput이 자체 유효성 검사를 하지만, 최종 제출 시 한 번 더 확인)
    const telRegex = /^\d{10,11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!clientInfo.value.name.trim()) {
        alert('담당자명은 필수입니다.');
        return false;
    }
    if (!clientInfo.value.tel.trim() || !telRegex.test(clientInfo.value.tel)) {
        alert('유효한 연락처를 입력해주세요. (10~11자리 숫자)');
        return false;
    }
    if (!clientInfo.value.email.trim() || !emailRegex.test(clientInfo.value.email)) {
        alert('유효한 이메일을 입력해주세요.');
        return false;
    }

    // 3. 개인정보처리방침 (필수)
    if (!isPrivacyAgreed.value) {
        alert('개인정보보호정책에 동의해주세요.');
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
        alert('문의가 성공적으로 전송되었습니다. 감사합니다.');
        resetForm(); // 폼 초기화

    } catch (error) {
        // 5. 실패 처리
        console.error('문의 전송 실패:', error);
        alert('문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // 6. 로딩 상태 해제
        isLoading.value = false;
    }
};
</script>

<style lang="scss" scoped></style>