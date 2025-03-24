<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { inputhidden = true } = defineProps(['inputhidden']);

const router = useRouter();
const inputValue = ref('');
const search = () => {
  if (inputValue.value !== '') router.push(`/search/${inputValue.value}`);
};

const loginBtn = () => {
  router.push('/login');
};
</script>

<template>
  <el-affix>
    <el-row class="header-nav">
      <el-col class="left-entry" :span="7">
        <el-link :underline="false" class="index-link" href="/" target="">
          <img class="index-link-img" src="@/assets/bolo.svg" />
          <div class="index-link-text">首页</div>
        </el-link>
      </el-col>

      <el-col class="centre-search" :span="10">
        <el-input
          v-if="inputhidden"
          class="search-input"
          v-model="inputValue"
          placeholder="搜索"
          @keyup.enter="search"
        />
        <el-button v-if="inputhidden" class="search-button" @click="search">
          <el-icon size="17px">
            <Search />
          </el-icon>
        </el-button>
      </el-col>

      <el-col class="right-entry" :span="7">
        <el-space wrap :size="30">
          <el-link :underline="false" class="link-avatar" href="" target="">
            <el-popover
              :width="300"
              popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            >
              <template #reference>
                <el-avatar> 登录 </el-avatar>
              </template>
              <template #default>
                <div
                  class="demo-rich-conent"
                  style="display: flex; gap: 16px; flex-direction: column"
                >
                  <el-button class="login-btn" type="primary" size="large" @click="loginBtn"
                    >登录</el-button
                  >
                </div>
              </template>
            </el-popover>
          </el-link>
          <el-link :underline="false" class="link-message" href="" target="">
            <div class="message">
              <el-icon>
                <Message />
              </el-icon>
              <div>消息</div>
            </div>
          </el-link>
          <el-link :underline="false" class="link-dynamic" href="" target="">
            <div class="dynamic">
              <el-icon>
                <Sunny />
              </el-icon>
              <div>动态</div>
            </div>
          </el-link>
          <el-link :underline="false" class="link-collect" href="" target="">
            <div class="collect">
              <el-icon>
                <Files />
              </el-icon>
              <div>收藏</div>
            </div>
          </el-link>
          <el-link :underline="false" class="link-history" href="" target="">
            <div class="history">
              <el-icon>
                <Clock />
              </el-icon>
              <div>历史</div>
            </div>
          </el-link>
        </el-space>
      </el-col>
    </el-row>
  </el-affix>
</template>

<style lang="less" scoped>
.header-nav {
  height: 64px;
  padding: 0 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px #00000014;
  z-index: 2; // 使阴影在最上， 不会被其他元素遮挡

  > .el-col {
    display: flex;
    align-items: center;
  }

  > .el-col:nth-child(2) {
    justify-content: center;
  }

  .left-entry {
    .index-link {
      height: 27px;

      .index-link-img {
        height: 35px;
      }

      .index-link-text {
        font-size: 14px;
        margin-left: 20px;
      }
    }
  }

  .centre-search {
    position: relative;

    .search-input {
      width: 500px;
      height: 40px;
      padding-right: 20px;
    }

    .search-button {
      width: 32px;
      height: 32px;
      border: 0;

      right: 60px;
      position: relative;
    }
  }

  .right-entry {
    // 头像放大
    // .link-avatar {
    //   z-index: 1;
    //   transition: all 0.4s ease-in-out;
    //   /* 初始状态 */
    //   transform: translate(0, 0) scale(1);
    // }

    // .link-avatar:hover {
    //   transform: translate(-25px, 30px) scale(2);
    // }

    .el-link {
      div {
        display: flex;
        flex-direction: column;
      }

      div > * {
        align-self: center;
      }

      .el-icon {
        font-size: 20px;
        margin-bottom: 1px;
      }
    }
  }
}
</style>
