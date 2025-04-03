<script setup>
import api from '@/api';
import CarouselImage from '@/components/CarouselImage.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, onUnmounted, ref } from 'vue';

// const recommendVideoList = ref([{}]);
const videoList = ref([]);

// 获取首页推荐视频
// const getRecommendVideoList = () => {
//   api.get(`/user/recommendVideoCards/11`).then((res) => {
//     console.log(res);
//     recommendVideoList.value = res.data;
//   });
// };

// 获取视频流
const loading = ref([15]);
let loadingCount = ref(0);
let noMore = false;

const scrollHandle = () => {
  console.log(videoList.value);

  if (noMore) {
    return;
  }
  noMore = true;

  loading.value[loadingCount] = true;
  console.log('aaa');
  api.get('/user/videoCards/15').then((res) => {
    console.log(res);
    // 将数据添加到videoList
    videoList.value = videoList.value.concat(res.data);
    noMore = false;
  });
};

onMounted(() => {
  window.addEventListener('scroll', windowScroll, true);

  scrollHandle();

  // getRecommendVideoList();
});

onUnmounted(() => {
  alert('销毁Scroll');

  window.removeEventListener('scroll', windowScroll, true);
  window.Event;
});

// onBeforeRouteLeave(() => {
//   alert('销毁Scroll');
//   window.removeEventListener('scroll', windowScroll, true);
// });

//获取当前可视范围的高度
const getClientHeight = () => {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
};

//获取文档完整的高度
const getScrollHeight = () => {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};

//获取当前滚动条的位置
const getScrollTop = () => {
  var scrollTop = 0;
  //window.pageYOffset = document.documentElement.scrollTop
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
};

//回调函数
const windowScroll = () => {
  //获取三个值
  let scrollTop = getScrollTop();
  let clientHeight = getClientHeight();
  let scrollHeight = getScrollHeight();

  console.log(
    'scrollTop:',
    scrollTop,
    'clientHeight:',
    clientHeight,
    'scrollHeight:',
    scrollHeight,
    'scrollTop+clientHeight:',
    scrollTop + clientHeight,
  );

  //如果满足公式则，确实到底了
  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    console.log('滚动到底啦-----ssssssssssssss');
    scrollHandle();
  }
};
</script>

<template>
  <div class="index">
    <HeaderNav></HeaderNav>

    <div class="bolo-header-banner">
      <img src="@/assets/bolo-banner.png" />
    </div>

    <div class="main">
      <div class="slideshow">
        <CarouselImage></CarouselImage>
      </div>

      <div
        class="recommend-videos"
        v-for="(i, index) in 11"
        :key="i"
        :style="[index > 5 ? 'margin-top: 40px' : '']"
      >
        <VideoCard :loading="true"></VideoCard>
      </div>

      <!-- <div v-infinite-scroll="scrollHandle"> -->
      <div class="videos" v-for="i in videoList" :key="i">
        <VideoCard
          :loading="false"
          :videoId="i.videoId"
          :title="i.title"
          :coverUrl="i.coverUrl"
          :userId="i.userId"
          :username="i.nickname"
          :uploadTime="i.uploadTime"
        ></VideoCard>
      </div>
    </div>
    <!-- </div> -->

    <el-backtop :right="90" :bottom="100">
      <div class="up">
        <el-icon>
          <CaretTop />
        </el-icon>
        <div>顶部</div>
      </div>
    </el-backtop>
  </div>
</template>

<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: column;

  .bolo-header-banner {
    width: 100%;
    height: 155px;

    margin-top: -64px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .main {
    display: grid;
    // position: relative;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;

    padding: 0 140px;

    .slideshow {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    .videos {
      margin-top: 24px;
    }
  }

  .up {
    height: 100%;
    width: 100%;
    background-color: var(--el-bg-color-overlay);
    box-shadow: var(--el-box-shadow-lighter);
    text-align: center;
    color: #18191c;
    border-radius: 3px;
    font-size: 12px;
    padding: 2px 0;
  }

  .up:hover {
    color: #1989fa;
  }
}
</style>
