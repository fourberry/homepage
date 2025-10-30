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
                <div class="flex flex-col md:flex-row justify-between items-center gap-10 border-b-2 border-black">
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
                    <h3 class="font-medium relative isolate w-fit highlight-title">상담문의</h3>
                    <!-- 문의 폼 -->
                    <form>
                        <ol class="flex flex-col gap-10">
                            <!-- 상담 유형 -->
                            <li>
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
                            <li>
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
                            <li>
                                <h4 class="font-extrabold mb-3">예산과 일정은 어떻게 되나요?</h4>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
                                    <li>
                                        <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                            <option selected>예산을 선택하세요.</option>
                                            <option value="500">500만원 미만</option>
                                            <option value="5000">5000만원 미만</option>
                                            <option value="10000">1억원 미만</option>
                                            <option value="30000">3억원 미만</option>
                                            <option value="50000">5억원 미만</option>
                                            <option value="70000">7억원 미만</option>
                                            <option value="0">미정</option>
                                        </select>
                                    </li>
                                    <li>
                                        <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                            <option selected>일정을 선택하세요.</option>
                                            <option value="one_month">1개월 이내</option>
                                            <option value="three_months">3개월 이내</option>
                                            <option value="six_months">6개월 이내</option>
                                            <option value="one_year">1년 이내</option>
                                            <option value="more_than_one_year">1년 이상</option>
                                            <option value="undecided">미정</option>
                                        </select>
                                    </li>
                                </ul>
                            </li>
                            <!-- 기타내용(파일 업로드) -->
                            <li>
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
                                
                                <label
                                    for="file_input"
                                    class="flex w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-2 text-center text-sm font-medium text-gray-700
                                        hover:bg-gray-50"
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
                                    파일 첨부 (선택)
                                </label>

                                <input
                                    class="hidden"
                                    id="file_input"
                                    type="file"
                                />
                            </li>

                            <!-- 의뢰인 정보 -->
                            <li>
                                <h4 class="font-extrabold mb-3">의뢰하시는 분의 정보를 알려주세요.</h4>

                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
                                    <li class="relative z-0">
                                        <input 
                                            type="text" 
                                            id="floating_standard" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                                        <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">회사/단체명</label>
                                    </li>
                                    <li class="relative z-0">
                                        <input 
                                            type="text" 
                                            id="floating_standard" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                                        <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">담당자명</label>
                                    </li>
                                    <li class="relative z-0">
                                        <input 
                                            type="text" 
                                            id="floating_standard" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                                        <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">연락처</label>
                                    </li>
                                    <li class="relative z-0">
                                        <input 
                                            type="text" 
                                            id="floating_standard" 
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
                                        <label for="floating_standard" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">이메일</label>
                                    </li>
                                </ul>
                                
                                
                            </li>

                            <!-- 개인정보처리방침 -->
                            <li>
                                <div class="flex items-center">
                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><a href="#" class="text-primary dark:text-blue-500 hover:underline">개인정보보호정책</a>에 동의합니다.<em class="text-red-600 font-bold">*</em></label>
                                </div>
                            </li>
                            <!-- 제출 버튼 -->
                            <li>
                                <button
                                    type="submit"
                                    class="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:opacity-90 
                                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all">
                                    문의하기
                                </button>
                            </li>
                        </ol>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const selectedType = ref('');
const selectedServices = ref<string[]>([]);
const textareaContent = ref<string>('');
</script>

<style lang="scss" scoped>
.highlight-title::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    left: 0px;
    transition-property: all;
    transition-duration: 0.7s;
    transition-delay: 0.5s;
    transition-timing-function: ease-in;
    background-color: rgba(0, 191, 255, 0.3);
    bottom: 0.3328px;
    height: 5.96875px;
    width: 100%;
}
</style>