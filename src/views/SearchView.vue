<script setup>
import api from '@/api';
import HeaderNav from '@/components/HeaderNav.vue';
import VideoCard from '@/components/VideoCard.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const inputValue = ref('');
const videoList = ref([]);

// 获取搜索视频结果
const searchClickHandle = () => {
  if (inputValue.value !== '') router.push(`/search/${inputValue.value}`);
  api.get(`/user/search-videos/${inputValue.value}?page=${1}`).then((res) => {
    videoList.value = res.data;
    console.log(res);
  });
};

inputValue.value = route.params.input;

onMounted(() => {
  if (inputValue.value !== '') {
    // 发起请求获取搜索结果
    console.log('search:', inputValue.value);
    searchClickHandle();
  }
});
</script>

<template>
  <div class="search">
    <HeaderNav :inputhidden="false"></HeaderNav>
    <div class="search-header">
      <el-input class="search-input" v-model="inputValue" prefix-icon="Search" clearable>
        <template #append>
          <el-button class="input-btn" @click="searchClickHandle">搜索</el-button>
        </template>
      </el-input>
      <div class="search-order">
        <el-button text bg>综合排序</el-button>
        <el-button text>最多播放</el-button>
        <el-button text>最新发布</el-button>
        <el-button text>最多收藏</el-button>
      </div>
    </div>

    <div class="search-results">
      <div class="video-res" v-for="i in videoList" :key="i">
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
    <div class="search-pages">
      <el-pagination background layout="prev, pager, next" :total="2" default-page-size="30" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  .search-header {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > .search-input {
      width: 640px;
      height: 48px;
      font-size: 18px;

      :deep(.el-input__inner) {
        color: #18191c;
      }

      .input-btn {
        width: 100px;
        height: 100%;
        background-color: #1989fa;
        color: #fff;
      }
    }

    .search-order {
      width: 100%;

      margin-top: 50px;
      padding: 0 64px;

      .el-button {
        width: 100px;
        margin-right: 10px;
      }
    }
  }

  .search-results {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 40px;
    column-gap: 16px;
    padding: 30px 64px 0;
  }
  .search-pages {
    display: flex;
    justify-content: center;
    margin: 50px 0 20px 0;
  }
}
</style>
