<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
import VideoCard from '@/components/VideoCard.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const inputValue = ref('');

inputValue.value = route.params.input;

if (inputValue.value !== '') {
  // 发起请求获取搜索结果
  console.log('aaaa');
}
</script>

<template>
  <div class="search">
    <HeaderNav :inputhidden="false"></HeaderNav>
    <div class="search-header">
      <el-input class="search-input" v-model="inputValue" prefix-icon="Search" clearable>
        <template #append>
          <el-button class="input-btn">搜索</el-button>
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
      <div class="video-res" v-for="i in 25" :key="i">
        <VideoCard></VideoCard>
      </div>
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

      /deep/.el-input__inner {
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
}
</style>
