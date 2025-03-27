<script setup>
const props = defineProps(['videoId', 'title', 'coverUrl', 'userId', 'username', 'uploadTime']);
const resBaseUrl = 'http://localhost:9000/bolo/';

const dateHandle = (uploadTime) => {
  const ud = new Date(uploadTime);
  return ud.getMonth() + 1 + '-' + ud.getDate();
};
</script>

<template>
  <div class="video-card">
    <el-link class="video-cover-be" :underline="false" :href="'/video/' + videoId">
      <img class="video-cover" :src="resBaseUrl + coverUrl" />
    </el-link>
    <el-link :underline="false" :href="'/video/' + videoId">
      <el-text class="video-title" line-clamp="2">
        {{ title }}
      </el-text>
    </el-link>

    <div class="video-user">
      <el-link :underline="false">
        <el-icon>
          <User />
        </el-icon>
        <div>
          {{ username }} ·
          {{ dateHandle(uploadTime) }}
        </div>
      </el-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.video-card {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;

  // box-shadow: 0 0 4px 4px #00000014;
  .video-cover-be {
    overflow: hidden;
    border-radius: 5px;

    .video-cover {
      width: 100%;
      object-fit: contain;
      transition: all 0.4s;
    }

    .video-cover:hover {
      transform: translate(0, 0) scale(1.1);
    }
  }

  .video-title {
    margin-top: 10px;
    padding-right: 30px;
    color: #18191c;
    font-size: 18px;
  }

  .video-title:hover {
    color: #1989fa;
  }

  .video-user {
    margin-top: 4px;
    color: #9499a0;
    font-size: 13px;
    display: flex;
    justify-content: flex-start;

    .el-icon {
      margin-right: 2px;
    }
  }
}
</style>
