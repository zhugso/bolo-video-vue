<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const activeIndex = ref(router.currentRoute.value.fullPath.split('/').at(-1));

// 动态切换激活项
const handleSelect = (index) => {
  activeIndex.value = index;
};

const upBtn = () => {
  router.push('upload');
  activeIndex.value = route.path === '/upload-manager/upload' ? '' : route.path;
};
</script>

<template>
  <div class="upload-manager">
    <HeaderNav></HeaderNav>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeIndex" class="up-menu" router @select="handleSelect">
          <div class="up-btn-container">
            <el-button class="up-btn" @click="upBtn" type="primary">投稿</el-button>
          </div>

          <el-menu-item index="index">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-sub-menu index="content">
            <template #title>
              <el-icon>
                <Operation />
              </el-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item index="article">稿件管理</el-menu-item>
            <el-menu-item index="appeal">申诉管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.upload-manager {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .up-menu {
    .up-btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .up-btn {
        margin-top: 24px;
        margin-bottom: 17px;
        width: 136px;
        height: 40px;
      }
    }

    .el-sub-menu {
      .el-menu-item {
        margin-left: 25px;
      }
    }

    .el-icon {
      margin: 0 10px;
    }
  }

  .el-main {
    display: flex;
    justify-content: center;
    background-color: #fafafa;
  }
}
</style>
