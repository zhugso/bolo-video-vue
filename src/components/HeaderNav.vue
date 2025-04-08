<script setup>
import api from '@/api';
import { useTokenStore } from '@/stores/token';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { inputhidden = true } = defineProps(['inputhidden']);

const router = useRouter();
const tokenStore = useTokenStore();
const inputValue = ref('');
const isLogin = ref(true);

// 搜索框
const search = () => {
  if (inputValue.value !== '') router.push(`/search/${inputValue.value}`);
};

// 登录按钮
const loginBtn = () => {
  router.push('/login');
};

// 粉丝、关注、动态、数量的处理
const formatterHandle = (value) => {
  if (value < 10000) return value;
  return value / 10000 + '万';
};

// 退出登录
const logout = () => {
  isLogin.value = false;
  tokenStore.setToken('');
  api.get('/user/logout');
  router.push('/');
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
                <el-avatar src=""> 登录 </el-avatar>
              </template>
              <template #default>
                <div style="display: flex; gap: 16px; flex-direction: column">
                  <div
                    class="login-info"
                    v-if="isLogin"
                    style="display: flex; flex-direction: column; color: #18191c"
                  >
                    <div style="font-size: 18px; align-self: center">title</div>
                    <el-row style="margin-top: 20px">
                      <el-col style="text-align: center" :span="8">
                        <el-statistic title="关注" :value="500" :formatter="formatterHandle" />
                      </el-col>
                      <el-col style="text-align: center" :span="8">
                        <el-statistic title="粉丝" :value="50000" :formatter="formatterHandle" />
                      </el-col>
                      <el-col style="text-align: center" :span="8">
                        <el-statistic title="动态" :value="500" :formatter="formatterHandle" />
                      </el-col>
                    </el-row>

                    <el-button @click="$router.push('/home')" text style="margin-top: 20px">
                      个人中心
                    </el-button>
                    <el-button
                      @click="$router.push('/upload-manager')"
                      text
                      style="margin-left: 0; margin-top: 10px"
                    >
                      稿件管理
                    </el-button>

                    <el-divider />
                    <el-button @click="logout" text> 退出登录 </el-button>
                  </div>

                  <el-button class="login-btn" v-else type="primary" size="large" @click="loginBtn">
                    登录
                  </el-button>
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
      .login-info {
      }

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
