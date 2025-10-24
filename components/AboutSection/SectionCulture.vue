<template>
  <section class="bg-white py-32 md:py-40">
    <div class="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      <!-- 헤더 영역 -->
      <header class="mb-16">
        <div>
          <!-- 상단 작은 타이틀 -->
          <div class="inline-block mb-4">
            <span class="relative font-extrabold text-xl md:text-2xl text-gray-900 leading-none">
              <span class="relative z-[1]">복지/문화</span>
              <!-- 노란 형광펜 느낌 밑줄 -->
              <span
                class="absolute left-0 bottom-0 w-full h-[6px] bg-yellow-300 -z-[1]"
              ></span>
            </span>
          </div>

          <!-- 설명 문구 -->
          <p class="text-lg md:text-xl text-gray-800 leading-snug">
            즐겁게 일하는 포베리의<br class="md:hidden" />
            일상입니다.
          </p>
        </div>
      </header>

      <!-- 카드 그리드 -->
      <ul
        class="grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-20 md:gap-y-24"
      >
        <li
          v-for="(item, i) in cultureItems"
          :key="i"
          class="flex flex-col"
        >
          <!-- 이미지 -->
          <div
            class="w-full aspect-square bg-gray-100 overflow-hidden border border-gray-200"
          >
            <NuxtImg
              :src="item.img"
              :alt="item.title + ' 이미지'"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <!-- 텍스트 영역 -->
          <div class="mt-4">
            <h3
              class="text-sm font-extrabold text-gray-900 tracking-tight uppercase"
            >
              {{ item.title }}
            </h3>

            <p
              class="text-[13px] leading-relaxed text-gray-700 mt-2 whitespace-pre-line"
            >
              {{ item.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * cultureItems:
 * img: 카드 상단 이미지 (정사각형)
 * title: 카드 소제목 (영문 대문자)
 * desc: 카드 설명 (2~3줄)
 *
 * ※ 이미지 경로는 네 프로젝트 경로에 맞게 바꿔줘
 */
const cultureItems = [
  {
    title: "유연근무제",
    img: "/images/working.png",
    desc:
      "8시 ~ 10시 사이에 자율적으로 출근해요.\n" +
      "업무 효율은 높이고 워라밸은 확실하게!",
  },
  {
    title: "점심식사 제공",
    img: "/images/food.jpg",
    desc:
      "매일 든든한 식사로 에너지 충전!"
  },
  {
    title: "생일 축하금 지급",
    img: "/images/birthday.jpg",
    desc:
      "생일 당일엔 현금 20만원을 드리고 조기퇴근도 OK!\n" +
      "기념일은 일보다 내가 더 소중하니까요~",
  },
  {
    title: "자기계발비 지원",
    img: "/images/allowance.jpg",
    desc:
      "책,강의(인프런),세미나 등\n" +
      "배움에 대한 투자 적극 환영합니다.",
  },
  {
    title: "간식·커피 무제한",
    img: "/images/cookie.jpg",
    desc:
      "당 떨어질 틈 없이!\n" +
      "언제든 꺼내 먹을 수 있어요.",
  },
  {
    title: "게임 타임",
    img: "/images/game.jpg",
    desc:
      "취미와 친목, 재미를 위해\n" +
      "보드게임과 온라인게임을 같이 즐긴답니다. ",
  },
  // {
  //   title: "HI-ZINE",
  //   img: "/images/culture-zine.png",
  //   desc:
  //     "새로운 소식을 공유하고, 특별한 순간을\n" +
  //     "만들어가기도 하는 하이브랩 공식 매거진",
  // },
  // {
  //   title: "HI-FC",
  //   img: "/images/culture-club.jpg",
  //   desc:
  //     "취미와 친목, 재미와 의미를 동시에!\n" +
  //     "만들어가는 하이브랩 동호회 Fantasy Club",
  // },
  // {
  //   title: "HI-TOGETHER",
  //   img: "/images/culture-together.jpg",
  //   desc:
  //     "직원과 함께 성장하는\n" +
  //     "하이브랩의 공식 소통채널 & 사내 커뮤니케이션",
  // },
];
</script>

<style scoped>
/* 추가 커스텀 없으면 비워둬도 됨 */
</style>
