<template>
  <section class="bg-white">
     <div class="container mx-auto py-28 px-4">
      <!-- 헤더 영역 -->
      <header class="mb-20">
        <div>
          <!-- 상단 작은 타이틀 -->
          <div class="inline-block mb-4">
            <span
              class="relative font-extrabold text-3xl md:text-4xl text-gray-900 leading-none"
            >
              <span class="relative z-[1]">복지/문화</span>
              <span
                class="absolute left-0 bottom-0 w-full h-[10px] bg-yellow-300 -z-[1]"
              ></span>
            </span>
          </div>

          <!-- 설명 문구 -->
          <p
            class="text-2xl md:text-3xl text-gray-800 leading-snug font-medium"
          >
            즐겁게 일하는 포베리의<br class="md:hidden" />
            일상입니다.
          </p>
        </div>
      </header>

      <!-- 카드 그리드 -->
      <ul
        class="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-12 md:gap-y-20"
      >
        <li v-for="(item, i) in cultureItems" :key="i" class="flex flex-col">
          <!-- 이미지 -->
          <div
            :class="[
              'w-full aspect-square overflow-hidden rounded-2xl shadow-sm flex items-center justify-center transition-colors duration-300',
              item.title === '유연근무제'
                ? 'bg-slate-300'
                : item.title === '자기계발비 지원'
                ? 'bg-lime-50'
                : 'bg-gray-100',
            ]"
          >
            <NuxtImg
              :src="item.img"
              :alt="item.title + ' 이미지'"
              loading="lazy"
              class="w-full h-full object-center"
              :class="
                item.title === '유연근무제' ? 'object-contain' : 'object-cover'
              "
            />
          </div>

          <!-- 텍스트 영역 -->
          <div class="mt-4 md:mt-6">
            <h3
              class="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 tracking-tight uppercase"
            >
              {{ item.title }}
            </h3>

            <p
              class="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 mt-2 md:mt-3 whitespace-pre-line"
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
const cultureItems = [
  {
    title: "유연근무제",
    img: "/images/work.png",
    desc:
      "8시 ~ 10시 사이에 자율적으로 출근해요.\n" +
      "업무 효율은 높이고 워라밸은 확실하게!",
  },
  {
    title: "점심식사 제공",
    img: "/images/food.jpg",
    desc: "매일 든든한 식사로 에너지 충전!",
  },
  {
    title: "생일 축하금 지급",
    img: "/images/birthday.jpg",
    desc:
      "생일 당일엔 현금 20만원을 드리고 조기퇴근도 OK! " +
      "기념일은 일보다 내가 더 소중하니까요~",
  },
  {
    title: "자기계발비 지원",
    img: "/images/allowance2.png",
    desc: "책, 강의(인프런), 세미나 등\n" + "배움에 대한 투자 적극 환영합니다.",
  },
  {
    title: "간식·커피 무제한",
    img: "/images/cookie.jpg",
    desc: "당 떨어질 틈 없이!\n" + "언제든 꺼내 먹을 수 있어요.",
  },
  {
    title: "게임 타임",
    img: "/images/game.jpg",
    desc:
      "취미와 친목, 재미를 위해\n" + "보드게임과 온라인게임을 같이 즐긴답니다.",
  },
];
</script>

<style scoped>
/* 필요 시 커스텀 스타일 추가 */
</style>
