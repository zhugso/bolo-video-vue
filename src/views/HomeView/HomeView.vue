<script setup>
import HeaderNav from '@/components/HeaderNav.vue';
import router from '@/router';
import { ref } from 'vue';
const pathActive = ref(router.currentRoute.value.fullPath.split('/').at(-1));
</script>

<template>
  <div class="home">
    <HeaderNav></HeaderNav>
    <div class="header-banner">
      <img src="@/assets/bolo-banner.png" />
    </div>

    <el-container class="main">
      <el-aside width="150px">
        <el-menu :default-active="pathActive" class="menu" router>
          <el-menu-item class="header-title" disabled>
            <span>个人中心</span>
          </el-menu-item>
          <el-menu-item index="index">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="info">
            <span>我的信息</span>
          </el-menu-item>
          <el-menu-item index="avatar">
            <span>我的头像</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;

  .header-banner {
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
    width: 980px;
    height: 100%;
    margin: 10px auto 100px;
    border: 1px solid #e1e2e5;

    .menu {
      width: 150px;
      background-color: #fefefe;

      .header-title {
        display: block;
        height: 50px;

        font-size: 16px;
        border-bottom: 1px solid #e1e2e5;
        cursor: default;
      }

      .el-menu-item {
        display: block;
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
</style>
