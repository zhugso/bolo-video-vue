<script setup></script>

<template>
  <div class="video-card">
    <el-link class="video-cover-be" :underline="false">
      <img class="video-cover" src="@/assets/testimg/大舅妈.jpg" />
    </el-link>
    <el-link :underline="false">
      <el-text class="video-title" line-clamp="2">
        The -webkit-line-clamp CSS property allows limiting of the contents of a block to the
        specified number of lines.
      </el-text>
    </el-link>

    <div class="video-user">
      <el-link :underline="false">
        <el-icon>
          <User />
        </el-icon>
        <div>aaa · 2-22</div>
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
