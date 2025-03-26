<script setup>
import api from '@/api';
import CarouselImage from '@/components/CarouselImage.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';

const videoList = ref([{}]);

onMounted(() => {
  api.get('/user/getVideoList').then((res) => {
    console.log(res);
    videoList.value = res.data;
  });
});
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
        <VideoCard></VideoCard>
      </div>

      <div class="videos" v-for="i in 25" :key="i">
        <VideoCard
          videoId="1"
          title="22"
          coverUrl="333"
          userId="444"
          username="55"
          uploadTime="66"
        ></VideoCard>
      </div>
    </div>

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
